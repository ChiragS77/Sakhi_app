package com.sakhiapp.services;

import com.sakhiapp.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;

    private static final long JWT_EXPIRATION = 24 * 60 * 60 * 1000L;


    // =========================
    // EXTRACT USERNAME
    // =========================

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    // =========================
    // EXTRACT ROLE
    // =========================

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }


    // =========================
    // EXTRACT CLAIM
    // =========================

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }


    // =========================
    // GENERATE TOKEN
    // =========================

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        if (userDetails instanceof User user) {
            claims.put("role", user.getRole().name());
        }

        return generateToken(claims, userDetails);
    }


    // =========================
    // GENERATE TOKEN WITH CLAIMS
    // =========================

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + JWT_EXPIRATION
                        )
                )
                .signWith(
                        getSignInKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }


    // =========================
    // VALIDATE TOKEN
    // =========================

    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        try {

            String username = extractUsername(token);

            return username.equals(userDetails.getUsername())
                    && !isTokenExpired(token);

        } catch (Exception e) {

            return false;
        }
    }


    // =========================
    // CHECK EXPIRATION
    // =========================

    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }


    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }


    // =========================
    // EXTRACT ALL CLAIMS
    // =========================

    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    // =========================
    // SECRET KEY
    // =========================

    private Key getSignInKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(secret);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}
