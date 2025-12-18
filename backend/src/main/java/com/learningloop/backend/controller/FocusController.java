package com.learningloop.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/focus")
@CrossOrigin(origins = "*")
public class FocusController {

    @PostMapping("/save")
    public Map<String, String> saveFocusSession(@RequestBody Map<String, Object> payload) {

        // For now just acknowledge (DB comes later)
        return Map.of("message", "Focus session saved");
    }
}
