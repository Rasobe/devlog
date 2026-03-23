package com.devlog.api.exception

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.Instant

data class ApiError(
    val timestamp: Instant = Instant.now(),
    val status: Int,
    val error: String,
    val message: String
)

class ResourceNotFoundException : RuntimeException {
    constructor(message: String) : super(message)
}

class ResourceAlreadyExistsException : RuntimeException {
    constructor(message: String) : super(message)
}

class UnauthorizedException : RuntimeException {
    constructor(message: String) : super(message)
}

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFound(ex: ResourceNotFoundException): ResponseEntity<ApiError> {
        return ResponseEntity.status(404).body(ApiError(
            status = 404,
            error = "Not Found",
            message = ex.message ?: "Resource not found"
        ))
    }

    @ExceptionHandler(ResourceAlreadyExistsException::class)
    fun handleConflict(ex: ResourceAlreadyExistsException): ResponseEntity<ApiError> {
        return ResponseEntity.status(409).body(ApiError(
            status =  409,
            error = "Resource Already Exists",
            message = ex.message ?: "Resource already exists"
        ))
    }

    @ExceptionHandler(UnauthorizedException::class)
    fun handleUnauthorized(ex: UnauthorizedException): ResponseEntity<ApiError> {
        return ResponseEntity.status(401).body(ApiError(
            status =  401,
            error = "Not Authorized",
            message = ex.message ?: "Unauthorized access"
        ))
    }

    @ExceptionHandler(Exception::class)
    fun handleGeneric(ex: Exception): ResponseEntity<ApiError> {
        return ResponseEntity.status(500).body(ApiError(
            status = 500,
            error = "Internal Server Error",
            message = "An unexpected error occurred"
        ))
    }
}