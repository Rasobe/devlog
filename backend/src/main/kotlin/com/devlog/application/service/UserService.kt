package com.devlog.application.service

import com.devlog.api.dto.UserStatsResponse
import com.devlog.domain.repository.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
@Transactional(readOnly = true)
class UserService(
    private val postRepository: PostRepository
) {
    fun getStats(authorId: UUID): UserStatsResponse {
        val totalViews = postRepository.getTotalViewsByAuthor(authorId)
        val totalPosts = postRepository.getTotalPostsByAuthor(authorId)
        val totalPublished = postRepository.getTotalPublishedPostsByAuthor(authorId)
        val totalDrafts = postRepository.getTotalDraftPostsByAuthor(authorId)

        return UserStatsResponse(
            totalPosts = totalPosts,
            totalPublishedPosts = totalPublished,
            totalDraftPosts = totalDrafts,
            totalViews = totalViews
        )
    }
}