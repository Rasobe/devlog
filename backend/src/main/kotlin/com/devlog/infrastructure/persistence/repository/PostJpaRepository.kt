package com.devlog.infrastructure.persistence.repository

import com.devlog.infrastructure.persistence.entity.PostEntity
import org.springframework.data.jpa.repository.JpaRepository

interface PostJpaRepository : JpaRepository<PostEntity, Long> {
    fun findBySlug(slug: String): PostEntity?
    fun findAllByPublished(published: Boolean): List<PostEntity>
    fun existsBySlug(slug: String): Boolean
}