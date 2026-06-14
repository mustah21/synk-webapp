package com.synk.backend.dto.eventDto;

import java.time.LocalDateTime;

public record EventSummaryDto(
        String publicId,
        String title,
        String sportName,
        LocalDateTime hostingDate
) {}