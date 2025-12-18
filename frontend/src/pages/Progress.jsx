import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Progress() {
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const attemptId = location.state?.attemptId;

  useEffect(() => {
    fetch(
      `http://localhost:8080/dashboard/progress/${localStorage.getItem("email")}`
    )
      .then(res => res.json())
      .then(data => setProgress(data));
  }, []);

  if (!progress) {
    return <div className="p-10">Loading progress...</div>;
  }

  return (
    <div className="p-10">
      <button
        onClick={() => {
          if (attemptId) {
            navigate(`/quiz-result/${attemptId}`);
          } else {
            navigate("/dashboard");
          }
        }}
        className="mb-6 text-blue-600 font-semibold"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">⏱ Focus Time</h3>
          <p className="text-2xl mt-2">
            {progress.totalFocusMinutes} mins
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">📘 Quizzes Attempted</h3>
          <p className="text-2xl mt-2">
            {progress.totalQuizzes}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">⭐ Average Score</h3>
          <p className="text-2xl mt-2">
            {progress.averageScore.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
