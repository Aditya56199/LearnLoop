package com.learningloop.backend.repository;

import com.learningloop.backend.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    // ✅ REQUIRED for remedial checkpoint questions
    List<QuizQuestion> findByTopic(String topic);
}

