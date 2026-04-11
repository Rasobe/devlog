package com.devlog.infrastructure.persistence.entity

import com.devlog.domain.model.User
import com.devlog.domain.model.UserRole
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "users")
class UserEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(nullable = false, name = "password_hash")
    var passwordHash: String,

    @Column(nullable = false, name = "display_name")
    var displayName: String,

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    var role: UserRole = UserRole.AUTHOR,

    @Column(nullable = false, name = "created_at", updatable = false)
    val createdAt: Instant = Instant.now()
) {
    // UserEntity → User (domain)
    fun toDomain(): User = User(
        id = id,
        email = email,
        passwordHash = passwordHash,
        displayName = displayName,
        role = role,
        createdAt = createdAt
    )

    companion object {
        // User (domain) → UserEntity
        fun fromDomain(user: User): UserEntity = UserEntity(
            id = user.id,
            email = user.email,
            passwordHash = user.passwordHash,
            displayName = user.displayName,
            role = user.role,
            createdAt = user.createdAt
        )
    }
}