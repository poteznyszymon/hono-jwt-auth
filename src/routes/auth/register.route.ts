import { Hono } from "hono";
import { z } from "zod";
import { registerSchema } from "../../validation/schemas";

import { genSalt, hash } from "bcrypt";

import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { eq } from "drizzle-orm";
import { createAndSetAccessToken } from "../../utils/accessToken";
import { createAndSetRefreshToken } from "../../utils/refreshToken";
import { verifyAuth } from "../../middlewares/verifyAuth";

const registerRouter = new Hono();

registerRouter.post("/register", async (c) => {
  try {
    const data = await c.req.json();
    const authData = registerSchema.parse(data);

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, authData.email));

    if (existingUsers.length > 0)
      return c.json({ success: false, message: "Email already taken" }, 409);

    const salt = await genSalt(10);
    const hashedPassword = await hash(authData.password, salt);

    const [newUser] = await db
      .insert(usersTable)
      .values({ ...authData, password: hashedPassword })
      .returning();

    if (!newUser)
      return c.json({ success: false, message: "Invalid user data" }, 400);

    await createAndSetAccessToken(c, newUser.id.toString());
    await createAndSetRefreshToken(c, newUser.id.toString());

    return c.json(
      {
        success: true,
        message: "User registered successfully",
        user: { ...newUser, password: undefined },
      },
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
        400
      );
    }
  }
});

registerRouter.post("/test", verifyAuth, (c) => {
  return c.json({ message: "ok" });
});

export default registerRouter;
