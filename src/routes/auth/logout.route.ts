import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";

const logoutRouter = new Hono();

logoutRouter.post("/logout", async (c) => {
  try {
    deleteCookie(c, "access_token");
    deleteCookie(c, "refresh_token");

    return c.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

export default logoutRouter;
