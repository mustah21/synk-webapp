package com.synk.backend.dto.registrationDto;

import jakarta.validation.constraints.NotBlank;

public record RegistrationCreateRequestDto(
        @NotBlank String gamePublicId
) {}