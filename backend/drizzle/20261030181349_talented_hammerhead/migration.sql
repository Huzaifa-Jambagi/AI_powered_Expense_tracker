CREATE TABLE "users" (
	"id" uuid PRIMARY KEY,
	"clerk_id" varchar(64) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"onboarding_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX "users_clerk_id_idx" ON "users" ("clerk_id");