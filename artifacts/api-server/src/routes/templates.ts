import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { templatesTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/templates", async (_req, res) => {
  const templates = await db.select().from(templatesTable);
  res.json(templates);
});

export default router;
