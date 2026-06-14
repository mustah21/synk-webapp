package com.synk.backend.dto.userDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterRequestDto(
        @Email @NotBlank String email,
        @NotBlank @Size(min = 8) String password
) {}