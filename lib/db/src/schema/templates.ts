import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const templatesTable = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  hasLogo: boolean("has_logo").notNull().default(true),
  hasSignature: boolean("has_signature").notNull().default(false),
  previewUrl: text("preview_url"),
  downloadUrl: text("download_url"),
});

export const insertTemplateSchema = createInsertSchema(templatesTable).omit({ id: true });
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templatesTable.$inferSelect;
