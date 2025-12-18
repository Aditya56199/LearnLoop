package com.learningloop.backend.repository;

import com.learningloop.backend.entity.FocusSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FocusSessionRepository extends JpaRepository<FocusSession, Long> {

    List<FocusSession> findByUserEmail(String userEmail);
}
