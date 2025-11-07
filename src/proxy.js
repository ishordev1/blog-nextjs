import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function proxy(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (
    request.nextUrl.pathname === "/api/signin" ||
    request.nextUrl.pathname === "/api/signup"
  ) {
    return NextResponse.next();
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
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}
export const config = {
  matcher: ["/", "/signin", "/signup", "/admin/:path*", "/api/:path*"],
};
