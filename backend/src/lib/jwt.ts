import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";
import type { UserRole } from "@/models/User";

const encoder = new TextEncoder();
const secretKey = encoder.encode(env.JWT_SECRET);

export type AuthTokenPayload = {
  sub: string; // user id
  role: UserRole;
  email?: string;
};

export async function signAuthToken(payload: AuthTokenPayload) {
  // Shorter token lifetime for better security
  return new SignJWT({ role: payload.role, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("15m") // 15 minutes instead of 7 days
    .sign(secretKey);
}

// Refresh token function for longer-lived sessions
export async function signRefreshToken(payload: AuthTokenPayload) {
  return new SignJWT({ sub: payload.sub })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days for refresh token
    .sign(secretKey);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);

  if (!payload.sub || typeof payload.sub !== "string") {
    throw new Error("Invalid token subject");
  }

  const role = payload.role as UserRole;
  const email = payload.email as string | undefined;

  if (!role || typeof role !== "string") {
    throw new Error("Invalid token role");
  }

  return {
    sub: payload.sub,
    role,
    email,
  } satisfies AuthTokenPayload;
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);

  if (!payload.sub || typeof payload.sub !== "string") {
    throw new Error("Invalid refresh token subject");
  }

  return {
    sub: payload.sub,
  };
}
