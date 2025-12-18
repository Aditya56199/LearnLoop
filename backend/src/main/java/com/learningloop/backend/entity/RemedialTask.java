package com.learningloop.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "remedial_tasks")
public class RemedialTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String topic;

    private boolean completed = false;

    public RemedialTask() {}

    public RemedialTask(String userEmail, String topic, boolean completed) {
        this.userEmail = userEmail;
        this.topic = topic;
        this.completed = completed;
    }

    // ===== GETTERS =====
    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getTopic() {
        return topic;
    }

    public boolean isCompleted() {
        return completed;
    }

    // ===== SETTERS =====
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}


