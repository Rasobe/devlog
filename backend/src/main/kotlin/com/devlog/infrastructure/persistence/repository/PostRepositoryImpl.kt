package com.devlog.infrastructure.persistence.repository

import com.devlog.domain.model.PagedResult
import com.devlog.domain.model.Post
import com.devlog.domain.model.enums.PostStatus
import com.devlog.domain.repository.PostRepository
import com.devlog.infrastructure.persistence.entity.PostEntity
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class PostRepositoryImpl(
    private val jpa: PostJpaRepository
) : PostRepository {
    override fun findAll(page: Int, size: Int, search: String?, status: PostStatus): PagedResult<Post> {
        val pageable = PageRequest.of(page, size)

        val result = when (status) {
            PostStatus.PUBLISHED -> if (search != null)
                jpa.findAllByPublishedTrueAndTitleContainingIgnoreCase(search, pageable)
            else
                jpa.findAllByPublishedTrue(pageable)

            PostStatus.DRAFT -> if (search != null)
                jpa.findAllByPublishedFalseAndTitleContainingIgnoreCase(search, pageable)
            else
                jpa.findAllByPublishedFalse(pageable)

            PostStatus.ALL -> if (search != null)
                jpa.findAllByTitleContainingIgnoreCase(search, pageable)
            else
                jpa.findAll(pageable)
        }

        return PagedResult(
            content = result.content.map { it.toDomain() },
            totalElements = result.totalElements,
            totalPages = result.totalPages,
            currentPage = result.number
        )
    }

    override fun findById(id: UUID): Post? {
        return jpa.findById(id).orElse(null)?.toDomain()
    }

    override fun findBySlug(slug: String): Post? {
        return jpa.findBySlug(slug)?.toDomain()
    }

    override fun save(post: Post): Post {
        return jpa.save(PostEntity.fromDomain(post)).toDomain()
    }

    override fun delete(slug: String) {
        val entity = jpa.findBySlug(slug) ?: throw NoSuchElementException("No posts found for $slug")
        return jpa.delete(entity)
    }

    override fun existsBySlug(slug: String): Boolean {
        return jpa.existsBySlug(slug)
    }

    override fun updateBySlug(slug: String, post: Post): Post {
        val entity = jpa.findBySlug(slug)
            ?: throw NoSuchElementException("Post with slug '$slug' not found")

        entity.title = post.title
        entity.content = post.content
        entity.excerpt = post.excerpt
        entity.published = post.published
        entity.updatedAt = post.updatedAt

        return jpa.save(entity).toDomain()
    }

    override fun getTotalViewsByAuthor(authorId: UUID): Long {
        TODO("Not yet implemented")
    }

}