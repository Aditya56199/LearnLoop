package com.learningloop.backend.repository;

import com.learningloop.backend.entity.RemedialTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RemedialTaskRepository extends JpaRepository<RemedialTask, Long> {
    List<RemedialTask> findByUserEmail(String userEmail);
}
