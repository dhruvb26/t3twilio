import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { parse } from "querystring";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { env } from "@/env";

export async function POST(req: NextApiRequest) {
  const body = await parseRequestBody(req);

  const apiKey = env.CLOUDFLARE_API_KEY;
  const { SpeechResult } = body;
  const twiml = new VoiceResponse();

  console.log("SpeechResult: ", SpeechResult);

  // TODO: AI api implementation to add task to the datbase
  const model = "@cf/meta/llama-2-7b-chat-int8";

  const input = {
    messages: [
      {
        role: "system",
        content:
          "You are an agent that will only help extract information from text.",
      },
      {
        //TODO: Improve the prompt
        role: "user",
        content: `Given the following text: ${SpeechResult}. Extract the task description, date, time, and contact information. Create a sutiable name for the task as well. Output should look like:
           name: [Name of task]
           description: [Description of task]
           timeStamp: [Current day with time in ISO-8601 format]
           Contact: [Contact information with +1 extension code]
            Do not include any other generated text or information. 
          `,
      },
    ],
  };
  const aiResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/00831f68e3b1784cd84f1d8abb7cc2ac/ai/run/${model}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  const result = await aiResponse.json();

  // Extract the task details from the AI response
  const aiText = result.result.response;

  console.log("AI Response: ", aiText);

  const taskDetails = extractTaskDetails(aiText);

  fetch("http://localhost:8080/add_task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskDetails),
  });

  twiml.say("Task added successfully. Thank you!");

  const response = new NextResponse(twiml.toString(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
  return response;
}

// Helper function to parse the request body
async function parseRequestBody(req: NextApiRequest) {
  const reader = req.body?.getReader();
  const chunks: Uint8Array[] = [];

  if (reader) {
    let done = false;

    while (!done) {
      const { done: doneReading, value } = await reader.read();
      done = doneReading;
      if (value) {
        chunks.push(value);
      }
    }
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  const bodyString = new TextDecoder().decode(combined);
  return parse(bodyString);
}
// Helper function to extract task details from AI response
function extractTaskDetails(aiText: any) {
  const nameMatch = aiText.match(/name:\s*(.*)/);
  const descriptionMatch = aiText.match(/description:\s*(.*)/);
  const timeStampMatch = aiText.match(/timeStamp:\s*(.*)/);
  const contactMatch = aiText.match(/Contact:\s*(.*)/);

  const contact = contactMatch
    ? contactMatch[1].trim().replace(/[\s-]/g, "")
    : "No contact information";

  return {
    name: nameMatch ? nameMatch[1].trim() : "Unnamed Task",
    description: descriptionMatch
      ? descriptionMatch[1].trim()
      : "No description provided",
    timeStamp: timeStampMatch
      ? timeStampMatch[1].trim()
      : new Date().toISOString(),
    contact: contact,
  };
}
