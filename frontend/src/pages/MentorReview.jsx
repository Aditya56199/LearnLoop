import { useEffect, useState } from "react";

export default function MentorReview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:8080/dashboard/mentor-review/${localStorage.getItem("email")}`
    )
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <div className="p-10">Loading mentor review...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Mentor Review</h2>

      {/* FOCUS SESSIONS */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">⏱ Focus Sessions</h3>
        {data.focusSessions.length === 0 ? (
          <p className="text-gray-500">No focus sessions yet.</p>
        ) : (
          <ul className="list-disc pl-6">
            {data.focusSessions.map((s, i) => (
              <li key={i}>
                {s.durationMinutes} minutes
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* QUIZ PERFORMANCE */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">📘 Quiz Performance</h3>
        {data.quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes attempted yet.</p>
        ) : (
          <ul className="list-disc pl-6">
            {data.quizzes.map((q, i) => (
              <li key={i}>
                Score: {q.score}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* REMEDIAL TASKS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">🧠 Remedial Tasks</h3>
        {data.remedialTasks.length === 0 ? (
          <p className="text-green-600">
            No remedial tasks assigned 👍
          </p>
        ) : (
          <ul className="list-disc pl-6">
            {data.remedialTasks.map((t, i) => (
              <li key={i}>
                {t.task} —{" "}
                <span className="text-sm text-gray-600">
                  {t.completed ? "Completed" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
