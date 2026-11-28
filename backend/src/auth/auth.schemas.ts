import { z } from "zod";

const isWithinBcryptLimit = (password: string) =>
  Buffer.byteLength(password, "utf8") <= 72;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine(isWithinBcryptLimit, "Password must not exceed 72 bytes");

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z
    .string()
    .min(1)
    .refine(isWithinBcryptLimit, "Password must not exceed 72 bytes"),
});
