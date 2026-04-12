package com.devlog.api.controller

import com.devlog.api.dto.CreatePostRequest
import com.devlog.api.dto.PostResponse
import com.devlog.api.dto.UpdatePostRequest
import com.devlog.application.service.PostService
import com.devlog.domain.model.PagedResult
import com.devlog.domain.model.enums.PostStatus
import com.devlog.infrastructure.security.JwtService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/posts")
@Tag(name = "Posts", description = "Posts endpoints for handling blog posts")
class PostController(
    private val postService: PostService,
    private val jwtService: JwtService
) {

    @GetMapping
    @Operation(
        summary = "Get all posts",
        description = "Retrieves a list of all blog posts. Optionally, you can filter to only include published posts by setting the 'publishedOnly' query parameter to true."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "OK"),
    ])
    fun getPosts(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "20") size: Int,
        @RequestParam(required = false) search: String?,
        @RequestParam(defaultValue = "ALL") status: PostStatus
    ) : ResponseEntity<PagedResult<PostResponse>> {
        val response = postService.getAllPosts(page, size, search, status)
        return ResponseEntity.ok(
            PagedResult(
                content = response.content.map { PostResponse.fromDomain(it) },
                totalElements = response.totalElements,
                totalPages = response.totalPages,
                currentPage = response.currentPage
            )
        )
    }

    @GetMapping("/{slug}")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "404", description = "Post not found")
    ])
    @Operation(
        summary = "Get post by slug",
        description = "Retrieves a single blog post by its slug. The slug is a URL-friendly identifier for the post, typically derived from the post's title. For example, a post titled 'My First Post' might have a slug of 'my-first-post'."
    )
    fun getPostBySlug(@PathVariable slug: String): ResponseEntity<PostResponse> {
        return ResponseEntity.ok(PostResponse.fromDomain(postService.getPostBySlug(slug)))
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Auth")
    @Operation(
        summary = "Create a new post",
        description = "Creates a new blog post. The request body should include the title, content, and optionally the published status of the post. The authenticated user will be set as the author of the post."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "201", description = "OK"),
        ApiResponse(responseCode = "400", description = "Invalid request data"),
        ApiResponse(responseCode = "401", description = "Unauthorized")
    ])
    fun createPost(
        @Valid @RequestBody request: CreatePostRequest,
        @AuthenticationPrincipal userId: UUID
    ): ResponseEntity<PostResponse> {
        val createdPost = postService.createPost(request, userId)
        return ResponseEntity.status(HttpStatus.CREATED).body(PostResponse.fromDomain(createdPost))
    }

    @PutMapping("/{slug}")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Auth")
    @Operation(
        summary = "Update an existing post by slug",
        description = "Updates an existing blog post using the slug. The request body can include the title, content, and published status of the post. Only the author of the post or an admin can update the post."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "400", description = "Invalid request data"),
        ApiResponse(responseCode = "401", description = "Unauthorized")
    ])
    fun updatePostBySlug(@PathVariable slug: String, @Valid @RequestBody request: UpdatePostRequest): ResponseEntity<PostResponse> {
        val updatedPost = postService.updatePostBySlug(slug, request)
        return ResponseEntity.ok(PostResponse.fromDomain(updatedPost))
    }

    @DeleteMapping("/{slug}")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Auth")
    @Operation(
        summary = "Delete a post",
        description = "Deletes a blog post by its slug. Only an admin can delete a post."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Post deleted successfully"),
        ApiResponse(responseCode = "401", description = "Unauthorized"),
        ApiResponse(responseCode = "404", description = "Post not found")
    ])
    fun deletePost(@PathVariable slug: String): ResponseEntity<Void> {
        postService.deletePost(slug)
        return ResponseEntity.noContent().build()
    }

}