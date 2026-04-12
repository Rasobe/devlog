package com.devlog.api.dto

data class UserStatsResponse(
    val totalViews: Long
)

data class UserResponse(
    val email: String,
    val displayName: String
)