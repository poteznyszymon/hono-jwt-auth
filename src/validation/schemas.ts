import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Wrong email format" }),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty" })
    .max(20, { message: "Username must be shorter than 20 characters" }),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Wrong email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type loginValues = z.infer<typeof loginSchema>;
export type registerValues = z.infer<typeof registerSchema>;
