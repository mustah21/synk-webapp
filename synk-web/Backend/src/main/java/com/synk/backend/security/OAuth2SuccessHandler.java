package com.synk.backend.security;

import com.synk.backend.entity.User;
import com.synk.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;


@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final String FrontendUrl = "http://localhost:4000";


    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = (String) oAuth2User.getAttribute("email");
        String givenName = oAuth2User.getAttribute("given_name");
        String familyName = oAuth2User.getAttribute("family_name");
        String googleId = oAuth2User.getAttribute("sub"); // Google's unique ID for the user


        User user = userRepository.findByGoogleId(googleId).orElseGet(() ->
                userRepository.findByEmail(email).map(existingUser -> {
                    existingUser.setFirstName(givenName);
                    existingUser.setLastName(familyName);
                    existingUser.setEmail(email);
                    existingUser.setGoogleId(googleId);
                    existingUser.setAuthProvider(User.AuthProvider.GOOGLE);
                    return userRepository.save(existingUser);
                }).orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .firstName(givenName)
                            .lastName(familyName)
                            .googleId(googleId)
                            .authProvider(User.AuthProvider.GOOGLE)
                            .password(null)
                            .build();
                    User savedUser = userRepository.save(newUser);
                    return savedUser;
                }));

        try {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                    oauthToken.getAuthorizedClientRegistrationId(),
                    oauthToken.getName()
            );
            if (client != null && client.getAccessToken() != null) {
                user.setGoogleAccessToken(client.getAccessToken().getTokenValue());
                userRepository.save(user);
                log.info("Google access token saved for user: {}", email);
            }
        } catch (Exception e) {
            log.warn("Could not save Google access token: {}", e.getMessage());
        }


        // Generate JWT token for the authenticated user
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.createToken(Map.of("userId", user.getId()), userDetails.getUsername());


//         Redirect to frontend with the token as a query parameter
//        String redirectUrl = FrontendUrl + "/oauth2/redirect?token=" + token;
//        getRedirectStrategy().sendRedirect(request, response, redirectUrl);

    }
}
