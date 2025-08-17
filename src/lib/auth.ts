"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "admin_session";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminpassword123"; // **IMPORTANT: In a real app, never hardcode this! Use environment variables and proper hashing.**

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    // In a real app, generate a secure session token
    const sessionId = `admin_session_${Date.now()}`;
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  } else {
    return { success: false, error: "Invalid password" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = await cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return !!session;
}

export async function protectRoute() {
  const authenticated = await isAuthenticated();
  // This is a server-side only function
  if (!authenticated) {
    redirect("/login");
  }
}
