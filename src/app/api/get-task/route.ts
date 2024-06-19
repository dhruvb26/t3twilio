"use server";
import { db } from "@/server/db";
import { tokens } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Client } from "@notionhq/client";
import { env } from "@/env";

export async function GET(req: Request) {
  // !Only for testing purposes getting the first access token only

  // Step 1: Get the first bot_id
  const getBotIdResult = await db
    .select({ bot_id: tokens.bot_id }) // Assuming the column is named 'bot_id'
    .from(tokens)
    .orderBy(tokens.bot_id) // Assuming 'bot_id' is the primary key and orders the rows
    .limit(1)
    .execute();

  if (getBotIdResult.length === 0) {
    return NextResponse.json({ error: "No bot_id found" });
  }

  const bot_id = getBotIdResult[0]?.bot_id ?? "";

  // Step 2: Get the row(s) where bot_id matches the obtained bot_id
  const row = await db
    .select()
    .from(tokens)
    .where(eq(tokens.bot_id, bot_id))
    .execute(); // Add .execute() to run the query

  const database_id = row[0]?.template_id ?? "";
  const access_token = row[0]?.access_token ?? "";

  const notion = new Client({ auth: access_token });

  const database_query = await notion.databases.query({
    database_id: database_id,
  });

  const result: any = database_query.results[0]; // TODO: Shouldn't be any
  // !Getting the first task only for testing purposes

  console.log(result);

  const id = result?.id;
  const name = result.properties.Name.title[0].plain_text;
  const description = result.properties.Description.rich_text[0].plain_text;
  const timeStamp = result.properties["Date & Time"].date.start;
  const contact = result.properties.Contact.phone_number;
  const method = result.properties.Method.select.name;

  const NGROK_URL = env.NGROK_URL;

  fetch(`${NGROK_URL}/api/initiate-job`, {
    method: "POST",
    body: JSON.stringify({ id, name, description, timeStamp, contact, method }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({ result });
}
