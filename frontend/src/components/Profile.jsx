import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import "./profile.css";
import { updateProfile } from "../util/updateProfile";
import { getProfile } from "../util/getProfile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { deleteProfile } from "../util/deleteProfile";



function Profile() {
  const token = localStorage.getItem("authToken");
  // const { token } = React.useContext(AuthContext);
  const [profile, setProfile] = useState({}); // Fetch profile data from backend on load 
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) return;
    
    const fetchProfile = async () => {
      const data = await getProfile(token);
      if (data && data.user) {
        setProfile(data.user);
      } else {
        console.error("Failed to fetch profile data:", data ? data.error : "No data returned");
      }
    };

    fetchProfile(); // fetched profile data
  }, [token]);

const [bioDraft, setBioDraft] = useState(profile.bio || "");

React.useEffect(() => {
  setBioDraft(profile.bio || "");
}, [profile.bio]);



React.useEffect(() => {
  if (!token) return;

  const handler = setTimeout(async () => {
    if (!profile?.id) return; // Ensure profile is loaded before trying to update
    const result = await updateProfile(profile.id, { bio: bioDraft }, token);
    if (result.success) setProfile(result.user);
  }, 500); // wait 500ms after user stops typing
 
  return () => {
    clearTimeout(handler); // clear previous timer on every keystroke
  }
}, [bioDraft, token]);


  const handleAddSkill = async () => {
    const newSkill = prompt("Enter new skill:");
    if (newSkill && newSkill.trim()) {
      const newData = await updateProfile(profile.id, { ...profile, skills: [...profile.skills, newSkill.trim()] }, token); // Save to backend
      if (newData && newData.user) {
        setProfile(newData.user); // Refresh profile data from backend after update
      } else {
        alert("Failed to add skill: " + (newData ? newData.error : "No response from server"));
      }
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    const newData = await updateProfile(profile.id, { skills: profile.skills.filter(skill => skill !== skillToDelete) }, token); // Save to backend on change
    if (newData && newData.user) {
      setProfile(newData.user); // Refresh profile data from backend after update
    } else {
      alert("Failed to delete skill: " + (newData ? newData.error : "No response from server"));
    }
  };

  const handleEditName = async () => {
    const newName = prompt("Enter new name:", profile.username);
    if (newName && newName.trim()) {
      const newData = await updateProfile(profile.id, { username: newName.trim() }, token); // Save to backend on change
      if (newData && newData.user) {
        setProfile(newData.user); // Refresh profile data from backend after update
      } else {
        alert("Failed to update name: " + (newData ? newData.error : "No response from server"));
      }
    } else {
      window.alert("Can't have null name")
    }
  };

  const handleEditContact = async () => {
    const newEmail = prompt("Enter new email:", profile.email);
    const newCity = prompt("Enter new city:", profile.city);
    const newState = prompt("Enter new state:", profile.state);
    
    if (newEmail.trim() && newCity.trim()) {
      const result = await updateProfile(profile.id, { email: newEmail.trim(), city: newCity.trim(), state: newState.trim() }, token); // Save to backend on change
      if (result.success) {
        setProfile(result.user); // Refresh profile data from backend after update
      } else {
        alert("Failed to update contact info: " + result.error);
      }
    }
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
  }

  const handleDelete = async () => {

    const confirmDelete = window.confirm("Are you sure you want to permanently delete this account? This action cannot be undone.");

    // could add more/ different blockers here if desired

    if (!confirmDelete) return;

    if (!profile.id) {
      console.log("User ID not found"); // for debugging really
    }

    const result = await deleteProfile(profile.id, token);

    if (result.success){
      logout();
      navigate("/");
    } else {
      alert("Failed to delete account: " + result.error);
    }

  }

if (Object.keys(profile).length === 0) {
    return (<div className="profile-container">
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
        <div> Loading Profile Data... </div>
      </main>
    </div>
  );
}

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
          <a href="/dashboard"><li>Home</li></a>
          <a href="/profile"><li className="active">Profile</li></a>
          <a href="/my-tasks"><li>My Tasks</li></a>
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
              <h1>{profile.username}</h1>
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
                  value={bioDraft}
                  onChange={(e) => setBioDraft(e.target.value)}
                />
                <div className="char-count">{bioDraft.length}/500</div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-section">
              <div className="skills-header">
                <label className="section-label">Skills</label>
                <button onClick={handleAddSkill} className="add-skill">+</button>
              </div>

              <div className="skills-list">
                {profile && profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span key={index} className="skill-pill">
                      {skill}
                      <button 
                        onClick={() => handleDeleteSkill(skill)} 
                        className="delete-skill-btn"
                    >
                      ×
                    </button>
                  </span>
                ))) : <p>No skills added yet.</p>}
              </div>

              <div className="contact-box">
                <div className="contact-header">
                  <p className="contact-title">Contact:</p>
                  <button onClick={handleEditContact} className="edit-btn">Edit</button>
                </div>
                <p>{profile.email}</p>
                <p>{profile.city ? profile.city : "City"}, {profile.state ? profile.state: "State"}</p>
              </div>

              <p className="joined">joined on: {new Date(profile.created_at).toLocaleDateString('en-US')}</p>
              <p className ="delete" onClick={handleLogout}>Logout</p>
              <p className="delete" onClick={handleDelete}>Delete Account</p>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;