package com.learningloop.backend.controller;

import com.learningloop.backend.entity.FocusSession;
import com.learningloop.backend.entity.QuizAttempt;
import com.learningloop.backend.entity.RemedialTask;
import com.learningloop.backend.repository.FocusSessionRepository;
import com.learningloop.backend.repository.QuizAttemptRepository;
import com.learningloop.backend.repository.RemedialTaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private FocusSessionRepository focusSessionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private RemedialTaskRepository remedialTaskRepository;

    // ===================== FOCUS TIMER =====================

    @PostMapping("/focus-session")
    public String saveFocusSession(@RequestBody Map<String, Object> payload) {

        String email = payload.get("email").toString();
        int duration = Integer.parseInt(payload.get("duration").toString());

        focusSessionRepository.save(
                new FocusSession(email, duration, LocalDateTime.now())
        );

        return "Focus session saved";
    }

    // ❌ REMOVED QUIZ SUBMIT LOGIC FROM DASHBOARD
    // Quiz submission + remedial logic now lives in QuizController

    // ===================== REMEDIAL TASKS =====================

    @GetMapping("/remedial/{email}")
    public List<RemedialTask> getRemedialTasks(@PathVariable String email) {
        return remedialTaskRepository.findByUserEmail(email);
    }

    // ===================== PROGRESS =====================

    @GetMapping("/progress/{email}")
    public Map<String, Object> getProgress(@PathVariable String email) {

        List<FocusSession> focusSessions =
                focusSessionRepository.findByUserEmail(email);

        List<QuizAttempt> quizAttempts =
                quizAttemptRepository.findByUserEmail(email);

        int totalFocusMinutes = focusSessions.stream()
                .mapToInt(FocusSession::getDurationMinutes)
                .sum();

        int totalQuizzes = quizAttempts.size();

        double averageScore = quizAttempts.isEmpty()
                ? 0
                : quizAttempts.stream()
                .mapToInt(QuizAttempt::getScore)
                .average()
                .orElse(0);

        Map<String, Object> response = new HashMap<>();
        response.put("totalFocusMinutes", totalFocusMinutes);
        response.put("totalQuizzes", totalQuizzes);
        response.put("averageScore", averageScore);

        return response;
    }

    // ===================== MENTOR REVIEW =====================

    @GetMapping("/mentor-review/{email}")
    public Map<String, Object> mentorReview(@PathVariable String email) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "focusSessions",
                focusSessionRepository.findByUserEmail(email)
        );

        response.put(
                "quizzes",
                quizAttemptRepository.findByUserEmail(email)
        );

        response.put(
                "remedialTasks",
                remedialTaskRepository.findByUserEmail(email)
        );

        return response;
    }
}






