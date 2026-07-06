import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const _rawSecret = process.env.SESSION_SECRET;
if (!_rawSecret) throw new Error("SESSION_SECRET environment variable is not set");
const JWT_SECRET: string = _rawSecret;
export const COOKIE_NAME = "yps_session";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser(
  cookieStore: ReadonlyRequestCookies
): Promise<SessionUser | null> {
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
