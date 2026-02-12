import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-box">
          <div className="logo-circle">
            🤝
          </div>
        </div>

        <h2 className="title">Community Aid</h2>
        <p className="subtitle">
          Help your neighbors, build your community
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="input"
          style={{ color: 'black' }}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          style={{ color: 'black' }}
        />

        <button 
          className="btn-primary"
          onClick={() => navigate("/community-aid")}
        >
          Sign In
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </button>

        <p className="terms">
          By continuing, you agree to our <span>Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
