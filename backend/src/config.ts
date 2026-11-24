export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function validateEnvironment(): number {
  const jwtSecret = requiredEnv("JWT_SECRET");
  if (Buffer.byteLength(jwtSecret, "utf8") < 32) {
    throw new Error("JWT_SECRET must be at least 32 bytes long");
  }

  const port = Number(process.env.PORT ?? 4000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  requiredEnv("DATABASE_URL");
  return port;
}
