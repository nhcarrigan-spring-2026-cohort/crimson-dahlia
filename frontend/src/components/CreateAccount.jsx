import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const passwordRules = [
  { key: "lower", label: "at least one lowercase letter", test: (s) => /[a-z]/.test(s) },
  { key: "upper", label: "at least one uppercase letter", test: (s) => /[A-Z]/.test(s) },
  { key: "number", label: "at least one number", test: (s) => /[0-9]/.test(s) },
  { key: "length", label: "minimum 8 characters", test: (s) => s.length >= 8 },
];

const CreateAccount = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ruleStatus = passwordRules.map((r) => ({ ...r, ok: r.test(password) }));
  const passwordOk = ruleStatus.every((r) => r.ok);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleCreateAccount = () => {
  if (!passwordOk || !passwordsMatch) return;
  navigate("/community-aid");
};

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <div className="logo-box">
          <div className="logo-circle">
            🤝
          </div>
        </div>

        <h2 className="title">Create Account</h2>
        <p className="subtitle">
          Join your community and start helping
        </p>

        <div className="form-group">
          <label className="form-label">Full name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
<ul className="password-rules">
  {ruleStatus.map((r) => (
    <li key={r.key} className={r.ok ? "rule-ok" : "rule-not-ok"}>
      <span className="rule-icon">{r.ok ? "✓" : "✗"}</span>
      <span className="rule-text">{r.label}</span>
    </li>
  ))}
</ul>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

<button
  className="btn-primary"
  type="button"
  disabled={!passwordOk || !passwordsMatch}
  onClick={handleCreateAccount}
>
  Create Account
</button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
        >
          Already have an account? Sign In
        </button>

        <p className="terms">
          By continuing, you agree to our <span>Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
