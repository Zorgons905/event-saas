import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma/client";
import { z } from "zod";
import { requiredEnv } from "../config";
import { prisma } from "../db/prisma";
import { loginSchema, registerSchema } from "./auth.schemas";

export const authRouter = Router();

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
} as const;

function createToken(userId: string): string {
  return jwt.sign({}, requiredEnv("JWT_SECRET"), {
    subject: userId,
    expiresIn: "1h",
    issuer: "event-saas",
    audience: "event-saas",
  });
}

function validationDetails(error: z.ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

authRouter.post("/register", async (request, response) => {
  const parsed = registerSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({
      error: "Invalid registration data",
      details: validationDetails(parsed.error),
    });
    return;
  }

  const { name, email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: publicUserSelect,
    });

    response.status(201).json({
      user,
      token: createToken(user.id),
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      response.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    throw error;
  }
});

authRouter.post("/login", async (request, response) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({
      error: "Invalid login data",
      details: validationDetails(parsed.error),
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: {
      ...publicUserSelect,
      passwordHash: true,
    },
  });
  const passwordMatches =
    user !== null && (await bcrypt.compare(parsed.data.password, user.passwordHash));

  if (!user || !passwordMatches) {
    response.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const { passwordHash: _passwordHash, ...publicUser } = user;
  response.json({
    user: publicUser,
    token: createToken(user.id),
  });
});
