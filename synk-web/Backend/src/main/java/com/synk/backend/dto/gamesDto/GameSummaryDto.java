package com.synk.backend.dto.gamesDto;

import java.time.LocalDateTime;

public record GameSummaryDto(
        String publicId,
        String title,
        String sportName,
        LocalDateTime hostingDate
) {}