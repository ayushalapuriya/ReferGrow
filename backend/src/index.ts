import fs from "node:fs";
import path from "node:path";

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const backendEnvPath = path.resolve(__dirname, "../.env");
const repoRootEnvPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: fs.existsSync(backendEnvPath) ? backendEnvPath : repoRootEnvPath });


const app = express();

const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";

// Support multiple CORS origins (comma-separated)
const allowedOrigins = corsOrigin.split(",").map(o => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

async function main() {
  // Connect to MongoDB at startup
  const { connectToDatabase } = await import("./lib/db");
  await connectToDatabase();

  const { registerRoutes } = await import("./routes");
  registerRoutes(app);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[Server] ReferGrow API listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
