
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) navigate("/");
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <div className="top-header">
        <div>
          <h2 className="app-title">Learning Loop</h2>
          <div className="nav-links">
            <span onClick={() => navigate("/focus-timer")}>Focus Timer</span>
            <span onClick={() => navigate("/daily-quiz")}>Daily Quiz</span>
            <span onClick={() => navigate("/progress")}>Progress</span>
            <span onClick={() => navigate("/mentor-review")}>Mentor Review</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* WELCOME */}
      <div className="welcome-box">
        <h1>Welcome to Learning Loop</h1>
        <p>Logged in as <b>{email}</b></p>
      </div>

      {/* CARDS */}
      <div className="card-grid">
        <Card title="⏱ Focus Timer" desc="Deep work sessions" onClick={() => navigate("/focus-timer")} />
        <Card title="📘 Daily Quiz" desc="Test your knowledge" onClick={() => navigate("/daily-quiz")} />
        <Card title="📊 Progress" desc="Track improvement" onClick={() => navigate("/progress")} />
        <Card title="🧠 Remedial Tasks" desc="Improve weak areas" onClick={() => navigate("/remedial-tasks")} />
      </div>
    </div>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <button onClick={onClick}>Open</button>
    </div>
  );
}





