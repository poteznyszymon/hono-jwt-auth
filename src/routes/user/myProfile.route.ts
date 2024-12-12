import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { eq } from "drizzle-orm";

const myProfileRouter = new Hono();

myProfileRouter.get("/my-profile", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    return c.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      200
    );
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" });
  }
});

export default myProfileRouter;
