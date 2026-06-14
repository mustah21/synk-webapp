package com.synk.backend.dto.userDto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;


public record UserProfileUpdateDto (
    @NotBlank String firstName,
    @NotBlank String lastName,
    LocalDateTime updatedAt
){}