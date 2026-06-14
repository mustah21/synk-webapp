package com.synk.backend.dto.registrationDto;

import com.synk.backend.dto.eventDto.EventSummaryDto;
import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record RegistrationResponseDto(
        String status,
        LocalDateTime registeredAt,
        EventSummaryDto game,
        UserSummaryDto user
) {}
