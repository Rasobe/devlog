package com.devlog.domain.repository

import com.devlog.domain.model.Post
import java.util.UUID

interface PostRepository {
    fun findAll(publishedOnly: Boolean = false): List<Post>
    fun findById(id: UUID): Post?
    fun findBySlug(slug: String): Post?
    fun save(post: Post): Post
    fun delete(id: UUID)
    fun existsBySlug(slug: String): Boolean
    fun updateBySlug(slug: String, post: Post): Post
}