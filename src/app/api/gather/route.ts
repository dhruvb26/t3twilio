import { NextApiRequest, NextApiResponse } from "next";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { parse } from "querystring";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await parseRequestBody(req);
  // Parse the query parameters from the request URL
  const id = req.nextUrl.searchParams.get("id");

  const { Digits } = body;

  console.log(`Gather response for task: ${id}`);

  const twiml = new VoiceResponse();

  if (Digits) {
    if (Digits === "1") {
      // TODO: Send in the task id to update the status

      const satusUpdateResponse = await fetch(
        "http://localhost:8080/update_status",
        {
          body: JSON.stringify({ id }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
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
async function parseRequestBody(req: NextRequest) {
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
