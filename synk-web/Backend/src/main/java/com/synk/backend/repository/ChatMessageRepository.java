package com.synk.backend.repository;

import com.synk.backend.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    Page<ChatMessage> findByCommunity_PublicIdOrderBySentAtDesc(String communityPublicId, Pageable pageable);

    Optional<ChatMessage> findByPublicId(String publicId);
}