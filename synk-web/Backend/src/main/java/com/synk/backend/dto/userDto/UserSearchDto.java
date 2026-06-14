package com.synk.backend.dto.userDto;


import jakarta.validation.constraints.Email;

public record UserSearchDto(

        Long publicId,
        String firstName,
        String lastName,
        @Email String email
) {}