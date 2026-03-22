package com.devlog.domain.model

import java.time.Instant

data class Post(
    val id: Long? = null,
    val title: String,
    val slug: String,
    val content: String,
    val excerpt: String,
    val published: Boolean = false,
    val authorId: Long,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
)
