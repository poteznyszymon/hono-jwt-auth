import { sign } from "hono/jwt";
import { COOKIE_SECRET, NODE_ENV, REFRESH_TOKEN_SECRET } from "../config";
import { setSignedCookie } from "hono/cookie";
import type { Context } from "hono";

export const createAndSetRefreshToken = async (c: Context, userId: string) => {
  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };

  const refreshToken = await sign(payload, REFRESH_TOKEN_SECRET);

  await setSignedCookie(c, "refresh_token", refreshToken, COOKIE_SECRET, {
    path: "/",
    secure: NODE_ENV === "production",
    httpOnly: false,
    maxAge: 10 * 60,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    sameSite: "Strict",
  });

  return refreshToken;
};
