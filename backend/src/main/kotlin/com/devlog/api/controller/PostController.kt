package com.devlog.api.controller

import com.devlog.api.dto.CreatePostRequest
import com.devlog.api.dto.PostResponse
import com.devlog.api.dto.UpdatePostRequest
import com.devlog.application.service.PostService
import com.devlog.infrastructure.security.JwtService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/posts")
class PostController(
    private val postService: PostService,
    private val jwtService: JwtService
) {

    @GetMapping
    fun getPosts(@RequestParam publishedOnly: Boolean = true) : ResponseEntity<List<PostResponse>> {
        return ResponseEntity.ok(postService.getAllPosts(publishedOnly).map { PostResponse.fromDomain(it) })
    }

    @GetMapping("/{slug}")
    fun getPostBySlug(@PathVariable slug: String): ResponseEntity<PostResponse> {
        return ResponseEntity.ok(PostResponse.fromDomain(postService.getPostBySlug(slug)))
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    fun createPost(
        @Valid @RequestBody request: CreatePostRequest,
        @RequestHeader("Authorization") authHeader: String
    ): ResponseEntity<PostResponse> {
        val userId = jwtService.extractUserId(authHeader.substring(7))
        val createdPost = postService.createPost(request, userId)
        return ResponseEntity.status(HttpStatus.CREATED).body(PostResponse.fromDomain(createdPost))
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    fun updatePost(@PathVariable id: Long, @Valid @RequestBody request: UpdatePostRequest): ResponseEntity<PostResponse> {
        val updatedPost = postService.updatePost(id, request)
        return ResponseEntity.ok(PostResponse.fromDomain(updatedPost))
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun deletePost(@PathVariable id: Long): ResponseEntity<Void> {
        postService.deletePost(id)
        return ResponseEntity.noContent().build()
    }

}