package com.devlog.api.controller

import com.devlog.api.dto.UserStatsResponse
import com.devlog.application.service.UserService
import com.devlog.infrastructure.security.JwtService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "User endpoints")
class UserController(
    private val userService: UserService,
    private val jwtService: JwtService
) {

    @GetMapping("/me/stats")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Auth")
    @Operation(summary = "Get current user stats")
    fun getMyStats(
        @AuthenticationPrincipal userId: UUID
    ): ResponseEntity<UserStatsResponse> {
        return ResponseEntity.ok(userService.getStats(userId))
    }

}