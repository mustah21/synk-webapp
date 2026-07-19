package com.synk.backend.service;

import com.synk.backend.dto.chatMessage.ChatMessageRequest;
import com.synk.backend.dto.chatMessage.ChatMessageResponse;
import com.synk.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChatMessageService {

    ChatMessageResponse saveAndReturn(
            String communityPublicId,
            User sender,
            ChatMessageRequest request
    );

    Page<ChatMessageResponse> getHistory(
            String communityPublicId,
            User requester,
            Pageable pageable
    );
}
