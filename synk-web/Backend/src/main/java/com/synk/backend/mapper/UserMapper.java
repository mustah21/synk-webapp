package com.synk.backend.mapper;


import com.synk.backend.dto.userDto.*;
import com.synk.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toResponseDto(User user);
    UserSummaryDto toSummaryDto(User user);

    UserSearchDto toSearchDto(User user);
    User toEntity(UserUpdateRequestDto user);

}