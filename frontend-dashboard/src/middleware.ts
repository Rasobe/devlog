import { ROUTES } from "@/presentation/config/routes";
import { UserRole } from "@/domain/models/auth.model";
import { decodeJwtPayload } from "@/shared/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

// Agrupamos rutas por propósito para facilitar el mantenimiento
const AUTH_ROUTES = new Set<string>([ROUTES.LOGIN, ROUTES.REGISTER]);
const ADMIN_ROUTES = [ROUTES.CATEGORIES, ROUTES.TAGS];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = AUTH_ROUTES.has(pathname);

  // 1. Redirección inversa: Si ya está logueado, no debe ver Login/Register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // 2. Auth Guard: Si NO tiene token y NO está en una página de auth (Login/Register), va al login
  // Esto protege TODO el sitio (incluyendo "/" y "/dashboard") de accesos anónimos.
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // Si llegamos aquí y no hay token, es porque está en una página de auth, permitimos el paso
  if (!token) return NextResponse.next();

  // 3. Role Guard: Rutas protegidas por rol (Admin)
  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAdminRoute) {
    const payload = decodeJwtPayload<{ role: string }>(token);

    // Si el rol no es ADMIN, lo devolvemos a la página principal del dashboard
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
