// proxy.ts (raíz del proyecto)
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/login"]);

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Sin token → redirigir a login (excepto si ya está en login)
  if (!token && !PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Con token y en login → redirigir a dashboard
  if (token && PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
