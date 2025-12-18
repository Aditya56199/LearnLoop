package com.learningloop.backend.controller;

import com.learningloop.backend.entity.*;
import com.learningloop.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private RemedialTaskRepository remedialTaskRepository;

    // ===================== START QUIZ =====================
    @PostMapping("/start")
    public Map<String, Object> startQuiz(@RequestParam String userEmail) {

        List<QuizQuestion> allQuestions = quizQuestionRepository.findAll();
        Collections.shuffle(allQuestions);

        List<QuizQuestion> selected =
                allQuestions.size() > 10 ? allQuestions.subList(0, 10) : allQuestions;

        String questionIds = selected.stream()
                .map(q -> q.getId().toString())
                .collect(Collectors.joining(","));

        QuizAttempt attempt =
                new QuizAttempt(userEmail, LocalDate.now(), questionIds);

        quizAttemptRepository.save(attempt);

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getId());
        response.put("questions", selected);

        return response;
    }

    // ===================== SUBMIT QUIZ (FINAL, CORRECT) =====================
    @PostMapping(value = "/submit/{attemptId}", consumes = "application/json")
    public void submitQuiz(
            @PathVariable Long attemptId,
            @RequestBody Map<String, Object> payload
    ) {
        int score = (int) payload.get("score");

        @SuppressWarnings("unchecked")
        List<Integer> wrongQuestionIds =
                (List<Integer>) payload.get("wrongQuestionIds");

        QuizAttempt attempt =
                quizAttemptRepository.findById(attemptId)
                        .orElseThrow(() -> new RuntimeException("Attempt not found"));

        attempt.setScore(score);

        int totalQuestions = attempt.getQuestionIds().split(",").length;
        double percentage = ((double) score / totalQuestions) * 100;

        // Save wrong questions for result page
        if (wrongQuestionIds != null && !wrongQuestionIds.isEmpty()) {
            attempt.setWrongQuestionIds(
                    wrongQuestionIds.stream()
                            .map(String::valueOf)
                            .collect(Collectors.joining(","))
            );
        }

        // ✅ CASE 1: USER PERFORMED WELL → CLEAR OLD REMEDIAL TASKS
        if (percentage >= 70) {
            List<RemedialTask> oldTasks =
                    remedialTaskRepository.findByUserEmail(attempt.getUserEmail());

            remedialTaskRepository.deleteAll(oldTasks);

            quizAttemptRepository.save(attempt);
            return;
        }

        // ❌ CASE 2: USER PERFORMED POOR → CREATE REMEDIAL TASK
        if (wrongQuestionIds != null && !wrongQuestionIds.isEmpty()) {

            Set<String> weakTopics = new HashSet<>();

            for (Integer qId : wrongQuestionIds) {
                quizQuestionRepository.findById(qId.longValue())
                        .ifPresent(q ->
                                weakTopics.add(
                                        q.getTopic() == null
                                                ? "Core Fundamentals"
                                                : q.getTopic()
                                )
                        );
            }

            for (String topic : weakTopics) {
                remedialTaskRepository.save(
                        new RemedialTask(attempt.getUserEmail(), topic, false)
                );
            }
        }

        quizAttemptRepository.save(attempt);
    }

    // ===================== REMEDIAL TASKS =====================
    @GetMapping("/remedial/{email}")
    public List<RemedialTask> getRemedialTasks(@PathVariable String email) {
        return remedialTaskRepository.findByUserEmail(email);
    }

    // ===================== CHECKPOINT =====================
    @PostMapping("/remedial/checkpoint/{taskId}")
    public List<QuizQuestion> startCheckpoint(@PathVariable Long taskId) {

        RemedialTask task =
                remedialTaskRepository.findById(taskId)
                        .orElseThrow(() -> new RuntimeException("Task not found"));

        List<QuizQuestion> result = new ArrayList<>();

        result.addAll(quizQuestionRepository.findByTopic(task.getTopic()));

        if (result.size() < 2) {
            List<QuizQuestion> all = quizQuestionRepository.findAll();
            Collections.shuffle(all);
            result.addAll(all);
        }

        result = result.stream().distinct().collect(Collectors.toList());
        Collections.shuffle(result);

        return result.size() > 2 ? result.subList(0, 2) : result;
    }

    // ===================== COMPLETE REMEDIAL =====================
    @PostMapping("/remedial/complete/{taskId}")
    public void completeRemedial(@PathVariable Long taskId) {
        remedialTaskRepository.deleteById(taskId);
    }
}

