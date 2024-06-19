"use server";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { env } from "@/env";
import twilio from "twilio";

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const body = await req.json();

  // * Task ID and contact number
  const { id, contact } = body;

  console.log(`Initiating follow-up call for contact: ${contact}`);

  const twiml = new VoiceResponse();

  const actionUrl = `${process.env.NGROK_URL}/api/gather?id=${encodeURIComponent(id)}`;

  const gather = twiml.gather({
    numDigits: 1,
    action: actionUrl,
    method: "POST",
  });
  gather.say(
    "Hi, this is a follow-up call. Did you complete the task? Press 1 for yes, or 2 for no followed by the pound key.",
  );

  client.calls
    .create({
      twiml: twiml,
      to: contact,
      from: "+17247506120",
    })
    .then((call) => {
      console.log(`Initial call initiated with SID: ${call.sid}`);
    });

  twiml.redirect("/api/follow-up");

  const response = new NextResponse(twiml.toString(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });

  return response;
}
