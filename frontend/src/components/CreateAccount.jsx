import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <div className="logo-box">
          <div className="logo-circle">🤝</div>
        </div>

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join your community and start helping</p>

       <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="form-input"
          />
        </div>

        <button
          className="btn-primary"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Create Account
        </button>

        <button
          className="btn-secondary"
          type="button"
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
