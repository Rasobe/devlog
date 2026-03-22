package com.devlog.domain.model

import java.time.Instant

data class User(
    val id: Long? = null,
    val email: String,
    val passwordHash: String,
    val displayName: String,
    val role: UserRole = UserRole.AUTHOR,
    val createdAt: Instant = Instant.now()
)

enum class UserRole {
    AUTHOR,
    ADMIN
}