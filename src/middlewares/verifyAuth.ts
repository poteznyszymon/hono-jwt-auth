import type { Context, Next } from "hono";
import { deleteCookie, getSignedCookie } from "hono/cookie";
import {
  ACCESS_TOKEN_SECRET,
  COOKIE_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config";
import { verify } from "hono/jwt";
import { createAndSetAccessToken } from "../utils/accessToken";

export const verifyAuth = async (c: Context, next: Next) => {
  try {
    const accessToken = await getSignedCookie(c, COOKIE_SECRET, "access_token");
    const refreshToken = await getSignedCookie(
      c,
      COOKIE_SECRET,
      "refresh_token"
    );

    if (accessToken) {
      try {
        const accessTokenPayload = await verify(
          accessToken,
          ACCESS_TOKEN_SECRET
        );

        c.set("userId", accessTokenPayload.sub);
        return await next();
      } catch {
        deleteCookie(c, "access_token");
      }
    }

    if (refreshToken) {
      try {
        const refreshTokenPayload = await verify(
          refreshToken,
          REFRESH_TOKEN_SECRET
        );

        await createAndSetAccessToken(c, String(refreshTokenPayload.sub));

        c.set("userId", refreshTokenPayload.sub);
        return await next();
      } catch {
        deleteCookie(c, "ref");
      }
    }

    return c.json(
      { success: false, message: "Unauthorized - No valid token provided" },
      401
    );
  } catch (error) {
    return c.json(
      { success: false, message: "Unauthorized - Invalid token" },
      401
    );
  }
};
