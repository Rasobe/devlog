package com.devlog.domain.repository

import com.devlog.domain.model.User

interface UserRepository {
    fun findByEmail(email: String): User?
    fun findById(id: Long): User?
    fun save(user: User): User
    fun existsByEmail(email: String): Boolean
}