import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Better-auth session cookie names
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/api/projects") ||
    request.nextUrl.pathname.startsWith("/api/journals")
  ) {
    if (!sessionCookie) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/projects/:path*", "/api/journals/:path*"],
};
