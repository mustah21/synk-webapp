package com.synk.backend.mapper;

import com.synk.backend.dto.communityDto.CommunitySummaryDto;
import com.synk.backend.dto.communityDto.CommunityResponseDto;
import com.synk.backend.dto.communityDto.CommunityUpdateRequestDto;
import com.synk.backend.entity.Community;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface CommunityMapper {

    @Mapping(target = "creator", source = "creator")
    @Mapping(target = "memberCount", expression = "java(community.getMembers() != null ? community.getMembers().size() : 0)")
    CommunityResponseDto toResponseDto(Community community);

    @Mapping(target = "memberCount", expression = "java(community.getMembers() != null ? community.getMembers().size() : 0)")
    CommunitySummaryDto toSummaryDto(Community community);

    @Mapping(target = "communityId", ignore = true)
    @Mapping(target = "publicId", ignore = true)
    @Mapping(target = "creator", ignore = true)
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateCommunityFromDto(CommunityUpdateRequestDto dto, @MappingTarget Community community);
}