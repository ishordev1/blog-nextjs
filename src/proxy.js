import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const authToken = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // Public backend routes (API)
  if (
    pathname === "/api/signin" ||
    pathname === "/api/signup" ||
    (pathname === "/api/blog" && request.method === "GET") ||
    (pathname.startsWith("/api/blog/") && request.method === "GET")
  ) {
    return NextResponse.next();
  }

  //  Public frontend routes (pages)
  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup");

  
  if (!authToken) {
    if (isPublicPage) {
      return NextResponse.next();
    } else {
      // redirect to signin for protected pages
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  //  If token exists (authenticated user)
  // only redirect when visiting signin/signup again
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/signin", 
    "/signup", 
    "/admin/:path*", 
    "/api/:path*"
  ],
};
