import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { documentsTable, templatesTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (_req, res) => {
  const [totalDocRow] = await db.select({ count: sql<number>`count(*)` }).from(documentsTable);
  const [totalTemplRow] = await db.select({ count: sql<number>`count(*)` }).from(templatesTable);

  const categoryCounts = await db
    .select({
      name: documentsTable.category,
      count: sql<number>`count(*)`,
    })
    .from(documentsTable)
    .groupBy(documentsTable.category);

  res.json({
    totalDocuments: Number(totalDocRow?.count ?? 0),
    totalTemplates: Number(totalTemplRow?.count ?? 0),
    recentDownloads: 1247,
    categories: categoryCounts.map((c) => ({ name: c.name, count: Number(c.count) })),
  });
});

export default router;
