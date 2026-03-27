CREATE TYPE "public"."document_type" AS ENUM('pdf', 'excel', 'word');--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"type" "document_type" NOT NULL,
	"description" text NOT NULL,
	"file_size" text DEFAULT '0 KB' NOT NULL,
	"download_url" text DEFAULT '#' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"has_logo" boolean DEFAULT true NOT NULL,
	"has_signature" boolean DEFAULT false NOT NULL,
	"preview_url" text,
	"download_url" text
);
