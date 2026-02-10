import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();

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
            placeholder="Create a password"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="form-input"
          />
        </div>

        <button 
          className="btn-primary"
          onClick={() => navigate("/community-aid")}
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
