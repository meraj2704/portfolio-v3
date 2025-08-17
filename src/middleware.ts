import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("portfolio-token");

  // Always allowed routes (no token required)
  const publicRoutes = ["/", "/login", "/sign-up", "/contact"];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // if (isDashboardRoute && !token) {
  //   const loginUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|favicon.ico).*)",
};
