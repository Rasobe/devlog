package com.devlog.infrastructure.persistence.entity

import com.devlog.domain.model.Post
import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "posts")
class PostEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    var title: String,

    @Column(nullable = false, unique = true)
    var slug: String,

    @Column(nullable = false, columnDefinition = "TEXT")
    var content: String,

    @Column(nullable = false)
    var excerpt: String,

    @Column(nullable = false)
    var published: Boolean = false,

    @Column(name = "author_id", nullable = false)
    var authorId: Long,

    @Column(name = "created_at", updatable = false)
    val createdAt: Instant = Instant.now(),

    @Column(name = "updated_at")
    var updatedAt: Instant = Instant.now()
) {
    // PostEntity → Post (domain)
    fun toDomain(): Post = Post(
        id = id,
        title = title,
        slug = slug,
        content = content,
        excerpt = excerpt,
        published = published,
        authorId = authorId,
        createdAt = createdAt,
        updatedAt = updatedAt
    )

    companion object {
        // Post (domain) → PostEntity
        fun fromDomain(post: Post): PostEntity = PostEntity(
            id = post.id,
            title = post.title,
            slug = post.slug,
            content = post.content,
            excerpt = post.excerpt,
            published = post.published,
            authorId = post.authorId,
            createdAt = post.createdAt,
            updatedAt = post.updatedAt
        )
    }
}