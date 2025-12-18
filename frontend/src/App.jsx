import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FocusTimer from "./pages/FocusTimer";
import DailyQuiz from "./pages/Dailyquiz";
import Progress from "./pages/Progress";
import RemedialTasks from "./pages/RemedialTasks";
import MentorReview from "./pages/MentorReview";
import QuizResult from "./pages/QuizResult";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/focus-timer" element={<FocusTimer />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/remedial-tasks" element={<RemedialTasks />} />
          <Route path="/mentor-review" element={<MentorReview />} />
          <Route path="/quiz-result/:attemptId" element={<QuizResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
