package com.synk.backend.controller;


import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.eventDto.CreateEventRequestDto;
import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.dto.eventDto.EventSummaryDto;
import com.synk.backend.service.EventServiceImpl;
import com.synk.backend.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/event")
@RequiredArgsConstructor
public class EventController {

    private final EventServiceImpl eventService;
    private final SecurityUtils securityUtils;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<EventResponseDto>> createEvent(@Valid @RequestBody CreateEventRequestDto createEvent){
        Long userId = securityUtils.getAuthenticatedUserId();
        EventResponseDto created = eventService.createEvent(createEvent, userId);

        ApiResponse<EventResponseDto> response = ApiResponse.<EventResponseDto>builder()
                .status(HttpStatus.CREATED.value())
                .message("Event created successfully")
                .data(created)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


}
