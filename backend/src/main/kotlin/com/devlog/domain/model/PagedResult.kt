package com.devlog.domain.model

data class PagedResult<T>(
    val content: List<T>,
    val totalElements: Long,
    val totalPages: Int,
    val currentPage: Int
)
