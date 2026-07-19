package com.synk.backend.dto.chatMessage;


import java.time.Instant;

public record ChatMessageResponse(
        String publicId,
        String senderPublicId,
        String senderFirstName,
        String senderLastName,
        String content,
        Instant sentAt,
        String status
) {}
