package com.synk.backend.service.Impl;

import com.synk.backend.dto.chatMessage.ChatMessageRequest;
import com.synk.backend.dto.chatMessage.ChatMessageResponse;
import com.synk.backend.entity.ChatMessage;
import com.synk.backend.entity.Community;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.ResourceNotFoundException;
import com.synk.backend.exceptions.UnauthorizedAccessException;
import com.synk.backend.mapper.ChatMessageMapper;
import com.synk.backend.repository.ChatMessageRepository;
import com.synk.backend.repository.CommunityMemberRepository;
import com.synk.backend.repository.CommunityRepository;
import com.synk.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository communityMemberRepository;
    private final ChatMessageMapper chatMessageMapper;

    @Transactional
    public ChatMessageResponse saveAndReturn(String communityPublicId, User sender, ChatMessageRequest request) {
        Community community = communityRepository.findByPublicId(communityPublicId)
                .orElseThrow(() -> new ResourceNotFoundException("Community not found"));

        boolean isMember = communityMemberRepository
                .existsByUserAndCommunity(sender, community);

        if (!isMember) {
            throw new UnauthorizedAccessException("You must be a member of this community to chat");
        }

        ChatMessage message = new ChatMessage();
        message.setCommunity(community);
        message.setSender(sender);
        message.setContent(request.content());

        ChatMessage saved = chatMessageRepository.save(message);
        return chatMessageMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public Page<ChatMessageResponse> getHistory(String communityPublicId, User requester, Pageable pageable) {
        Community community = communityRepository.findByPublicId(communityPublicId)
                .orElseThrow(() -> new ResourceNotFoundException("Community not found"));

        boolean isMember = communityMemberRepository.existsByUserAndCommunity(requester, community);
        if (!isMember) {
            throw new UnauthorizedAccessException("You must be a member of this community to view chat");
        }

        Page<ChatMessage> messages = chatMessageRepository
                .findByCommunity_PublicIdOrderBySentAtDesc(communityPublicId, pageable);
        return messages.map(chatMessageMapper::toDto);
    }}