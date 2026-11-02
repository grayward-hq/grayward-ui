import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATH_PREFIXES = [
  "/",
  "/about-us",
  "/contact",
  "/faqs",
  "/how-it-works",
  "/legal-docs",
  "/press",
  "/waitlist",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/verify",
  "/register/verify-email",
  "/verify-email",
];

function isPublicPage(pathname: string) {
  return PUBLIC_PATH_PREFIXES.some((publicPath) => {
    if (publicPath === "/") {
      return pathname === publicPath;
    }

    return pathname === publicPath || pathname.startsWith(`${publicPath}/`);
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isPublicPage(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    const returnUrl = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("returnUrl", returnUrl);

    // Use 307 Temporary Redirect to ensure method and body are preserved if ever relevant
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/domain/:path*",
    "/scan/:path*",
    "/report/:path*",
    "/settings/:path*",
    "/repositories/:path*",
    "/github/:path*",
    "/alerts/:path*",
    "/trust-compliance/:path*",
    "/slack/:path*",
  ],
};
