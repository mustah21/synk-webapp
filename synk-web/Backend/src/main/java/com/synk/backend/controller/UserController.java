package com.synk.backend.controller;

import com.synk.backend.dto.ApiResponse;
import com.synk.backend.dto.userDto.*;
import com.synk.backend.security.JwtUtil;
import com.synk.backend.service.UserServiceImpl;
import com.synk.backend.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserServiceImpl userServiceImpl;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final SecurityUtils securityUtils;

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserLoginRequestDto body) {
        return ResponseEntity.ok(userServiceImpl.login(body));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRegisterRequestDto body) {
        return ResponseEntity.ok(userServiceImpl.createUser(body));
    }

    // Build user update
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<UserResponseDto>> updateProfile(
            @RequestBody UserProfileUpdateDto userDto) {

        UserResponseDto updatedUser = userServiceImpl.updateProfile(userDto);

        return ResponseEntity.ok(
                ApiResponse.<UserResponseDto>builder()
                        .status(HttpStatus.OK.value())
                        .message("Profile updated successfully")
                        .data(updatedUser)
                        .build());
    }
}
