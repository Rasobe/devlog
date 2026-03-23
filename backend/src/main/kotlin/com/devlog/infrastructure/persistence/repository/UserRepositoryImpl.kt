package com.devlog.infrastructure.persistence.repository

import com.devlog.domain.model.User
import com.devlog.domain.repository.UserRepository
import com.devlog.infrastructure.persistence.entity.UserEntity
import org.springframework.stereotype.Component

@Component
class UserRepositoryImpl(
    private val jpa: UserJpaRepository
) : UserRepository {
    override fun findByEmail(email: String): User? {
        return jpa.findByEmail(email)?.toDomain()
    }

    override fun findById(id: Long): User? {
        return jpa.findById(id).orElse(null)?.toDomain()
    }

    override fun save(user: User): User {
        return jpa.save(UserEntity.fromDomain(user)).toDomain()
    }

    override fun existsByEmail(email: String): Boolean {
        return jpa.existsByEmail(email)
    }

}