package com.synk.backend.dto.userDto;

import java.time.LocalDateTime;

public record UserResponseDto(
        String publicId,
        String firstName,
        String email,
        LocalDateTime createdAt
) {}