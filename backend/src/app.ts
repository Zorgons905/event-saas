import "dotenv/config";
import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./auth/auth.routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({ error: "Too many authentication attempts" });
    },
  }),
  authRouter,
);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ error: "Request body must be valid JSON" });
    return;
  }

  console.error("Unhandled request error", error);
  response.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);
