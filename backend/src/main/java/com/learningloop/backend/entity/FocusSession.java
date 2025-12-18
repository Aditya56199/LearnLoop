package com.learningloop.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "focus_sessions")
public class FocusSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private int durationMinutes;

    private LocalDateTime startedAt;

    public FocusSession() {}

    public FocusSession(String userEmail, int durationMinutes, LocalDateTime startedAt) {
        this.userEmail = userEmail;
        this.durationMinutes = durationMinutes;
        this.startedAt = startedAt;
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }
}
