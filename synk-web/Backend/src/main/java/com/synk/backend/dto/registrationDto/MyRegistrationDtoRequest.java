package com.synk.backend.dto.registrationDto;

import com.synk.backend.dto.eventDto.EventSummaryDto;
import com.synk.backend.entity.Registration;

import java.time.LocalDateTime;


public record MyRegistrationDtoRequest(
        Registration.Status status,
        LocalDateTime registeredAt,
        EventSummaryDto event
) {
}

