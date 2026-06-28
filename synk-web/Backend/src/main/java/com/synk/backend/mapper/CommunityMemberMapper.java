package com.synk.backend.mapper;


import com.synk.backend.dto.communityMemberDto.CommunityMemberResponseDto;
import com.synk.backend.entity.CommunityMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface CommunityMemberMapper {

    @Mapping(target = "user", source = "user")
    @Mapping(target = "role", expression = "java(member.getRole().name())")
    CommunityMemberResponseDto toMemberResponseDto(CommunityMember member);

}