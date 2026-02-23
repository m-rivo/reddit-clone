import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("PROXY");
  const authCookie = request.cookies.get("pb_auth");
  const { pathname } = request.nextUrl;

  if (
    authCookie &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/confirm-verification" ||
      pathname === "/forgot-password" ||
      pathname === "/confirm-password-reset")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authCookie && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/confirm-verification",
    "/forgot-password",
    "/confirm-password-reset",
  ],
};
