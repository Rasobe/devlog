package com.devlog.infrastructure.security

import com.devlog.domain.model.UserRole
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date
import java.util.UUID
import javax.crypto.SecretKey

@Service
class JwtService(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration-ms}") private val expirationMs: Long
) {
    private val key: SecretKey by lazy {
        Keys.hmacShaKeyFor(secret.toByteArray())
    }

    fun generateToken(email: String, userId: UUID?, role: UserRole): String {
        return Jwts.builder()
            .subject(email)
            .claim("userId", userId)
            .claim("role", role.name)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + expirationMs))
            .signWith(key)
            .compact()
    }

    fun extractEmail(token: String): String =
        extractClaims(token).subject  // el email está en subject, no en claims["email"]

    fun extractUserId(token: String): UUID =
        UUID.fromString(extractClaims(token)["userId"] as String)

    fun extractRole(token: String): String =
        extractClaims(token)["role"] as String

    fun isTokenValid(token: String): Boolean = runCatching {
        extractClaims(token).expiration.after(Date())
    }.getOrDefault(false)  // si el token es inválido/malformado, devuelve false sin explotar

    private fun extractClaims(token: String): Claims =
        Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .payload
}