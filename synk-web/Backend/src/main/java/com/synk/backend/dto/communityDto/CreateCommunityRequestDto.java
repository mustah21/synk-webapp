package com.synk.backend.dto.communityDto;

import jakarta.validation.constraints.NotBlank;

public record CreateCommunityRequestDto(
        @NotBlank String name,
        @NotBlank String description
) {}