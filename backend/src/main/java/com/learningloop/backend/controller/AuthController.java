package com.learningloop.backend.controller;

import com.learningloop.backend.entity.User;
import com.learningloop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {

        String email = user.getEmail().trim().toLowerCase();
        String password = user.getPassword().trim();

        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return Map.of("message", "Email already exists");
        }

        user.setEmail(email);
        user.setPassword(password);

        userRepository.save(user);

        return Map.of("message", "Signup successful");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User loginRequest) {

        String email = loginRequest.getEmail().trim().toLowerCase();
        String password = loginRequest.getPassword().trim();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return Map.of("message", "Invalid email or password");
        }

        if (!user.getPassword().equals(password)) {
            return Map.of("message", "Invalid email or password");
        }

        // TEMP TOKEN (frontend flow only)
        String token = UUID.randomUUID().toString();

        return Map.of(
                "message", "Login successful",
                "token", token
        );
    }
}












