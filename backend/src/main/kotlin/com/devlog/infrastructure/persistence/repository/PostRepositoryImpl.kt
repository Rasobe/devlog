package com.devlog.infrastructure.persistence.repository

import com.devlog.domain.model.Post
import com.devlog.domain.repository.PostRepository
import com.devlog.infrastructure.persistence.entity.PostEntity
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class PostRepositoryImpl(
    private val jpa: PostJpaRepository
) : PostRepository {
    override fun findAll(publishedOnly: Boolean): List<Post> {
        return if (publishedOnly) {
            jpa.findAllByPublished(true).map { it.toDomain() }
        } else {
            jpa.findAll().map { it.toDomain() }
        }
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

    override fun delete(id: UUID) {
        return jpa.deleteById(id)
    }

    override fun existsBySlug(slug: String): Boolean {
        return jpa.existsBySlug(slug)
    }

}