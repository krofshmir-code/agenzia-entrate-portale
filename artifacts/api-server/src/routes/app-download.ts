import { Router } from "express";
import archiver from "archiver";
import * as path from "path";
import * as fs from "fs";

const router = Router();

const EXCLUDE = ["node_modules", "dist", ".git", ".cache"];

router.get("/download", (req, res) => {
  const appDir = path.resolve(process.cwd(), "..", "agenzia-entrate");

  if (!fs.existsSync(appDir)) {
    res.status(404).json({ error: "App directory not found" });
    return;
  }

  const filename = "agenzia-entrate-app.zip";
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  const archive = archiver("zip", { zlib: { level: 6 } });

  archive.on("error", (err) => {
    console.error("Archive error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create archive" });
    }
  });

  archive.pipe(res);

  archive.glob("**/*", {
    cwd: appDir,
    ignore: EXCLUDE.map((e) => `${e}/**`).concat(EXCLUDE),
    dot: false,
  });

  archive.finalize();
});

export default router;
