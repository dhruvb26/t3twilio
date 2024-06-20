"use server";
import { env } from "@/env";
import twilio from "twilio";
import schedule from "node-schedule";
import axios from "axios";
import sgMail from "@sendgrid/mail";

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

interface initiateCallProps {
  id: string;
  name: string; // Name of task
  description: string; // Description of task
  timeStamp: string;
  //   frequency: string; // Frequency of task (hourly, daily, weekly)
  // method: string; // Method of contact (call, text, email)
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
      .then(async (call) => {
        console.log(`Initial call initiated with SID: ${call.sid}`);

        // Use AI to determine when to schedule the follow-up call
        const model = "@cf/mistral/mistral-7b-instruct-v0.1";

        const input = {
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that will help me figure out how long it will take on average to complete a task.",
            },
            {
              role: "user",
              content: `You are an assistant that will return time in "ms" for a task given:
                Example input:
                Hello, this is a reminder call about [Task Name]. [Task Description]. Please make sure to complete the task.
      
                Example output: 
                40000 (in ms)
      
                Now, generate the reminder call message.
      
                Input: {${responseText}}`,
            },
          ],
        };
        const CLOUDFLARE_API_KEY = env.CLOUDFLARE_API_KEY;

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
        const followUpIntervalMs = parseInt(result.result.response, 10);

        console.log(followUpIntervalMs);

        const followUpDate = new Date(new Date().getTime() + 60000); // use the response time in ms

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

export const initiateEmail = async (props: initiateCallProps) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const { contact, responseText } = props;

  const msg = {
    from: "dk.bansal0026@gmail.com", // Change to your verified sender
    templateId: "d-6374fdf7cba241d1a60a65704e6d6a73",
    personalizations: [
      {
        to: [
          {
            email: contact,
          },
        ],
        dynamic_template_data: {
          reminder: responseText,
        },
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
