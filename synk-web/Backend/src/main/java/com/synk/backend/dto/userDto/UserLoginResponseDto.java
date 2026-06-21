package com.synk.backend.dto.userDto;

public record UserLoginResponseDto(
        String token,
        UserResponseDto user
) {}
