import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("దయచేసి email నమోదు చేయండి");
      return;
    }
    if (!password.trim()) {
      setError("దయచేసి password నమోదు చేయండి");
      return;
    }

    // simple rule:
    // admin user: email = admin@sr.com, password = admin123
    // లేని పక్షంలో normal user
    let role = "user";
    if (email === "admin@sr.com" && password === "admin123") {
      role = "admin";
    }

    onLogin(email, role);
    navigate("/"); // home కి వెళ్లిపోతుంది
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">SR Movie Admin – Login</h1>
        

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="input-label">
            Email
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input-label">
            Password
            <input
              type="password"
              className="input"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}