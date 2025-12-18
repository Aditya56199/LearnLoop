import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(1500); // 25 min
  const [running, setRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "16px" }}>Focus Timer</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Stay focused. One session at a time.
      </p>

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "320px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {formatTime()}
        </h2>

        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <button
            className="submit-btn"
            style={{ flex: 1 }}
            onClick={() => {
              setRunning(true);
              setSessionStarted(true);
            }}
            disabled={running}
          >
            Start
          </button>

          <button
            style={{
              flex: 1,
              background: "#ef4444",
              color: "white",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setRunning(false);
              setSeconds(1500);
              setSessionStarted(false);
            }}
          >
            Reset
          </button>
        </div>

        {sessionStarted && (
          <button
            className="submit-btn"
            style={{ width: "100%" }}
            onClick={() => navigate("/daily-quiz")}
          >
            Attempt Quiz
          </button>
        )}
      </div>
    </div>
  );
}


