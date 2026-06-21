package com.synk.backend.controller;


import com.synk.backend.dto.userDto.UserLoginRequestDto;
import com.synk.backend.dto.userDto.UserLoginResponseDto;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.security.JwtUtil;
import com.synk.backend.service.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth/v1/users")
@RequiredArgsConstructor
public class AuthController {

    private final UserServiceImpl userServiceImpl;

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserLoginRequestDto body) {
        return ResponseEntity.ok(userServiceImpl.login(body));
    }

}
