import React, { useState } from "react";
import "./MyTasks.css";
import logo from "../assets/logo.png";

function MyApplications() {
  const mockApplications = [
    {
      id: 1,
      title: "Build Landing Page",
      description:
        "Need help building a responsive marketing landing page for a startup.",
      creator: "sarah_dev",
      status: "Pending",
    },
    {
      id: 2,
      title: "Fix Login Bug",
      description:
        "Login form throws an error when incorrect password is entered.",
      creator: "mike_codes",
      status: "Accepted",
    },
    {
      id: 3,
      title: "Design Logo",
      description:
        "Looking for a modern logo design for a tech startup brand.",
      creator: "emma_ui",
      status: "Rejected",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedApp = mockApplications[selectedIndex];

  return (
    <div className="dashboard-container">
      
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Community Aid" className="logo-img" />
          <h2>Community Aid</h2>
        </div>
        <ul className="menu">
          <a href="/dashboard"><li>Home</li></a>
          <a href="/profile"><li>Profile</li></a>
          <a href="/my-tasks"><li>My Tasks</li></a>
          <a href="/my-applications"><li className="active">My Applications</li></a>
        </ul>
      </div>

      
      <div className="main-content">
        
        <div className="search-tasks">
          <h2>My Applications</h2>

          <div className="job-list">
            {mockApplications.length === 0 ? (
              <div className="job-card">
                <strong>No Applications Yet</strong>
                <p>You haven’t applied to any tasks.</p>
              </div>
            ) : (
              mockApplications.map((app, index) => (
                <div
                  key={app.id}
                  className={`job-card ${
                    index === selectedIndex ? "selected" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <strong>{app.title}</strong>
                  <p className="description-preview">{app.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Application Details */}
        {selectedApp && (
          <div className="job-details">
            <h2>{selectedApp.title}</h2>

            <div className="description-box">
              <div className="description-text">
                {selectedApp.description}
              </div>
            </div>

            <h3>
              Creator: <span>{selectedApp.creator}</span>
            </h3>

            <h3>
              Status:{" "}
              <span
                style={{
                  color:
                    selectedApp.status === "Accepted"
                      ? "#00e676"
                      : selectedApp.status === "Rejected"
                      ? "#ff5252"
                      : "#ffd600",
                }}
              >
                {selectedApp.status}
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;