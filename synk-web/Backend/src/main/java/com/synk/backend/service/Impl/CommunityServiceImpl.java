package com.synk.backend.service.Impl;

import com.synk.backend.dto.communityDto.CommunityResponseDto;
import com.synk.backend.dto.communityDto.CommunitySummaryDto;
import com.synk.backend.dto.communityDto.CommunityUpdateRequestDto;
import com.synk.backend.dto.communityDto.CreateCommunityRequestDto;
import com.synk.backend.entity.Community;
import com.synk.backend.entity.CommunityMember;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.AlreadyExistsException;
import com.synk.backend.exceptions.ResourceNotFoundException;
import com.synk.backend.exceptions.UnauthorizedException;
import com.synk.backend.mapper.CommunityMapper;
import com.synk.backend.repository.CommunityMemberRepository;
import com.synk.backend.repository.CommunityRepository;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.service.CommunityService;
import com.synk.backend.util.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final CommunityMemberRepository communityMemberRepository;
    private final CommunityMapper communityMapper;
    private final SecurityUtils securityUtils;

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found "));
    }

    private Community findCommunity(String publicCommunityId) {
        return communityRepository.findByPublicId(publicCommunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Community does not exist"));
    }

    private void verifyCommunityOwnership(Community community, User user) {
        Long authenticatedUserId = securityUtils.getAuthenticatedUserId();
        if (!Objects.equals(community.getCreator().getId(), authenticatedUserId)) {
            throw new UnauthorizedException("Access denied. " + user.getFirstName() + " is not the owner of this community.");
        }
    }

    @Transactional
    @Override
    public CommunityResponseDto createCommunity(CreateCommunityRequestDto dto) {
        User user = findUser(securityUtils.getAuthenticatedUserId());

        if (communityRepository.existsByNameAndCreator(dto.name(), user)) {
            throw new AlreadyExistsException("You already have a community with this name. Please try with another name.");
        }

        Community community = new Community();
        community.setName(dto.name());
        community.setCreator(user);
        community.setDescription(dto.description());

        return communityMapper.toResponseDto(communityRepository.save(community));
    }

    @Transactional
    @Override
    public CommunityResponseDto updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto, String publicCommunityId) {
        Community community = findCommunity(publicCommunityId);
        verifyCommunityOwnership(community, community.getCreator());

        communityMapper.updateCommunityFromDto(communityUpdateRequestDto, community);

        return communityMapper.toResponseDto(communityRepository.save(community));
    }

    @Transactional
    @Override
    public String deleteCommunity(String communityPublicId) {
        Community community = findCommunity(communityPublicId);
        verifyCommunityOwnership(community, community.getCreator());

        communityRepository.delete(community);
        return community.getName() + " has been deleted";
    }

    @Override
    public CommunityResponseDto getCommunity(String communityPublicId) {
        Community community = findCommunity(communityPublicId);
        return communityMapper.toResponseDto(community);
    }

    @Override
    public Page<CommunityResponseDto> getAllCommunities(Pageable pageable) {
        return communityRepository.findAll(pageable)
                .map(communityMapper::toResponseDto);
    }

    @Override
    public List<CommunitySummaryDto> getUsersCommunities() {
        User user = findUser(securityUtils.getAuthenticatedUserId());
        return communityMemberRepository.findByUser(user)
                .stream()
                .map(CommunityMember::getCommunity)
                .map(communityMapper::toSummaryDto)
                .toList();
    }

    @Override
    public List<CommunitySummaryDto> getCreatedCommunities() {
        User user = findUser(securityUtils.getAuthenticatedUserId());
        return communityRepository.findByCreator(user)
                .stream()
                .map(communityMapper::toSummaryDto)
                .toList();
    }
}
