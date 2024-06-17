import { NextResponse } from "next/server";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export async function POST(req: Request) {
  const twiml = new VoiceResponse();

  const actionUrl = `${process.env.NGROK_URL}/api/add-task`;

  const gather = twiml.gather({
    input: ["speech"],
    action: actionUrl,
    finishOnKey: "#",
    speechModel: "numbers_and_commands",
    method: "POST",
  });
  gather.say(
    "Hi, please tell what task you would like to schedule. Speak clearly and slowly. Press the pound key when you're done.",
  );

  const response = new NextResponse(twiml.toString(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
  return response;
}
