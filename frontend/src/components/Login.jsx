import React from 'react';
import './Login.css';
import communityImg from '../assets/community-aid-bg.jpg';
import logo from '../assets/logo.png';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Image & Branding */}
        <div className="login-image-section" style={{ backgroundImage: `url(${communityImg})` }}>
          <div className="brand-logo">
            <img src={logo} alt="Community Aid" className="logo-icon" />
            <span>Community Aid</span>
          </div>
          
          <div className="image-overlay-text">
            <h1>Help your neighbors,<br />build your community.</h1>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="login-form-section">
          <div className="form-wrapper">
            <h2>Sign In</h2>
            <form>
              <input type="email" placeholder="Email address" className="login-input" />
              <input type="password" placeholder="Password" className="login-input" />
              
              <button type="submit" className="btn-sign-in">Sign In</button>
              <button type="button" className="btn-create-account">Create an account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}