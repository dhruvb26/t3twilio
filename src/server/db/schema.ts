// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/pg-core";
import { object } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3twilio_${name}`);

export const tokens = createTable("token", {
  bot_id: varchar("bot_id").primaryKey().notNull(),
  access_token: varchar("access_token", { length: 256 }).notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  template_id: varchar("template_id", { length: 256 }).notNull(),
  workspace_id: varchar("workspace_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
