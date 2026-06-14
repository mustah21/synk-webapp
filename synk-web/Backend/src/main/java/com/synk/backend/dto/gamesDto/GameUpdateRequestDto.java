package com.synk.backend.dto.gamesDto;


import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record GameUpdateRequestDto(
        @NotBlank String title,
        @NotBlank String sportName,
        @NotNull @Future LocalDateTime hostingDate,
        String language,
        @NotNull String gameDescription
) {}