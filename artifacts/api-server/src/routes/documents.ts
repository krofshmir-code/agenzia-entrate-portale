import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { documentsTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  CreateDocumentBody,
  GetDocumentParams,
  DeleteDocumentParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/documents", async (_req, res) => {
  const documents = await db
    .select()
    .from(documentsTable)
    .orderBy(desc(documentsTable.uploadedAt));
  res.json(documents.map((d) => ({
    ...d,
    uploadedAt: d.uploadedAt.toISOString(),
    tags: d.tags ?? [],
  })));
});

router.post("/documents", async (req, res) => {
  const body = CreateDocumentBody.parse(req.body);
  const [created] = await db
    .insert(documentsTable)
    .values({
      title: body.title,
      category: body.category,
      type: body.type,
      description: body.description,
      fileSize: "0 KB",
      downloadUrl: "#",
      tags: body.tags ?? [],
    })
    .returning();
  res.status(201).json({
    ...created,
    uploadedAt: created.uploadedAt.toISOString(),
    tags: created.tags ?? [],
  });
});

router.get("/documents/:id", async (req, res) => {
  const { id } = GetDocumentParams.parse({ id: Number(req.params.id) });
  const [doc] = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.id, id));
  if (!doc) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...doc, uploadedAt: doc.uploadedAt.toISOString(), tags: doc.tags ?? [] });
});

router.delete("/documents/:id", async (req, res) => {
  const { id } = DeleteDocumentParams.parse({ id: Number(req.params.id) });
  await db.delete(documentsTable).where(eq(documentsTable.id, id));
  res.status(204).send();
});

export default router;
