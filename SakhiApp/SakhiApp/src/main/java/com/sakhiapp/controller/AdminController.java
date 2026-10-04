package com.sakhiapp.controller;


import com.sakhiapp.dto.LoginRequest;
import com.sakhiapp.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;



    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {


        // =========================
        // AUTHENTICATE USER
        // =========================

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );


        // =========================
        // GET USER
        // =========================

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();


        // =========================
        // GENERATE JWT
        // =========================

        String token =
                jwtService.generateToken(userDetails);


        // =========================
        // CREATE HTTP-ONLY COOKIE
        // =========================

        ResponseCookie cookie =
                ResponseCookie.from("jwt", token)
                        .httpOnly(true)
                        .secure(false) // true in production HTTPS
                        .path("/")
                        .maxAge(Duration.ofHours(24))
                        .sameSite("Lax")
                        .build();


        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookie.toString()
        );


        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "username", userDetails.getUsername()
                )
        );
    }
}
