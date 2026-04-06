import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/auth"];
const PROTECTED_PREFIX = "/dashboard";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = Boolean(accessToken);

  if (isLoggedIn && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on /auth and all /dashboard routes, skip static files and Next internals
  matcher: ["/auth", "/dashboard/:path*"],
};
