"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { scheduleJob } from "node-schedule";
import { NextResponse } from "next/server";
import { initiateCall } from "../../_utils/twilioHelpers";
import { env } from "@/env";
import { initiateEmail } from "../../_utils/twilioHelpers";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { id, name, description, timeStamp, contact, method } = body;
  const CLOUDFLARE_API_KEY = env.CLOUDFLARE_API_KEY;

  console.log(`Initiating job for task: ${name}`);

  const model = "@cf/meta/llama-3-8b-instruct";

  const input = {
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that creates reminder call or email messages for tasks.",
      },
      {
        role: "user",
        content: `Please generate a reminder message for a task using the following format:
  
  
  Example input: 
  Task Name: Submit report
  Method: Call 
  Task Description: You need to submit the financial report by end of the day.

  Example output: 
  Hello, this is a reminder call about report. You need to submit the financial report by end of the day. Please make sure to complete the task.
  
  
  Now, create the reminder message with the details provided below:
  
  Task Name: {${name}}
  Method: {${method}}
  Task Description: {${description}}
  
  Please provide only the message text without any additional explanation or generated content. Do not include something like "Sure, here is the reminder message for the task:"`,
      },
    ],
  };

  const aiResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/00831f68e3b1784cd84f1d8abb7cc2ac/ai/run/${model}`,
    {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  const result = await aiResponse.json();
  const responseText = result.result.response;

  console.log(`Response text from AI: ${responseText}`);

  const props = {
    id,
    name,
    description,
    timeStamp,
    contact,
    responseText,
  };

  // Function to parse the time string and create a Date object (assuming time is in ISO-8601 format)
  function parseTimeString(timeString: string): Date {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid time string");
    }
    return date;
  }

  const initialCallDate = parseTimeString(timeStamp).getTime();

  scheduleJob(initialCallDate, () => {
    if (method === "Call") {
      console.log(`Initial call date: ${initialCallDate}`);
      initiateCall(props);
    } else if (method === "Email") {
      console.log(`Initial email date: ${initialCallDate}`);
      initiateEmail(props);
    } else {
      console.log("Invalid method");
    }
  });

  return NextResponse.json({ message: "Call initiated" });
}
