package com.synk.backend.dto.communityMemberDto;

import com.synk.backend.entity.CommunityMember;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddMemberRequestDto(
        @NotBlank String userPublicId,
        @NotNull CommunityMember.Role role
) {}