import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { parse } from "querystring";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export async function POST(req: NextApiRequest) {
  const body = await parseRequestBody(req);

  const { SpeechResult } = body;

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
        Authorization: "Bearer u2xgqDdZIhO0JUxXx3tfbZ3xaFZfAt-IDtuVU0ec",
      },
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  const result = await aiResponse.json();

  console.log("AI Response: ", result["result"]["response"]);

  const twiml = new VoiceResponse();

  twiml.say("Task added successfully. Thank you!");

  // TODO: Logic to add the task to the database

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
