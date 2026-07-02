package com.synk.backend.service.Impl;

import com.synk.backend.dto.communityMemberDto.AddMemberRequestDto;
import com.synk.backend.dto.communityMemberDto.CommunityMemberResponseDto;
import com.synk.backend.dto.communityMemberDto.UpdateMemberRoleRequestDto;
import com.synk.backend.entity.Community;
import com.synk.backend.entity.CommunityMember;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.AlreadyExistsException;
import com.synk.backend.exceptions.ResourceNotFoundException;
import com.synk.backend.exceptions.UnauthorizedException;
import com.synk.backend.mapper.CommunityMemberMapper;
import com.synk.backend.repository.CommunityMemberRepository;
import com.synk.backend.repository.CommunityRepository;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.service.CommunityMemberService;
import com.synk.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityMemberServiceServiceImpl implements CommunityMemberService {

    private final CommunityMemberRepository communityMemberRepository;
    private final SecurityUtils securityUtils;
    private final CommunityMemberMapper communityMemberMapper;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found "));
    }
    private Community findCommunity(String publicCommunityId) {
        return communityRepository.findByPublicId(publicCommunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Community does not exist"));
    }

    @Transactional
    @Override
    public CommunityMemberResponseDto joinMember(AddMemberRequestDto addMemberRequestDto) {
        Long userId = securityUtils.getAuthenticatedUserId();
        User user = findUser(userId);
        Community community = findCommunity(addMemberRequestDto.communityPublicId());

        if (communityMemberRepository.existsByUserAndCommunity(user, community)) {
            throw new AlreadyExistsException("User already a member of this community");
        }

        CommunityMember communityMember = new CommunityMember();
        communityMember.setCommunity(community);
        communityMember.setUser(user);
        communityMember.setRole(CommunityMember.Role.MEMBER);

        return communityMemberMapper.toMemberResponseDto(communityMemberRepository.save(communityMember));
    }

    @Transactional
    @Override
    public CommunityMemberResponseDto updateMemberRole(
            UpdateMemberRoleRequestDto updateMemberRoleRequestDto, String communityPublicId)
    {
        Long userId = securityUtils.getAuthenticatedUserId();
        User requester = findUser(userId);
        Community community = findCommunity(communityPublicId);

        // verify requester is OWNER or ADMIN
        CommunityMember requesterMembership = communityMemberRepository
                .findByUserAndCommunity(requester, community)
                .orElseThrow(() -> new UnauthorizedException("Not a member"));

        if (requesterMembership.getRole() == CommunityMember.Role.MEMBER) {
            throw new UnauthorizedException("No permission to update roles");
        }

        // find target member
        User targetUser = userRepository.findByPublicId(updateMemberRoleRequestDto.userPublicId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CommunityMember targetMember = communityMemberRepository
                .findByUserAndCommunity(targetUser, community)
                .orElseThrow(() -> new ResourceNotFoundException("Membership not found"));

        targetMember.setRole(updateMemberRoleRequestDto.role());
        return communityMemberMapper.toMemberResponseDto(communityMemberRepository.save(targetMember));

    }

    @Transactional
    @Override
    public void leaveMember(String communityPublicId) {
        Long userId = securityUtils.getAuthenticatedUserId();
        User user = findUser(userId);
        Community community = findCommunity(communityPublicId);

        CommunityMember member = communityMemberRepository.findByUserAndCommunity(user, community)
                .orElseThrow(() -> new ResourceNotFoundException("Membership not found."));

        if (member.getRole() == CommunityMember.Role.OWNER) {
            long adminCount = communityMemberRepository.findByCommunity(community)
                    .stream()
                    .filter(m -> m.getRole() == CommunityMember.Role.ADMIN)
                    .count();
            if (adminCount < 1) {
                throw new IllegalStateException("Owner must appoint an administrator to leave community.");
            }
        }

        communityMemberRepository.delete(member);
    }

    @Override
    public CommunityMemberResponseDto getMember(String communityPublicId) {
        Long userId = securityUtils.getAuthenticatedUserId();
        User user = findUser(userId);
        Community community = findCommunity(communityPublicId);

        CommunityMember member = communityMemberRepository.findByUserAndCommunity(user, community)
                .orElseThrow(() -> new ResourceNotFoundException("Membership not found"));

        return communityMemberMapper.toMemberResponseDto(member);

    }
}
