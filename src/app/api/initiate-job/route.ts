import { NextApiRequest, NextApiResponse } from "next";
import { scheduleJob } from "node-schedule";
import { NextResponse } from "next/server";
import { initiateCall } from "../../utils/twilioHelpers";
import { env } from "@/env";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { id, name, description, timeStamp, contact } = body;
  const CLOUDFLARE_API_KEY = env.CLOUDFLARE_API_KEY;

  console.log(`Initiating job for task: ${name}`);

  const model = "@cf/meta/llama-2-7b-chat-int8";

  const input = {
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that will help create reminder call messages for a task.",
      },
      {
        role: "user",
        content: `You are an assistant that will help create reminder call messages for a task. Please provide the reminder call message in the following format and only the message without any additional content:
          Format:
          Hello, this is a reminder call about [Task Name]. [Task Description]. Please make sure to complete the task.

          Example input:
          Task Name: Submit report
          Task Description: You need to submit the financial report by end of the day.

          Now, generate the reminder call message.

          Task Name: {${name}}
          Task Description: {${description}}`,
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

  console.log(`Initial call date: ${initialCallDate}`);

  scheduleJob(initialCallDate, () => {
    initiateCall(props);
  });

  return NextResponse.json({ message: "Call initiated" });
}
