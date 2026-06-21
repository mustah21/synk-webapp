package com.synk.backend.util;

import com.synk.backend.entity.User;
import com.synk.backend.exceptions.UnauthorizedAccessException;
import com.synk.backend.exceptions.UnauthorizedException;
import com.synk.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if  (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedAccessException("User is not authenticated");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

    }

    // return just the user id of the currently authenticated user
    public Long getAuthenticatedUserId() {
        return getAuthenticatedUser().getId();
    }

}
