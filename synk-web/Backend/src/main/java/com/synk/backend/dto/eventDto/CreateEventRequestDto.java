package com.synk.backend.dto.eventDto;

import com.synk.backend.entity.Event;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public record CreateEventRequestDto(
        @NotBlank String title,
        @NotBlank String sportName,
        @NotNull @Future LocalDateTime hostingDate,
        Event.Language language,
        @NotNull String eventDescription
){}
// addding the userId manually in the controller