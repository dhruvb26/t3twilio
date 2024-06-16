CREATE TABLE IF NOT EXISTS "t3twilio_token" (
	"bot_id" varchar PRIMARY KEY NOT NULL,
	"access_token" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
