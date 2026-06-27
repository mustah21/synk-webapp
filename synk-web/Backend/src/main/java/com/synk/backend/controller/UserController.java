package com.synk.backend.controller;

import com.synk.backend.dto.userDto.UserLoginRequestDto;
import com.synk.backend.dto.userDto.UserLoginResponseDto;
import com.synk.backend.dto.userDto.UserRegisterRequestDto;
import com.synk.backend.dto.userDto.UserResponseDto;
import com.synk.backend.security.JwtUtil;
import com.synk.backend.service.UserServiceImpl;
import com.synk.backend.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
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

}
