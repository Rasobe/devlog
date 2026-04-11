package com.devlog.application.service

import com.devlog.api.dto.CreatePostRequest
import com.devlog.api.dto.UpdatePostRequest
import com.devlog.api.exception.ResourceAlreadyExistsException
import com.devlog.api.exception.ResourceNotFoundException
import com.devlog.domain.model.PagedResult
import com.devlog.domain.model.Post
import com.devlog.domain.model.enums.PostStatus
import com.devlog.domain.repository.PostRepository
import org.springframework.stereotype.Service
import java.util.UUID
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class PostService(
    private val postRepository: PostRepository
) {
    fun getAllPosts(page: Int, size: Int, search: String?, status: PostStatus) : PagedResult<Post> {
        return postRepository.findAll(page, size, search, status)
    }

    fun getPostBySlug(slug: String) : Post {
        return postRepository.findBySlug(slug) ?: throw ResourceNotFoundException("Post not found")
    }

    @Transactional
    fun createPost(request: CreatePostRequest, authorId: UUID): Post {
        val slug = generateSlug(request.title)

        if (postRepository.existsBySlug(slug)) {
            throw ResourceAlreadyExistsException("A post with this title already exists")
        }

        val post = Post(
            title = request.title,
            slug = slug,
            content = request.content,
            excerpt = request.excerpt,
            published = request.published,
            authorId = authorId
        )
        return postRepository.save(post)
    }

    @Transactional
    fun updatePostBySlug(slug: String, request: UpdatePostRequest): Post {
        val existingPost = postRepository.findBySlug(slug)
            ?: throw ResourceNotFoundException("Post not found")



        val updatedPost = existingPost.copy(
            title = request.title ?: existingPost.title,
            slug = existingPost.slug,
            content = request.content ?: existingPost.content,
            excerpt = request.excerpt ?: existingPost.excerpt,
            published = request.published ?: existingPost.published
        )

        return postRepository.save(updatedPost)
    }

    @Transactional
    fun deletePost(slug: String) {
        postRepository.findBySlug(slug) ?: throw ResourceNotFoundException("Post not found")
        postRepository.delete(slug)
    }

    private fun generateSlug(title: String): String {
        return title
            .lowercase()
            .trim()
            .replace(Regex("[^a-z0-9\\s-]"), "")
            .replace(Regex("\\s+"), "-")
            .replace(Regex("-+"), "-")
    }

}