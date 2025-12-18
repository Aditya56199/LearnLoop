package com.learningloop.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private int score;
    private LocalDate attemptDate;

    @Column(length = 1000)
    private String questionIds;   // all questions in quiz

    @Column(length = 1000)
    private String wrongQuestionIds; // ✅ NEW

    public QuizAttempt() {}

    public QuizAttempt(String userEmail, LocalDate attemptDate, String questionIds) {
        this.userEmail = userEmail;
        this.attemptDate = attemptDate;
        this.questionIds = questionIds;
    }

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public int getScore() { return score; }
    public LocalDate getAttemptDate() { return attemptDate; }
    public String getQuestionIds() { return questionIds; }
    public String getWrongQuestionIds() { return wrongQuestionIds; }

    public void setScore(int score) {
        this.score = score;
    }

    public void setWrongQuestionIds(String wrongQuestionIds) {
        this.wrongQuestionIds = wrongQuestionIds;
    }
}


