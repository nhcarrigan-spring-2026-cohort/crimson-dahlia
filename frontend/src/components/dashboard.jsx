import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";

function Dashboard() {
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const jobs = [
    { title: "Job Title", description: "some job description" },
    { title: "some job 2", description: "some job description" },
    { title: "some job 3", description: "some job description" },
  ];

  const selectedJob = jobs[selectedJobIndex];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Community Aid" className="logo-img" />
          <h2>Community Aid</h2>
        </div>
        <ul className="menu">
          <li className="active">Home</li>
          <li>Profile</li>
          <li>My Tasks</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Tasks"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="job-list">
            {jobs.map((job, index) => (
              <div
                key={index}
                className={`job-card ${index === selectedJobIndex ? 'selected' : ''}`}
                onClick={() => setSelectedJobIndex(index)}
              >
                <strong>{job.title}</strong>
                <p>{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="job-details">
          <h2>{selectedJob.title}</h2>
          <div className="author">
            <div className="author-icon">👤</div>
            <span>Author</span>
            <span className="posted">posted on: XX/XX/XXXX</span>
          </div>
          <div className="description-box">
            <p className="description-text">The job's description in full, should have a character count, but still go over everything someone should know.</p>
            <div className="char-count">N/800 characters</div>
          </div>
          <button className="apply-btn">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
