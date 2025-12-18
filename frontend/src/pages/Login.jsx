import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // existing logic (unchanged)
    localStorage.setItem("email", email);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Welcome Back 👋
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "32px" }}>
          Login to continue your learning journey
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ fontSize: "14px", color: "#374151" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button type="submit" className="submit-btn" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "24px", textAlign: "center", color: "#6b7280" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb", fontWeight: "600" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "6px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
};





