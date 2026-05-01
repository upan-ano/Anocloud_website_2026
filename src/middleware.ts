import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes, but allow access to the login page itself
  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const isVerified = await verifySession(sessionCookie);

    if (!isVerified) {
      // Redirect to login if not verified
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
