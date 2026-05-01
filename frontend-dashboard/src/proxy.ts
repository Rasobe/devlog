import { ROUTES } from "@/presentation/config/routes";
import { UserRole } from "@/domain/models";
import { decodeJwtPayload } from "@/shared/utils";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = new Set<string>([ROUTES.LOGIN, ROUTES.REGISTER]);
const ADMIN_ROUTES = [ROUTES.CATEGORIES, ROUTES.TAGS];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = AUTH_ROUTES.has(pathname);

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (!token) return NextResponse.next();

  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAdminRoute) {
    const payload = decodeJwtPayload<{ role: string }>(token);

    if (payload?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.UNAUTHORIZED, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    String.raw`/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:png|svg|ico|jpg|jpeg|gif|webp)$).*)`,
  ],
};
