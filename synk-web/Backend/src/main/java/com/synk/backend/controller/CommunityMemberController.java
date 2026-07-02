package com.synk.backend.controller;

import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.communityMemberDto.AddMemberRequestDto;
import com.synk.backend.dto.communityMemberDto.CommunityMemberResponseDto;
import com.synk.backend.dto.communityMemberDto.UpdateMemberRoleRequestDto;
import com.synk.backend.service.CommunityMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/community-member")
@RequiredArgsConstructor
public class CommunityMemberController {

    private final CommunityMemberService communityMemberService;

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<CommunityMemberResponseDto>> joinCommunity(
            @Valid @RequestBody AddMemberRequestDto dto) {
        CommunityMemberResponseDto member = communityMemberService.joinMember(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<CommunityMemberResponseDto>builder()
                        .status(HttpStatus.CREATED.value())
                        .message("Joined community successfully")
                        .data(member)
                        .build());
    }

    @PatchMapping("/{communityPublicId}/role")
    public ResponseEntity<ApiResponse<CommunityMemberResponseDto>> updateMemberRole(
            @PathVariable String communityPublicId,
            @Valid @RequestBody UpdateMemberRoleRequestDto dto) {
        CommunityMemberResponseDto updated = communityMemberService.updateMemberRole(dto, communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<CommunityMemberResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Role updated successfully")
                        .data(updated)
                        .build());
    }

    @DeleteMapping("/{communityPublicId}/leave")
    public ResponseEntity<ApiResponse<Void>> leaveCommunity(
            @PathVariable String communityPublicId) {
        communityMemberService.leaveMember(communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .status(HttpStatus.OK.value())
                        .message("Left community successfully")
                        .build());
    }

    @GetMapping("/{communityPublicId}/me")
    public ResponseEntity<ApiResponse<CommunityMemberResponseDto>> getMyMembership(
            @PathVariable String communityPublicId) {
        CommunityMemberResponseDto member = communityMemberService.getMember(communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<CommunityMemberResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Membership retrieved successfully")
                        .data(member)
                        .build());
    }
}