package com.devlog.infrastructure.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthFilter(
    private val jwtService: JwtService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // 1. Leer el header "Authorization" de la request
        val authHeader = request.getHeader("Authorization")

        // 2. Si no viene el header o no empieza por "Bearer ", dejamos pasar SIN autenticar
        //    Esto permite que rutas públicas (GET /posts, /auth/login) funcionen sin token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return  // salimos aquí, no ejecutamos el resto del filtro
        }

        // 3. Extraer el token — quitamos los primeros 7 caracteres ("Bearer ")
        //    "Bearer eyJhbGci..." → "eyJhbGci..."
        val token = authHeader.substring(7)

        // 4. Validar el token — si está expirado o malformado, dejamos pasar sin autenticar
        //    Spring Security denegará el acceso a rutas protegidas automáticamente
        if (!jwtService.isTokenValid(token)) {
            filterChain.doFilter(request, response)
            return
        }

        // 5. El token es válido — extraemos los datos que guardamos dentro
        val email = jwtService.extractEmail(token)   // el subject que pusimos en generateToken
        val role = jwtService.extractRole(token)     // el claim "role" que pusimos en generateToken

        println("DEBUG - email: $email, role: $role, authority: ROLE_$role")

        // 6. Creamos el objeto de autenticación que Spring Security entiende
        //    - email    → quién es el usuario (el "principal")
        //    - null     → no necesitamos las credenciales, el token ya las validó
        //    - listOf() → qué permisos tiene (ROLE_ADMIN o ROLE_AUTHOR)
        val auth = UsernamePasswordAuthenticationToken(
            email,
            null,
            listOf(SimpleGrantedAuthority("ROLE_$role"))
        )

        // 7. Metemos la identidad en el SecurityContext
        //    A partir de aquí Spring sabe quién es el usuario en esta request
        SecurityContextHolder.getContext().authentication = auth

        // 8. Dejamos continuar la request hacia el controller
        filterChain.doFilter(request, response)
    }
}