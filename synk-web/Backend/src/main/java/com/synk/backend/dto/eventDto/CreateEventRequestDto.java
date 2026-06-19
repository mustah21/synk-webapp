package com.synk.backend.dto.eventDto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateEventRequestDto(
        @NotBlank String title,
        @NotBlank Long userId,
        @NotBlank String sportName,
        @NotNull @Future LocalDateTime hostingDate,
        String language,
        @NotNull String eventDescription
){}
