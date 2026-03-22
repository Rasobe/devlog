package com.devlog.domain.repository

import com.devlog.domain.model.Post

interface PostRepository {
    fun findAll(publishedOnly: Boolean = false): List<Post>
    fun findById(id: Long): Post?
    fun findBySlug(slug: String): Post?
    fun save(post: Post): Post
    fun delete(id: Long)
    fun existsBySlug(slug: String): Boolean
}