package com.devlog.api.dto

import com.devlog.domain.model.Post
import jakarta.validation.constraints.NotBlank
import java.time.Instant

data class CreatePostRequest(
    @field:NotBlank(message = "Title is required")
    val title: String,

    @field:NotBlank(message = "Content is required")
    val content: String,

    val excerpt: String,
    val published: Boolean = false
)

data class UpdatePostRequest(
    val title: String? = null,
    val content: String? = null,
    val excerpt: String? = null,
    val published: Boolean? = null
)

data class PostResponse(
    val title: String,
    val slug: String,
    val content: String,
    val excerpt: String,
    val published: Boolean,
    val views: Long,
    val createdAt: Instant,
    val updatedAt: Instant
) {
    companion object {
        fun fromDomain(post: Post) : PostResponse {
            return PostResponse(
                title = post.title,
                slug = post.slug,
                content = post.content,
                excerpt = post.excerpt,
                published = post.published,
                views = post.views,
                createdAt = post.createdAt,
                updatedAt = post.updatedAt
            )
        }
    }
}