package com.synk.backend.dto.registrationDto;


import com.synk.backend.dto.userDto.UserSummaryDto;
import java.time.LocalDateTime;

public record AttendeeDtoRequest(
        String status,
        LocalDateTime registeredAt,
        UserSummaryDto user
) {}