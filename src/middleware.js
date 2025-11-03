import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (
    request.nextUrl.pathname === "/api/signin" ||
    request.nextUrl.pathname === "/api/signup"
  ) {
    return;
  }

  if (authToken) {
    if (
      request.nextUrl.pathname.startsWith("/signin") ||
      request.nextUrl.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } else if (!authToken) {
    if (
      request.nextUrl.pathname.startsWith("/signin") ||
      request.nextUrl.pathname.startsWith("/signup")
    ) {
      return;
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}
export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/settings",
    "/signin",
    "/signup",
    "/api/:path*",
  ],
};
