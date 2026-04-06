package com.devlog.infrastructure.persistence.repository

import com.devlog.infrastructure.persistence.entity.PostEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface PostJpaRepository : JpaRepository<PostEntity, UUID> {
    fun findBySlug(slug: String): PostEntity?
    fun findAllByPublished(published: Boolean): List<PostEntity>
    fun existsBySlug(slug: String): Boolean
}