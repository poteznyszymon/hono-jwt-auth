import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.number().default(3000),
  COOKIE_SECRET: z.string().default(process.env.COOKIE_SECRET!),
  ACCESS_TOKEN_SECRET: z.string().default(process.env.ACCESS_TOKEN_SECRET!),
  REFRESH_TOKEN_SECRET: z.string().default(process.env.REFRESH_TOKEN_SECRET!),
});

export const env = envSchema.parse(envSchema);

export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT;
export const COOKIE_SECRET = env.COOKIE_SECRET;
export const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;
