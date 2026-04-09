package com.devlog.domain.repository

import com.devlog.domain.model.PagedResult
import com.devlog.domain.model.Post
import java.util.UUID

interface PostRepository {
    fun findAll(
        page: Int = 0,
        size: Int = 10,
        search: String? = null,
        publishedOnly: Boolean = false
    ): PagedResult<Post>
    fun findById(id: UUID): Post?
    fun findBySlug(slug: String): Post?
    fun save(post: Post): Post
    fun delete(slug: String)
    fun existsBySlug(slug: String): Boolean
    fun updateBySlug(slug: String, post: Post): Post
}