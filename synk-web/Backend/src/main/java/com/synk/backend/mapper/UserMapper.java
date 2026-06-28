package com.synk.backend.mapper;


import com.synk.backend.dto.userDto.*;
import com.synk.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Entity -> DTO: full user profile, used when returning a single user's complete details
    UserResponseDto toResponseDto(User user);

    // Entity -> DTO: minimal user info
    UserSummaryDto toSummaryDto(User user);

    // Entity -> DTO: Lightweight fields for search/autocomplete results
    UserSearchDto toSearchDto(User user);

    // DTO -> Entity: maps incoming update request fields onto a User entity, used when applying a profile update
    User toEntityUserRegister(UserRegisterRequestDto user);

    void updateUserFromDto(UserProfileUpdateDto dto, @MappingTarget User existingUser);

}