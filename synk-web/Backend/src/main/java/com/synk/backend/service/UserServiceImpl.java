package com.synk.backend.service;

import com.synk.backend.dto.userDto.*;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.UnauthorizedAccessException;
import com.synk.backend.mapper.UserMapper;
import com.synk.backend.repository.EventRepository;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class UserServiceImpl {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    private final JwtUtil jwtUtil;

    public UserResponseDto createUser(UserRegisterRequestDto userDto) {
        if (userRepository.findByEmail(userDto.email()).isPresent()) {
            throw new UnauthorizedAccessException("Email already registered");
        }

        User user = userMapper.toEntityUserRegister(userDto);
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return userMapper.toResponseDto(saved);
    }

    public UserLoginResponseDto login(UserLoginRequestDto userDto) {
        User user = userRepository.findByEmail(userDto.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(userDto.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);


        return new UserLoginResponseDto(token, userMapper.toResponseDto(user));

    }
}