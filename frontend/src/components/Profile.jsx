import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Your Name",
    bio: "",
    skills: [
      "Painting",
      "Yard Work",
      "Housekeeping",
      "Tech Support",
      "Dog Walking",
      "Financial Literacy",
      "Cooking",
      "Gardening",
      "Cleaning",
      "Tutoring"
    ],
    contact: {
      email: "name@email.com",
      city: "City, State"
    },
    joinedOn: "17 February 2026"
  });

  const handleBioChange = (e) => {
    setProfile(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Enter new skill:");
    if (newSkill && newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleEditName = () => {
    const newName = prompt("Enter new name:", profile.name);
    if (newName && newName.trim()) {
      setProfile(prev => ({ ...prev, name: newName.trim() }));
    }
  };

  const handleEditContact = () => {
    const newEmail = prompt("Enter new email:", profile.contact.email);
    const newCity = prompt("Enter new city:", profile.contact.city);
    
    if (newEmail && newCity && newEmail.trim() && newCity.trim()) {
      setProfile(prev => ({
        ...prev,
        contact: {
          email: newEmail.trim(),
          city: newCity.trim()
        }
      }));
    }
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
              <h1>{profile.name}</h1>
              <button onClick={handleEditName} className="edit-btn">Edit</button>
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
                  value={profile.bio}
                  onChange={handleBioChange}
                />
                <div className="char-count">{profile.bio.length}/500</div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-section">
              <div className="skills-header">
                <label className="section-label">Skills</label>
                <button onClick={handleAddSkill} className="add-skill">+</button>
              </div>

              <div className="skills-list">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-pill">
                    {skill}
                    <button 
                      onClick={() => handleDeleteSkill(skill)} 
                      className="delete-skill-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="contact-box">
                <div className="contact-header">
                  <p className="contact-title">Contact:</p>
                  <button onClick={handleEditContact} className="edit-btn">Edit</button>
                </div>
                <p>{profile.contact.email}</p>
                <p>{profile.contact.city}</p>
              </div>

              <p className="joined">joined on: {profile.joinedOn}</p>
              <p className="delete">Delete Account</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;