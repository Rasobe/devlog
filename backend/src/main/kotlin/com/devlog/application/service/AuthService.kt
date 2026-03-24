import com.devlog.api.dto.AuthResponse
import com.devlog.api.dto.LoginRequest
import com.devlog.api.dto.RegisterRequest
import com.devlog.api.exception.ResourceAlreadyExistsException
import com.devlog.api.exception.UnauthorizedException
import com.devlog.domain.model.User
import com.devlog.domain.model.UserRole
import com.devlog.domain.repository.UserRepository
import com.devlog.infrastructure.security.JwtService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class AuthService(
    private val userRepository: UserRepository,
    private val jwtService: JwtService,
    private val passwordEncoder: PasswordEncoder
) {
    fun register (request: RegisterRequest) : AuthResponse {
        val existingUser = userRepository.existsByEmail(request.email)
        if (existingUser) {
            throw ResourceAlreadyExistsException("Email already registered")
        }

        val hashedPassword = passwordEncoder.encode(request.password)
        val user = User(
            email = request.email,
            passwordHash = hashedPassword,
            displayName = request.displayName,
            role = UserRole.AUTHOR
        )

        val savedUser = userRepository.save(user)

        val token = jwtService.generateToken(savedUser.email, savedUser.id, savedUser.displayName)

        return AuthResponse(
            token = token,
            email = savedUser.email,
            displayName = savedUser.displayName
        )
    }

    @Transactional(readOnly = true)
    fun login (request: LoginRequest) : AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw UnauthorizedException("Invalid credentials")

        if (!passwordEncoder.matches(request.password, user.passwordHash)) {
            throw UnauthorizedException("Invalid credentials")
        }

        val token = jwtService.generateToken(user.email, user.id, user.displayName)
        return AuthResponse(
            token = token,
            email = user.email,
            displayName = user.displayName
        )
    }
}