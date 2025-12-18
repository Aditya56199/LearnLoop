import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RemedialTasks() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [task, setTask] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    // STEP 1: fetch remedial tasks
    fetch(`http://localhost:8080/quiz/remedial/${email}`)
      .then(res => res.json())
      .then(tasks => {
        // 🔐 ONLY consider pending (not completed) tasks
        const pendingTask = tasks.find(t => t.completed === false);

        // ✅ PERFORMED WELL → NO PENDING TASK
        if (!pendingTask) {
          setTask(null);
          setLoading(false);
          return;
        }

        // ❌ PERFORMED POOR → PENDING TASK EXISTS
        setTask(pendingTask);

        // STEP 2: load checkpoint questions
        return fetch(
          `http://localhost:8080/quiz/remedial/checkpoint/${pendingTask.id}`,
          { method: "POST" }
        );
      })
      .then(res => {
        if (!res) return;
        return res.json();
      })
      .then(qs => {
        setQuestions(qs || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [email]);

  const submitCheckpointQuiz = () => {
    fetch(`http://localhost:8080/quiz/remedial/complete/${task.id}`, {
      method: "POST",
    }).then(() => navigate("/dashboard"));
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading remedial tasks…</div>;
  }

  // ✅ PERFORMED WELL UI
  if (!task) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "80px auto",
          background: "#dcfce7",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h2>🎉 You performed well!</h2>
        <p style={{ marginTop: "12px", fontSize: "18px", color: "#166534" }}>
          No remedial task is required.
        </p>

        <button
          className="submit-btn"
          style={{ marginTop: "24px" }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ❌ PERFORMED POOR UI → CHECKPOINT QUIZ
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2 style={{ marginBottom: "24px" }}>🧠 Remedial Task</h2>

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          marginBottom: "32px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3>📘 Topic: {task.topic}</h3>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          You answered some questions incorrectly from this topic.
        </p>
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "30px",
          borderRadius: "16px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>📝 Checkpoint Quiz</h3>

        {questions.map((q, i) => (
          <div key={q.id} style={{ marginBottom: "24px" }}>
            <p style={{ fontWeight: "600", marginBottom: "12px" }}>
              {i + 1}. {q.question}
            </p>

            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setAnswers({ ...answers, [i]: idx })
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    answers[i] === idx ? "#2563eb" : "#e5e7eb",
                  color:
                    answers[i] === idx ? "#ffffff" : "#000000",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button
          className="submit-btn"
          style={{ width: "100%", marginTop: "20px" }}
          onClick={submitCheckpointQuiz}
        >
          Submit Checkpoint Quiz
        </button>
      </div>
    </div>
  );
}





