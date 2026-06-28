package com.synk.backend.dto.communityMemberDto;

import com.synk.backend.entity.CommunityMember;
import jakarta.validation.constraints.NotNull;

public record UpdateMemberRoleRequestDto(
        @NotNull CommunityMember.Role role
) {}