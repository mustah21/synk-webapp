package com.synk.backend.dto.userDto;

import java.time.LocalDateTime;

public record UserResponseDto(
        String publicId,
        String firstName,
        String lastName,
        String email,
        LocalDateTime createdAt
) {}