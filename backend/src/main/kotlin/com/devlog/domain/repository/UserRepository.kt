package com.devlog.domain.repository

import com.devlog.domain.model.User

interface UserRepository {
    fun findByEmail(email: String): User?
    fun findById(id: java.util.UUID): User?
    fun save(user: User): User
    fun existsByEmail(email: String): Boolean
}