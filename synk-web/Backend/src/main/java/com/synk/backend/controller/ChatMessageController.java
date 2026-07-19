package com.synk.backend.controller;

import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.chatMessage.ChatMessageResponse;
import com.synk.backend.entity.User;
import com.synk.backend.service.Impl.ChatMessageServiceImpl;
import com.synk.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageServiceImpl chatMessageService;
    private final SecurityUtils securityUtils;

    @GetMapping("/{publicId}/chat")
    public ResponseEntity<ApiResponse<Page<ChatMessageResponse>>> getHistory(
            @PathVariable String publicId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size) {

        User requester = securityUtils.getAuthenticatedUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("sentAt").descending());
        Page<ChatMessageResponse> history = chatMessageService.getHistory(publicId, requester, pageable);

        ApiResponse<Page<ChatMessageResponse>> response = ApiResponse.<Page<ChatMessageResponse>>builder()
                .status(HttpStatus.OK.value())
                .message("Chat history retrieved")
                .data(history)
                .build();

        return ResponseEntity.ok(response);
    }
}