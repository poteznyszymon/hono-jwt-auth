import { Hono } from "hono";
import { z } from "zod";
import { loginSchema } from "../../validation/schemas";

import { compare } from "bcrypt";

import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { eq } from "drizzle-orm";
import { createAndSetAccessToken } from "../../utils/accessToken";
import { createAndSetRefreshToken } from "../../utils/refreshToken";

const loginRouter = new Hono();

loginRouter.post("/login", async (c) => {
  try {
    const data = await c.req.json();
    const authData = loginSchema.parse(data);

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, authData.email));

    if (existingUser.length < 1) {
      return c.json({ success: false, message: "Invalid credentials" }, 404);
    }

    const isPasswordValid = await compare(
      authData.password,
      existingUser[0].password
    );

    if (!isPasswordValid) {
      return c.json({ success: false, message: "Invalid credentials" }, 404);
    }

    await createAndSetAccessToken(c, existingUser[0].id.toString());
    await createAndSetRefreshToken(c, existingUser[0].id.toString());

    return c.json(
      { success: true, message: "User logged in successfully" },
      200
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        500
      );
    }
  }
});

export default loginRouter;
