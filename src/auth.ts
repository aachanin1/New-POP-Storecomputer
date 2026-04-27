import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "pop_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminSession = {
  email: string;
  expiresAt: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_SECRET");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionToken(session: AdminSession) {
  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

function verifySessionToken(token: string): AdminSession | null {
  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeCompare(sign(payload), signature)) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AdminSession;

    if (!session.email || Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function verifyPassword(password: string) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!passwordHash) {
    throw new Error("Missing ADMIN_PASSWORD_HASH");
  }

  const [salt, hash] = passwordHash.split(":");

  if (!salt || !hash) {
    throw new Error("Invalid ADMIN_PASSWORD_HASH format");
  }

  const derivedHash = scryptSync(password, salt, 64).toString("hex");

  return safeCompare(derivedHash, hash);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function signInAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL");
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase() || !verifyPassword(password)) {
    return false;
  }

  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;

  cookieStore.set({
    name: SESSION_COOKIE,
    value: createSessionToken({ email: adminEmail, expiresAt }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return true;
}

export async function signOutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}
