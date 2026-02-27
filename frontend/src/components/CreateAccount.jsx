import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import heroImg from "../assets/image/heroImg.webp";
import logo from "../assets/icons/logo.svg";

const passwordRules = [
  { key: "lower", label: "at least one lowercase letter", test: (s) => /[a-z]/.test(s) },
  { key: "upper", label: "at least one uppercase letter", test: (s) => /[A-Z]/.test(s) },
  { key: "number", label: "at least one number", test: (s) => /[0-9]/.test(s) },
  { key: "length", label: "minimum 8 characters", test: (s) => s.length >= 8 },
];

function CreateAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ruleStatus = useMemo(
    () => passwordRules.map((r) => ({ ...r, ok: r.test(password) })),
    [password]
  );

  const passwordOk = ruleStatus.every((r) => r.ok);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = passwordOk && passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src={heroImg}
          alt=""
          id="hero--img"
          aria-hidden="true"
        />

        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Community Aid</span>
        </div>

        <div className="caption">
          <h1>Help your neighbors, build your community.</h1>
        </div>
      </div>

      <div className="right-section">
        <h2>Create an account</h2>

        <form className="create-account-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            name="email"
            id="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
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

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="buttons">
            <button type="submit" disabled={!canSubmit}>
              Sign Up
            </button>

            <button type="button" onClick={() => navigate("/")}>
              Already have an account? Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;