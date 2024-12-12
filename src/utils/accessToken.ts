import { sign } from "hono/jwt";
import { ACCESS_TOKEN_SECRET, COOKIE_SECRET, NODE_ENV } from "../config";
import { setSignedCookie } from "hono/cookie";
import type { Context } from "hono";

export const createAndSetAccessToken = async (c: Context, userId: string) => {
  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 6, // 10 minutes
  };

  const accessToken = await sign(payload, ACCESS_TOKEN_SECRET);

  await setSignedCookie(c, "access_token", accessToken, COOKIE_SECRET, {
    path: "/",
    secure: NODE_ENV === "production",
    httpOnly: false,
    maxAge: 10 * 60,
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    sameSite: "Strict",
  });

  return accessToken;
};
