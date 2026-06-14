package com.synk.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.List;
import java.time.LocalDateTime;


@Entity
@Table(name ="games")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Game {

    @OneToMany(mappedBy="game", cascade = CascadeType.ALL)
    private List<Registration> registrations;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @Column(name = "game_name")
    private String title;

    @Column(name = "creator_id")
    private String creatorId;

    @Column(name = "hosting_date")
    private LocalDateTime hostingDate;

    @Column(name = "sport_name")
    private String sportName;

    @Column(name = "language")
    private String language;

    @Column(name = "game_description")
    private String gameDescription;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
