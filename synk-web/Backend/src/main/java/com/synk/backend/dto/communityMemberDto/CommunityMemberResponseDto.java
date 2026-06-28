package com.synk.backend.dto.communityMemberDto;

import com.synk.backend.dto.userDto.UserSummaryDto;

import java.time.LocalDateTime;

public record CommunityMemberResponseDto(
        UserSummaryDto user,
        String role,
        LocalDateTime joinedAt
) {}
