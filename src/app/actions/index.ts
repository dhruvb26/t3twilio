"use server";
import { db } from "@/server/db";
import { tokens } from "@/server/db/schema";
import { env } from "@/env";

export async function authCallback(code: string) {
  const clientId = env.OAUTH_CLIENT_ID;
  const clientSecret = env.OAUTH_CLIENT_SECRET;
  const redirectUri = env.OAUTH_REDIRECT_URI;

  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error response from the Notion server:",
        errorData.error_description,
      );
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // console.log("🚀 ~ authCallback ~ data:", data);

    // * Save the access token to the database (data.access_token)
    try {
      await db.insert(tokens).values({
        bot_id: data.bot_id,
        access_token: data.access_token,
        data: data,
      });
    } catch (error) {
      console.error("Error during insert:", error);
    }

    return { status: response.status };
  } catch (error) {
    console.error("Error during authCallback:", error);
  }
}
