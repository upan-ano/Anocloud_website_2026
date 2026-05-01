import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_PORTAL_PIN || "default_secret_key_change_me"
);

export async function createSession(pin: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  const session = await new SignJWT({ pin })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set("admin_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession(session: string | undefined) {
  try {
    if (!session) return false;
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return !!payload;
  } catch (error) {
    return false;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
