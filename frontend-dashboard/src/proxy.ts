import { ROUTES } from "@/presentation/config/routes";
import { UserRole } from "@/domain/models/auth.model";
import { decodeJwtPayload } from "@/shared/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

// Agrupamos rutas por propósito para facilitar el mantenimiento
const AUTH_ROUTES = new Set<string>([ROUTES.LOGIN, ROUTES.REGISTER]);
const ADMIN_ROUTES = [ROUTES.CATEGORIES, ROUTES.TAGS];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = AUTH_ROUTES.has(pathname);
  const isDashboardPage = pathname.startsWith(ROUTES.DASHBOARD);

  // 1. Redirección inversa: Si ya está logueado, no debe ver Login/Register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // 2. Auth Guard: Si intenta entrar al dashboard sin token o directamente no tiene token, va al login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // 3. Role Guard: Rutas protegidas por rol (Admin)
  // Verificamos si la ruta actual es una de las de admin o una sub-ruta de las mismas
  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAdminRoute) {
    const payload = decodeJwtPayload<{ role: string }>(token!);

    // Si el rol no es ADMIN, redirigimos a la raíz del dashboard
    if (payload?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // El "Negative Matcher" excluye archivos estáticos y API interna para máxima eficiencia
  matcher: [
    String.raw`/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:png|svg|ico|jpg|jpeg|gif|webp)$).*)`,
  ],
};
