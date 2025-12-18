package com.learningloop.backend.config;

import com.learningloop.backend.entity.QuizQuestion;
import com.learningloop.backend.repository.QuizQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class QuizDataLoader {

    @Bean
    CommandLineRunner loadQuizData(QuizQuestionRepository repo) {
        return args -> {

            repo.deleteAll();

            repo.saveAll(List.of(

                    // ===== HTTP & WEB =====
                    new QuizQuestion(
                            "What does HTTP stand for?",
                            List.of(
                                    "HyperText Transfer Protocol",
                                    "High Transfer Text Process",
                                    "Hyper Tool Transfer Process",
                                    "Home Transfer Text Protocol"
                            ),
                            0
                    ),

                    new QuizQuestion(
                            "Which HTTP method is idempotent?",
                            List.of("POST", "PATCH", "PUT", "CONNECT"),
                            2
                    ),

                    new QuizQuestion(
                            "Which status code means Forbidden?",
                            List.of("401", "403", "404", "500"),
                            1
                    ),

                    new QuizQuestion(
                            "REST APIs usually use which protocol?",
                            List.of("FTP", "SMTP", "HTTP", "TCP"),
                            2
                    ),

                    // ===== JAVASCRIPT =====
                    new QuizQuestion(
                            "Which keyword prevents reassignment?",
                            List.of("var", "let", "const", "static"),
                            2
                    ),

                    new QuizQuestion(
                            "JSON.parse() converts?",
                            List.of(
                                    "Object to JSON",
                                    "JSON to Object",
                                    "Encrypts JSON",
                                    "Validates JSON"
                            ),
                            1
                    ),

                    new QuizQuestion(
                            "Which operator checks value & type?",
                            List.of("==", "!=", "===", "="),
                            2
                    ),

                    // ===== REACT =====
                    new QuizQuestion(
                            "Which hook runs after render?",
                            List.of("useState", "useEffect", "useRef", "useMemo"),
                            1
                    ),

                    new QuizQuestion(
                            "Props in React are?",
                            List.of("Mutable", "Read-only", "Global", "Private"),
                            1
                    ),

                    new QuizQuestion(
                            "Which hook avoids re-calculation?",
                            List.of("useState", "useMemo", "useEffect", "useContext"),
                            1
                    ),

                    // ===== JAVA =====
                    new QuizQuestion(
                            "Which keyword enables inheritance?",
                            List.of("this", "super", "extends", "implements"),
                            2
                    ),

                    new QuizQuestion(
                            "Which collection allows duplicates?",
                            List.of("Set", "Map", "List", "TreeSet"),
                            2
                    ),

                    new QuizQuestion(
                            "Objects are stored in?",
                            List.of("Stack", "Heap", "Method Area", "Register"),
                            1
                    ),

                    // ===== SPRING BOOT =====
                    new QuizQuestion(
                            "Which annotation creates REST APIs?",
                            List.of("@Controller", "@Service", "@RestController", "@Component"),
                            2
                    ),

                    new QuizQuestion(
                            "Default Spring Boot port?",
                            List.of("3000", "4200", "8080", "9000"),
                            2
                    ),

                    new QuizQuestion(
                            "Spring config file?",
                            List.of("pom.xml", "application.properties", "config.json", "settings.xml"),
                            1
                    )
            ));
        };
    }
}

