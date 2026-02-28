import { useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import heroImg from "../assets/image/heroImg.webp";
import logo from "../assets/icons/logo.svg";
import { handleCreateAccount } from "../util/handleCreateAccount";
import { AuthContext } from "../context/AuthProvider";

const passwordRules = [
  { key: "lower", label: "at least one lowercase letter", test: (s) => /[a-z]/.test(s) },
  { key: "upper", label: "at least one uppercase letter", test: (s) => /[A-Z]/.test(s) },
  { key: "number", label: "at least one number", test: (s) => /[0-9]/.test(s) },
  { key: "length", label: "minimum 8 characters", test: (s) => s.length >= 8 },
];

function CreateAccount() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ruleStatus = useMemo(
    () => passwordRules.map((r) => ({ ...r, ok: r.test(password) })),
    [password]
  );

  const passwordOk = ruleStatus.every((r) => r.ok);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = passwordOk && passwordsMatch;

  /* Creates a new account! Given the right standards */
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const result = await handleCreateAccount({
        email: document.getElementById("email").value,
        password: password,
        username: document.getElementById("username").value,
        setUser: setUser
      });
  
      setLoading(false);
  
      if (result.success) {
        console.log("Created account for user:", result.user); // Delete before production - only for testing
        navigate("/dashboard"); // redirects after login
      } else {
        setError(result.error);
      }
    };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src={heroImg}
          alt="Community of people helping each others."
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
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
              {error && <p className="error">{error}</p>}

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