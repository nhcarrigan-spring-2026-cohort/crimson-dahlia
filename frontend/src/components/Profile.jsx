import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./profile.css";

function Profile() {
  const [bio, setBio] = useState("");
  const [references, setReferences] = useState(["", "", ""]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleReferenceChange = (index, value) => {
    const newRefs = [...references];
    newRefs[index] = value;
    setReferences(newRefs);
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Community Aid" className="logo-img" />
          <h2>
            Community <br /> Aid
          </h2>
        </div>

        <ul className="menu">
          <li>Home</li>
          <li className="active">Profile</li>
          <li>My Tasks</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Body */}
        <div className="profile-body">
          {/* Header inside container */}
          <div className="top-header">
            <div className="user-name">
              <span className="user-icon">👤</span>
              <h1>Your Name</h1>
            </div>
          </div>

          {/* LEFT and RIGHT sections */}
          <div className="profile-content">
            {/* LEFT */}
            <div className="left-section">
              <div className="bio-section">
                <label className="section-label">Bio</label>
                <textarea
                  className="bio-box"
                  placeholder="A little bit about this person"
                  value={bio}
                  onChange={handleBioChange}
                />
                <div className="char-count">{bio.length}/500</div>
              </div>

              <div className="references-section">
                <label className="section-label">References</label>
                {references.map((ref, index) => (
                  <input
                    key={index}
                    className="ref-input"
                    value={ref}
                    onChange={(e) => handleReferenceChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-section">
              <div className="skills-header">
                <label className="section-label">Skills</label>
                <button className="add-skill">+</button>
              </div>

              <div className="skills-list">
                <span className="skill-pill">Painting</span>
                <span className="skill-pill">Yard Work</span>
                <span className="skill-pill">Housekeeping</span>
                <span className="skill-pill">Tech Support</span>
                <span className="skill-pill">Dog Walking</span>
                <span className="skill-pill">Financial Literacy</span>
                <span className="skill-pill">Cooking</span>
                <span className="skill-pill">Gardening</span>
                <span className="skill-pill">Cleaning</span>
                <span className="skill-pill">Tutoring</span>
              </div>
              <div className="more-skills">any more skills too</div>

              <div className="contact-box">
                <p className="contact-title">Contact:</p>
                <p>name@email.com</p>
                <p>City, State</p>
              </div>

              <p className="joined">joined on: 17 February 2026</p>
              <p className="delete">Delete Account</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;