package com.synk.backend.dto.gamesDto;

import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record GameResponseDto(
        String publicId,
        String title,
        String sportName,
        LocalDateTime hostingDate,
        String language,
        String gameDescription,
        UserSummaryDto creator,
        int registeredCount,
        LocalDateTime createdAt
) {}