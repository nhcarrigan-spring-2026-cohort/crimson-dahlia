import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO EXACT STYLE */}
        <div className="logo-box">
          <div className="logo-circle">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 3L4 8v8l8 5 8-5V8l-8-5z" 
                stroke="white" 
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path 
                d="M8 12l4 2 4-2" 
                stroke="white" 
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="title">Community Aid</h2>
        <p className="subtitle">
          Help your neighbors, build community
        </p>

        <div className="form-box">
          <h3>Welcome Back</h3>

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input"
          />

          <button className="btn-primary">Login</button>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="btn-secondary">Create Account</button>
        </div>

      </div>
    </div>
  );
}
