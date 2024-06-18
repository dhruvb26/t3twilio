import { NextApiRequest, NextApiResponse } from "next";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { parse } from "querystring";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  const body = await parseRequestBody(req);

  const { Digits } = body;

  const twiml = new VoiceResponse();

  if (Digits) {
    if (Digits === "1") {
      // TODO: Update the notion database to mark the task status as Completed
      const satusUpdateResponse = await fetch("http://localhost:8080/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      twiml.say("Task completed. Thank you!");
    } else if (Digits === "2") {
      twiml.say("Task not completed. Complete the task as soon as possible.");
    } else {
      twiml.say("Sorry, I don't understand that choice.");
    }
  } else {
    twiml.say("Sorry, I don't understand that choice.");
  }

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
