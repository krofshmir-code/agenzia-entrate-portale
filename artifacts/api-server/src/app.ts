import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import appDownloadRouter from "./routes/app-download";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(appDownloadRouter);

// In production, serve the built React frontend
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.resolve(
    __dirname,
    "../../agenzia-entrate/dist/public",
  );

  app.use(express.static(frontendDistPath));

  // SPA fallback: return index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
