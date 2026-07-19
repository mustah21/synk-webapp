package com.synk.backend.controller;

import com.synk.backend.dto.chatMessage.ChatMessageRequest;
import com.synk.backend.dto.chatMessage.ChatMessageResponse;
import com.synk.backend.entity.User;
import com.synk.backend.service.Impl.ChatMessageServiceImpl;
import com.synk.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatMessageServiceImpl chatMessageService;
    private final SecurityUtils securityUtils;

    @MessageMapping("/community/{communityPublicId}/chat")
    @SendTo("/topic/community/{communityPublicId}")
    public ChatMessageResponse send(@DestinationVariable String communityPublicId,
                                    ChatMessageRequest request,
                                    Authentication authentication) {
        System.out.println(">>> send() invoked, communityPublicId=" + communityPublicId);

        User sender = securityUtils.getAuthenticatedUser(authentication);
        return chatMessageService.saveAndReturn(communityPublicId, sender, request);
    }
}