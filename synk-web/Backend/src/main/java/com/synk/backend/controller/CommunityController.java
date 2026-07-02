package com.synk.backend.controller;

import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.communityDto.CommunityResponseDto;
import com.synk.backend.dto.communityDto.CommunitySummaryDto;
import com.synk.backend.dto.communityDto.CommunityUpdateRequestDto;
import com.synk.backend.dto.communityDto.CreateCommunityRequestDto;
import com.synk.backend.service.CommunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CommunityResponseDto>> createCommunity(
            @Valid @RequestBody CreateCommunityRequestDto dto) {
        CommunityResponseDto created = communityService.createCommunity(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<CommunityResponseDto>builder()
                        .status(HttpStatus.CREATED.value())
                        .message("Community created successfully")
                        .data(created)
                        .build());
    }

    @PutMapping("/{communityPublicId}")
    public ResponseEntity<ApiResponse<CommunityResponseDto>> updateCommunity(
            @PathVariable String communityPublicId,
            @Valid @RequestBody CommunityUpdateRequestDto dto) {
        CommunityResponseDto updated = communityService.updateCommunity(dto, communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<CommunityResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Community updated successfully")
                        .data(updated)
                        .build());
    }

    @DeleteMapping("/{communityPublicId}")
    public ResponseEntity<ApiResponse<String>> deleteCommunity(
            @PathVariable String communityPublicId) {
        String result = communityService.deleteCommunity(communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(HttpStatus.OK.value())
                        .message(result)
                        .build());
    }

    @GetMapping("/{communityPublicId}")
    public ResponseEntity<ApiResponse<CommunityResponseDto>> getCommunity(
            @PathVariable String communityPublicId) {
        CommunityResponseDto community = communityService.getCommunity(communityPublicId);
        return ResponseEntity.ok(
                ApiResponse.<CommunityResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Community retrieved successfully")
                        .data(community)
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CommunityResponseDto>>> getAllCommunities(Pageable pageable) {
        Page<CommunityResponseDto> communities = communityService.getAllCommunities(pageable);
        return ResponseEntity.ok(
                ApiResponse.<Page<CommunityResponseDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Communities retrieved successfully")
                        .data(communities)
                        .build());
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<CommunitySummaryDto>>> getUsersCommunities() {
        List<CommunitySummaryDto> communities = communityService.getUsersCommunities();
        return ResponseEntity.ok(
                ApiResponse.<List<CommunitySummaryDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Communities the user is part of retrieved successfully.")
                        .data(communities)
                        .build());
    }

    @GetMapping("/mycreated")
    public ResponseEntity<ApiResponse<List<CommunitySummaryDto>>> getCreatedCommunities() {
        List<CommunitySummaryDto> communities = communityService.getCreatedCommunities();
        return ResponseEntity.ok(
                ApiResponse.<List<CommunitySummaryDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message(" My communities retrieved successfully")
                        .data(communities)
                        .build());
    }
}