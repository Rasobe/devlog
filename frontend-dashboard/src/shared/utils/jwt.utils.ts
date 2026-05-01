/**
 * Decodifica la parte del payload de un token JWT sin verificar la firma.
 * Útil para comprobaciones rápidas de rutas en el Middleware.
 */
export function decodeJwtPayload<T>(token: string): T | null {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;

    // atob está disponible en el Next.js Edge Runtime
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
