package com.synk.backend.controller;

import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.registrationDto.AttendeeDtoRequest;
import com.synk.backend.dto.registrationDto.MyRegistrationDtoRequest;
import com.synk.backend.entity.Registration;
import com.synk.backend.service.RegistrationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/registration")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationServiceImpl registrationService;


    @PostMapping("/join/{eventId}")
    public ResponseEntity<ApiResponse<Void>> joinEvent(@PathVariable String eventId) {
        registrationService.joinEvent(eventId);
        System.out.println("User registered for this event from the controller");
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<Void>builder()
                        .status(HttpStatus.CREATED.value())
                        .message("Successfully joined event")
                        .build());

    }

    @DeleteMapping("/leave/{eventId}")
    public ResponseEntity<ApiResponse<Void>> leaveEvent(@PathVariable String eventId) {
        registrationService.leaveEvent(eventId);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .status(HttpStatus.OK.value())
                        .message("Successfully left event")
                        .build());
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<MyRegistrationDtoRequest>>> getUserRegistrations() {
        List<MyRegistrationDtoRequest> registrations = registrationService.getUserRegistrations();
        return ResponseEntity.ok(
                ApiResponse.<List<MyRegistrationDtoRequest>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Registrations retrieved successfully")
                        .data(registrations)
                        .build());
    }

    @GetMapping("/event/{eventId}/attendees")
    public ResponseEntity<ApiResponse<List<AttendeeDtoRequest>>> getEventAttendees(@PathVariable String eventId) {
        List<AttendeeDtoRequest> attendees = registrationService.getEventRegistrations(eventId);
        return ResponseEntity.ok(
                ApiResponse.<List<AttendeeDtoRequest>>builder()
                        .status(HttpStatus.OK.value())
                        .message("Attendees retrieved successfully")
                        .data(attendees)
                        .build());
    }

    @PatchMapping("/{registrationId}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(
            @PathVariable Long registrationId,
            @RequestParam Registration.Status status) {
        registrationService.updateRegistrationStatus(registrationId, status);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .status(HttpStatus.OK.value())
                        .message("Registration status updated to " + status)
                        .build());
    }
}
