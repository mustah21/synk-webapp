package com.synk.backend.service;

import com.synk.backend.dto.communityMemberDto.*;

// join, leave, get
public interface CommunityMemberService {

    // add member
    CommunityMemberResponseDto joinMember(AddMemberRequestDto addMemberRequestDto);

    // update role
    CommunityMemberResponseDto updateMemberRole(UpdateMemberRoleRequestDto updateMemberRoleRequestDto, String communityPublicId);

    // leave community
    void leaveMember(String communityPublicId);

    // get authenticated user's membership details for a single community
    CommunityMemberResponseDto getMember(String communityPublicId);

}
