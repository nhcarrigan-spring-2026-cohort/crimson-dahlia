import { useState, useContext } from 'react';
import heroImg from '../assets/image/heroImg.webp';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './CreateAccount.css'; // Reusing styles from CreateAccount for consistency
import { handleLogin } from '../util/handleLogin';
import { AuthContext } from '../context/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /* Logs a user in with email and password! Given they match an account in the database */
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await handleLogin(email, password, setUser);

    setLoading(false);

    if (result.success) {
      console.log("Logged in user:", result.user); // Delete before production - only for testing
      navigate("/dashboard"); // redirect after login
    } else {
      setError(result.error);
    }
  };


  return (
      <div className="container">
        <div className="left-section">
          <img src={heroImg} alt="Hero Image" id="hero--img" aria-hidden="true" />
  
          <div className="logo">
            <img src={logo} alt="Logo" />
            <span>Community Aid</span>
          </div>
  
          <div className="caption">
            <h1>Help your neighbors, build your community.</h1>
          </div>
        </div>
  
        <div className="right-section">
          <h2>Sign In</h2>
  
          <form className="create-account-form" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
  
            <div className="buttons">
              <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
              {error && <p className="error">{error}</p>}
  
              <button type="button" onClick={() => navigate("/create-account")}>
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );

}