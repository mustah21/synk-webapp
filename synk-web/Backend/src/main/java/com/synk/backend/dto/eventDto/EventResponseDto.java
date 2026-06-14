package com.synk.backend.dto.eventDto;

import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record EventResponseDto(
        String publicId,
        String title,
        String sportName,
        LocalDateTime hostingDate,
        String language,
        String eventDescription,
        UserSummaryDto creator,
        int registeredCount,
        LocalDateTime createdAt
) {}