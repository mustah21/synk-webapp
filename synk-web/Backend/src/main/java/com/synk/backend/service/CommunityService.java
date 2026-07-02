package com.synk.backend.service;

import com.synk.backend.dto.communityDto.CommunityResponseDto;
import com.synk.backend.dto.communityDto.CommunitySummaryDto;
import com.synk.backend.dto.communityDto.CommunityUpdateRequestDto;
import com.synk.backend.dto.communityDto.CreateCommunityRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

// CRUD
public interface CommunityService {

    // create
    CommunityResponseDto createCommunity(CreateCommunityRequestDto createCommunityRequestDto);

    // Update
    CommunityResponseDto updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto, String publicCommunityId);

    // delete
    String deleteCommunity(String communityPublicId);

    // get a single community with publicId
    CommunityResponseDto getCommunity(String communityPublicId);

    // get all communities - no auth
    Page<CommunityResponseDto> getAllCommunities(Pageable pageable);

    // get all communities for the authenticated user
    List<CommunitySummaryDto> getUsersCommunities();

    // get communities the authenticated user created
    List<CommunitySummaryDto> getCreatedCommunities();

}


