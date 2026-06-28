package com.synk.backend.dto.communityDto;

import jakarta.validation.constraints.NotBlank;

public record CommunityUpdateRequestDto(
        @NotBlank String name,
        @NotBlank String description
) {}