# LearnLoop 🎯

LearnLoop is a full-stack learning platform designed to improve focus,
track learning progress, and provide personalized remedial tasks
based on quiz performance.

## Features
- User Authentication (Login & Signup)
- Focus Timer (Pomodoro-based)
- Daily Quiz System
- Quiz Result Analysis
- Remedial Tasks with Checkpoint Quizzes
- Progress Tracking Dashboard

## Tech Stack
### Frontend
- React
- JavaScript
- CSS

### Backend
- Spring Boot
- JPA / Hibernate
- H2 Database

## Core Logic
- Remedial tasks are generated only if quiz score is below 70%
- Old remedial tasks are cleared after good performance
- Checkpoint quizzes ensure concept mastery

## How to Run Locally
### Backend
```bash
cd backend
mvn spring-boot:run

