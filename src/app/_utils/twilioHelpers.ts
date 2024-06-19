"use server";
import { env } from "@/env";
import twilio from "twilio";
import schedule from "node-schedule";
import axios from "axios";

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

interface initiateCallProps {
  id: string;
  name: string; // Name of task
  description: string; // Description of task
  timeStamp: string;
  //   frequency: string; // Frequency of task (hourly, daily, weekly)
  //   method: string; // Method of contact (call, text, email)
  contact: string; // Contact information
  responseText: string; // Response text for the call
  //   endDate?: string; // End date of task
}

export const initiateCall = async (props: initiateCallProps) => {
  try {
    const { id, contact, responseText } = props;

    console.log(`Initiating call for contact: ${contact}`);

    // TODO: Logic to determine when to schedule the follow-up call

    client.calls
      .create({
        twiml: `<Response><Say>${responseText}</Say></Response>`,
        to: contact,
        from: "+17247506120",
      })
      .then((call) => {
        console.log(`Initial call initiated with SID: ${call.sid}`);

        const followUpDate = new Date(new Date().getTime() + 60000); // !5 minutes for testing

        console.log("Follow-up call scheduled for: ", followUpDate);

        const NGROK_URL = env.NGROK_URL;

        schedule.scheduleJob(followUpDate, async () => {
          try {
            const res = await axios.post(
              `${NGROK_URL}/api/follow-up`,
              { id, contact },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            console.log(res.data);
          } catch (error) {
            console.error(`Error initiating follow-up call: ${error}`);
          }
        });
      })
      .catch((error) => {
        console.error(`Error initiating call: ${error}`);
      });
  } catch (error) {
    console.error(`Error initiating call: ${error}`);
  }
};
