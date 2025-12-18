import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizResult() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/result/${attemptId}`)
      .then(res => {
        if (!res.ok) throw new Error("Result not found");
        return res.json();
      })
      .then(data => {
        // ✅ STRICT PARSING (NO ASSUMPTIONS)
        if (typeof data.score === "number" && typeof data.total === "number") {
          setScore(data.score);
          setTotal(data.total);
        } else {
          throw new Error("Invalid result data");
        }
        setLoading(false);
      })
      .catch(() => {
        // ✅ LAST SAFE FALLBACK
        const s = localStorage.getItem("lastQuizScore");
        const t = localStorage.getItem("lastQuizTotal");

        if (s !== null && t !== null) {
          setScore(Number(s));
          setTotal(Number(t));
        }
        setLoading(false);
      });
  }, [attemptId]);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Loading quiz result…
      </div>
    );
  }

  if (score === null || total === null) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Quiz result not available.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "80px auto", padding: "20px" }}>
      <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Quiz Completed 🎉
      </h2>

      <p style={{ fontSize: "22px", marginBottom: "30px" }}>
        Your Score: <b>{score} / {total}</b>
      </p>

      <button
        onClick={() => navigate("/progress")}
        style={{
          padding: "14px",
          marginBottom: "14px",
          width: "100%",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        📊 View Progress
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "14px",
          width: "100%",
          background: "#e5e7eb",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}





