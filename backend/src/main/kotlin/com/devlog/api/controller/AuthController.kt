package com.devlog.api.controller

import com.devlog.api.dto.AuthResponse
import com.devlog.api.dto.LoginRequest
import com.devlog.api.dto.RegisterRequest
import com.devlog.application.service.AuthService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import com.devlog.api.dto.UserResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.UUID

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth", description = "Endpoints for user registration and login")
class AuthController(
    private val authService: AuthService,
) {

    @PostMapping("/register")
    @Operation(
        summary = "Register a new user",
        description = "Registers a new user with the provided username, email, and password. Returns an authentication response containing a JWT token upon successful registration."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "201", description = "User registered successfully"),
        ApiResponse(responseCode = "400", description = "Invalid registration request")
    ])
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request))
    }

    @PostMapping("/login")
    @Operation(
        summary = "Login a user",
        description = "Authenticates a user with the provided username and password. Returns an authentication response containing a JWT token upon successful login."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "User logged in successfully"),
        ApiResponse(responseCode = "400", description = "Invalid login request"),
        ApiResponse(responseCode = "401", description = "Invalid username or password")
    ])
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.ok(authService.login(request))
    }

    @GetMapping("/me")
    @Operation(
        summary = "Get current user",
        description = "Returns the currently authenticated user details. Requires a valid JWT token."
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "User details returned successfully"),
        ApiResponse(responseCode = "401", description = "Unauthorized or Token Expired"),
        ApiResponse(responseCode = "404", description = "User not found")
    ])
    fun getMe(@org.springframework.security.core.annotation.AuthenticationPrincipal userId: UUID): ResponseEntity<UserResponse> {
        return ResponseEntity.ok(authService.me(userId))
    }

}