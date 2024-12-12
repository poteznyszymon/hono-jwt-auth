import { cors } from "hono/cors";
import app from "./app";
import { PORT } from "./config";

app.use(
  "*",
  cors({
    origin: "*", // In production, set this to your frontend's origin
    credentials: true,
  })
);

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Server running on PORT: ${PORT}`);
