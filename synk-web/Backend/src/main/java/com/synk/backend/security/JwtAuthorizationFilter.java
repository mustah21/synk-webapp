package com.synk.backend.security;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;

@RequiredArgsConstructor
public class JwtAuthorizationFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;


}
