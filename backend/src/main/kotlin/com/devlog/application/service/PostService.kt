package com.devlog.application.service

import com.devlog.api.dto.CreatePostRequest
import com.devlog.api.dto.UpdatePostRequest
import com.devlog.api.exception.ResourceAlreadyExistsException
import com.devlog.api.exception.ResourceNotFoundException
import com.devlog.domain.model.Post
import com.devlog.domain.repository.PostRepository
import org.springframework.stereotype.Service
import java.util.UUID
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class PostService(
    private val postRepository: PostRepository
) {
    fun getAllPosts(publishedOnly: Boolean) : List<Post> {
        return postRepository.findAll(publishedOnly)
    }

    fun getPostBySlug(slug: String) : Post {
        return postRepository.findBySlug(slug) ?: throw ResourceNotFoundException("Post not found")
    }

    fun getPostById(id: UUID) : Post {
        return postRepository.findById(id) ?: throw ResourceNotFoundException("Post not found")
    }

    @Transactional
    fun createPost(request: CreatePostRequest, authorId: Long): Post {
        val slug = generateSlug(request.title)
        if (postRepository.existsBySlug(slug)) {
            throw ResourceAlreadyExistsException("...")
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
    fun updatePost(id: UUID, request: UpdatePostRequest) : Post {
        val existingPost = postRepository.findById(id) ?: throw ResourceNotFoundException("Post not found")
        val updatedPost = existingPost.copy(
            title = request.title ?: existingPost.title,
            content = request.content ?: existingPost.content,
            excerpt = request.excerpt ?: existingPost.excerpt,
            published = request.published ?: existingPost.published
        )
        return postRepository.save(updatedPost)
    }

    @Transactional
    fun deletePost(id: UUID) {
        postRepository.findById(id) ?: throw ResourceNotFoundException("Post not found")
        postRepository.delete(id)
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