import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DailyQuiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ===================== START QUIZ =====================
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:8080/quiz/start?userEmail=${email}`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || []);
        setAttemptId(data.attemptId);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  // ===================== SUBMIT QUIZ =====================
  const submitQuiz = () => {
    if (!attemptId) return;

    setSubmitting(true);

    let score = 0;
    const wrongQuestionIds = [];

    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) {
        score++;
      } else {
        wrongQuestionIds.push(q.id);
      }
    });

    fetch(`http://localhost:8080/quiz/submit/${attemptId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, wrongQuestionIds }),
    })
      .then(() => {
        // ✅ REQUIRED: STORE RESULT FOR QUIZ RESULT PAGE
        localStorage.setItem("lastQuizScore", score);
        localStorage.setItem("lastQuizTotal", questions.length);

        // ✅ REQUIRED: CORRECT ROUTE WITH attemptId
        navigate(`/quiz-result/${attemptId}`);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading quiz…</div>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>Daily Quiz</h2>

      {questions.map((q, i) => (
        <div
          key={q.id}
          style={{
            background: "#ffffff",
            padding: "24px",
            marginBottom: "24px",
            borderRadius: "14px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: "21px", fontWeight: "600", marginBottom: "16px" }}>
            {i + 1}. {q.question}
          </p>

          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setAnswers({ ...answers, [i]: idx })}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px",
                marginBottom: "12px",
                borderRadius: "10px",
                border: "none",
                background:
                  answers[i] === idx ? "#2563eb" : "#f1f5f9",
                color: answers[i] === idx ? "#ffffff" : "#000000",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      <button
        onClick={submitQuiz}
        disabled={submitting}
        style={{
          padding: "16px",
          fontSize: "18px",
          width: "100%",
          borderRadius: "12px",
          background: submitting ? "#9ca3af" : "#16a34a",
          color: "#ffffff",
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Submitting…" : "Submit Quiz"}
      </button>
    </div>
  );
}


