package com.synk.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.List;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name ="users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    private List<Registration> registrations;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "user_id", nullable = false)
    private long id;

    @Column(name = "public_id", unique = true, nullable = false, updatable = false)
    private String publicId;

    @PrePersist
    public void generatePublicId() {
        if (this.publicId == null) {
            this.publicId = UUID.randomUUID().toString();
        }
    }

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash")
    private String password;

    @Column(name = "google_id", unique = true)
    private String googleId;

    public enum AuthProvider{
        LOCAL,
        GOOGLE,
        APPLE
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    private AuthProvider authProvider;

    @Column(name = "google_access_token", length = 2048)
    private String googleAccessToken;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



}

