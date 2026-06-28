package com.synk.backend.dto.communityDto;

import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record CommunityResponseDto(
        String publicId,
        String name,
        String description,
        UserSummaryDto creator,
        int memberCount,
        LocalDateTime createdAt
) {}
