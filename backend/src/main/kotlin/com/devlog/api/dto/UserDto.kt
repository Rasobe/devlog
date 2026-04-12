package com.devlog.api.dto

data class UserStatsResponse(
    val totalPosts: Long,
    val totalPublishedPosts: Long,
    val totalDraftPosts: Long,
    val totalViews: Long
)

data class UserResponse(
    val email: String,
    val displayName: String
)