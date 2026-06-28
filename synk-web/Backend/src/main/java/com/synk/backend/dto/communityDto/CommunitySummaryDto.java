package com.synk.backend.dto.communityDto;

public record CommunitySummaryDto(
        String publicId,
        String name,
        String description,
        int memberCount
) {}