ALTER TABLE "posts" ALTER COLUMN "published" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text;--> statement-breakpoint
UPDATE "users" SET "username" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE("display_name", '[^a-zA-Z0-9 -]', '', 'g'), '\s+', '-', 'g')) WHERE "username" IS NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");