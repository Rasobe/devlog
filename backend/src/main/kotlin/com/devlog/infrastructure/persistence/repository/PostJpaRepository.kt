package com.devlog.infrastructure.persistence.repository

import com.devlog.infrastructure.persistence.entity.PostEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface PostJpaRepository : JpaRepository<PostEntity, UUID> {
    fun findBySlug(slug: String): PostEntity?
    fun existsBySlug(slug: String): Boolean
    fun findAllByPublishedTrue(pageable: Pageable): Page<PostEntity>
    fun findAllByTitleContainingIgnoreCase(title: String, pageable: Pageable): Page<PostEntity>
    fun findAllByPublishedTrueAndTitleContainingIgnoreCase(title: String, pageable: Pageable): Page<PostEntity>
    fun findAllByPublishedFalse(pageable: Pageable): Page<PostEntity>
    fun findAllByPublishedFalseAndTitleContainingIgnoreCase(title: String, pageable: Pageable): Page<PostEntity>

    @Query("SELECT COALESCE(SUM(p.views), 0) FROM PostEntity p WHERE p.authorId = :authorId")
    fun sumViewsByAuthorId(@Param("authorId") authorId: UUID): Long
}