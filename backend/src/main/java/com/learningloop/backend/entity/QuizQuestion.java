package com.learningloop.backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private int correctAnswerIndex;

    private String topic;

    @ElementCollection
    @CollectionTable(
            name = "quiz_question_options",
            joinColumns = @JoinColumn(name = "quiz_question_id")
    )
    @Column(name = "options")
    private List<String> options;

    public QuizQuestion() {}

    public QuizQuestion(String question, List<String> options, int correctAnswerIndex) {
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }

    // ===== GETTERS =====
    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public List<String> getOptions() { return options; }
    public int getCorrectAnswerIndex() { return correctAnswerIndex; }
    public String getTopic() { return topic; }

    // ===== SETTERS =====
    public void setTopic(String topic) { this.topic = topic; }
}

