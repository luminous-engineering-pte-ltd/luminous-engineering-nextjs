import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const isAdminLoginApi = pathname === "/api/admin/login";
  const sessionCookie = getSessionCookie(request);

  if (isAdminLoginApi) {
    return NextResponse.next();
  }

  if (isLogin && sessionCookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!isLogin && !sessionCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
