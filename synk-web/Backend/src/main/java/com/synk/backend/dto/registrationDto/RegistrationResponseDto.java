package com.synk.backend.dto.registrationDto;

import com.synk.backend.dto.gamesDto.GameSummaryDto;
import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record RegistrationResponseDto(
        String status,
        LocalDateTime registeredAt,
        GameSummaryDto game,
        UserSummaryDto user
) {}
