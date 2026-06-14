package com.synk.backend.dto.userDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserLoginRequestDto(
        @Email @NotBlank String email,
        @NotBlank String password
) {}