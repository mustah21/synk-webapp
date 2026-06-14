package com.synk.backend.dto.userDto;


import jakarta.validation.constraints.NotBlank;

public record UserUpdateRequestDto(
        @NotBlank String name,
        @NotBlank String email
) {}