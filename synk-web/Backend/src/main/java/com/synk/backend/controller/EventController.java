package com.synk.backend.controller;


import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.eventDto.CreateEventRequestDto;
import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.dto.eventDto.EventUpdateRequestDto;
import com.synk.backend.service.Impl.EventServiceImpl;
import com.synk.backend.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/event")
@RequiredArgsConstructor
public class EventController {

    private final EventServiceImpl eventService;
    private final SecurityUtils securityUtils;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<EventResponseDto>> createEvent(@Valid @RequestBody CreateEventRequestDto createEvent) {
        Long userId = securityUtils.getAuthenticatedUserId();
        EventResponseDto created = eventService.createEvent(createEvent, userId);

        ApiResponse<EventResponseDto> response = ApiResponse.<EventResponseDto>builder()
                .status(HttpStatus.CREATED.value())
                .message("Event created successfully")
                .data(created)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // should this be "/events" or "/" since it is "/api/v1/event/"
    @GetMapping("/events")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getAllEvents() {
        List<EventResponseDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(
                ApiResponse
                        .<List<EventResponseDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Events retrieved successfully")
                        .data(events)
                        .build());
    }
    @ExceptionHandler(Exception.class)
    @GetMapping("/{eventId}")
    public ResponseEntity<ApiResponse<EventResponseDto>> getEvent(@PathVariable String eventId) {
        EventResponseDto event = eventService.getEvent(eventId);
        return ResponseEntity.ok(
                ApiResponse.<EventResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Event retrieved successfully")
                        .data(event)
                        .build());
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getEventsByUser() {
        Long userId = securityUtils.getAuthenticatedUserId();
        List<EventResponseDto> events = eventService.getEventsByUserId(userId);
        return ResponseEntity.ok(
                ApiResponse.<List<EventResponseDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Events retrieved successfully")
                        .data(events)
                        .build());
    }

    @GetMapping("/date")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getEventsByDate(@RequestParam LocalDateTime hostDate) {
        List<EventResponseDto> events = eventService.getEventByHostingDate(hostDate);
        return ResponseEntity.ok(
                ApiResponse.<List<EventResponseDto>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Events retrieved successfully")
                        .data(events)
                        .build());
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<ApiResponse<EventResponseDto>> updateEvent(
            @PathVariable String eventId,
            @Valid @RequestBody EventUpdateRequestDto updateDto) {
        EventResponseDto updated = eventService.updateEvent(eventId, updateDto);
        return ResponseEntity.ok(
                ApiResponse.<EventResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Event updated successfully")
                        .data(updated)
                        .build());
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<ApiResponse<String>> deleteEvent(@PathVariable String eventId) {
        String result = eventService.deleteEvent(eventId);
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(HttpStatus.OK.value())
                        .message(result)
                        .build());
    }

}
