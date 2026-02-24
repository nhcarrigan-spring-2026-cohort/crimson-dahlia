import React, { useState, useEffect } from "react";
import "./MyTasks.css";
import logo from "../assets/logo.png";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 || window.innerHeight < 550
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function MyTasks() {
  const isMobile = useIsMobile();

  

  //  React states for managing selected job, search term, editing state, and job data
  const [selectedJobIndex, setSelectedJobIndex] = useState(0); // Index of the currently selected job (for the viewer)
  const [searchTerm, setSearchTerm] = useState(""); // What the user has typed into the search bar to filter tasks
  const textareaRef = React.useRef(null); // Ref for the description textarea, used to manage focus and cursor position when editing
  const [isEditing, setIsEditing] = useState(false); // Whether the user is currently editing the job description
  const [editedDescription, setEditedDescription] = useState(""); // The current value of the description being edited, separate from the saved job description until the user clicks "Save"
//   const zipcode = "12345"; // would be the zipcode of the user, used to filter tasks in the market
  
//   const [jobs, setJobs] = useState([]); // A blank array for testing with no jobs, to test the "No Tasks Found" message when search returns no results
  const [jobs, setJobs] = useState([
    { title: "Grocery Shopping", description: "I need someone to help me with grocery shopping on Sunday mornings. It's usually a short list and I live near the store, but have limited mobility. I need someone to help me with grocery shopping on Sunday mornings. It's usually a short list and I live near the store, but have limited mobility.I need someone to help me with grocery shopping on Sunday mornings. It's usually a short list and I live near the store, but have limited mobility.I need someone to help me with grocery shopping on Sunday mornings. It's usually a short list and I live near the store, but have limited mobility.I need someone to help me with grocery shopping on Sunday mornings. It's usually a short list and I live near the store, but have limited mobility. I need someone to help me with grocery shopping on Sunday. ", zipcode: "12345", tags: ["shopping", "repeat"], status: "available", applicants: [1,2,3,4] },
    { title: "Dog Walking", description: "I need someone to walk my dog in the evenings. My dog is friendly but energetic, so experience with dogs is preferred.", zipcode: "12345", tags: ["dog", "walking"], status: "available", applicants: [] },
    { title: "Painting", description: "This is a one-time job. I would like an extra hand painting my garage this weekend.", zipcode: "12345", tags: ["painting", "one-time"], status: "available", applicants: [3,4], helper_id: 3 },
  ]); // Sample job data with various fields including title, description, zipcode, tags, status, applicants, and helper_id (for in-progress tasks)

//   const applicants = []; // A blank array for testing with no applicants, to test the "No applicants yet" message when viewing a job with no applicants
  const applicants = [
    { id: 1, name: "Alice Johnson", profilePic: "https://randomuser.me/api/portraits/women/1.jpg", bio: "Hi! I'm Alice, a college student who loves helping out in the community. I have experience with grocery shopping and am available on Sunday mornings.", email: "alice.johnson@example.com" },
    { id: 2, name: "Bob Smith", profilePic: "https://randomuser.me/api/portraits/men/2.jpg", bio: "Hello! I'm Bob, a software engineer who enjoys volunteering. I can help with dog walking and other tasks in the evenings.", contact: "bobsmithy11@example.com" },
    { id: 3, name: "Charlie Davis", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", bio: "Hey! I'm Charlie, a retired teacher looking to stay active in the community. I have experience with painting and home improvement projects." },
    { id: 4, name: "Diana Lee", profilePic: "https://randomuser.me/api/portraits/women/4.jpg", bio: "Hi there! I'm Diana, a stay-at-home mom who loves helping neighbors. I can assist with grocery shopping and other errands on weekends." },
  ]; // Sample user data with id, name, profile picture URL, and a short bio
  
  const selectedJob = jobs[selectedJobIndex] || null; // The currently selected job object, or null if no jobs are available (used to display job details and manage actions based on the selected job)


  /**  Handler functions for accepting applicants, changing job status, and editing job descriptions. These functions update the local state to reflect changes in the UI. In a real application, these would also involve API calls to update the backend database. */

  // Handler for accepting an applicant for a job. Updates the job's status to "in progress" and sets the helper_id to the accepted applicant's ID.
  const handleAccept = (applicantId) => {
    setJobs(prevJobs =>
        prevJobs.map((job, index) =>
        index === selectedJobIndex
            ? { ...job, status: "in progress", helper_id: applicantId }
            : job
        )
    );
  };

  // Handler for marking a job as unavailable. Updates the job's status to "unavailable".
  const handleUnavailable = () => {
    setJobs(prevJobs =>
        prevJobs.map((job, index) =>
        index === selectedJobIndex
            ? { ...job, status: "unavailable" }
            : job
        )
    );
  };

  // Handler for marking a job as available again. Updates the job's status to "available" and clears the helper_id.
  const handleAvailable = () => {
    setJobs(prevJobs =>
        prevJobs.map((job, index) =>
        index === selectedJobIndex
            ? { ...job, status: "available", helper_id: null }
            : job
        )
    );
  }

  // Handler for marking a job as completed. Updates the job's status to "completed" for user records -> Maybe we delete jobs here?.
  const handleComplete = () => {
    setJobs(prevJobs =>
        prevJobs.map((job, index) =>
        index === selectedJobIndex
            ? { ...job, status: "completed" }
            : job
        )
    );
  };
  
  // Handler for initiating the edit of a job description. Sets the editing state to true and initializes the editedDescription state with the current job description.
  const handleEditDescription = () => {
    setIsEditing(true);
    setEditedDescription(selectedJob.description);
  };

  // Handler for canceling the edit of a job description. Resets the editing state and clears the editedDescription state.
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription("");
  };

  // Handler for saving the edited job description. Updates the job's description in the local state and exits editing mode.
  // TODO:  Implement API call to save the edited description to the backend database, and handle any errors that may occur during the save process.
  const handleSaveDescription = async () => {
    try {
        setJobs(prevJobs =>
            prevJobs.map((job, index) =>    
            index === selectedJobIndex
                ? { ...job, description: editedDescription }
                : job
            )
        );
        setIsEditing(false);
    } catch (error) {
        console.error("Error saving description:", error);
    }
  };

  // Filter the applicants for the selected job based on the applicant IDs in the job's applicants array. This creates a list of applicant objects that can be displayed in the UI when viewing a job's details.
  // (we can probably remove this during backend integration? idk yet)
  const jobApplicants = selectedJob ? applicants.filter(applicant =>
    selectedJob.applicants.includes(applicant.id)
  ) : [];

  // Filter the list of jobs based on the search term entered by the user. This checks if the search term is included in the job's title, description, or tags (case-insensitive). The filtered list of jobs is what gets displayed in the job list on the left side of the dashboard.
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase()) || job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  if (isMobile) {
    return (
      <div className="mobile-message">
        <h2>Please use Community Aid on a larger screen.</h2>
        <p>We are working hard to make Community Aid accessible on all devices. In the meantime, please access this site on a desktop or laptop computer.</p>
      </div>
    );
  }


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
          <a href="/my-tasks"><li className="active">My Tasks</li></a>
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
            <img src='/src/assets/add_symbol.png' alt='Add Task' className="add-task-btn" onClick={() => window.location.href = "/create-task"} />
          </div>
          {/* <p>Showing tasks for: {zipcode}</p>  */} {/* If we want to display the user's zipcode to indicate that the tasks shown are filtered based on their location. This can help users understand that they are seeing tasks relevant to their area. */}
        
          <div className="job-list">
            {filteredJobs.length === 0 ? (
                <div
                className="job-card"
              >
                <strong>No Tasks Found</strong>
              </div>
            ) : (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className={`job-card ${index === selectedJobIndex ? 'selected' : ''}`}
                onClick={() => setSelectedJobIndex(index)}
              >
                <strong>{job.title}</strong>
                <p className="description-preview">{job.description}</p>
              </div>
            ))
            )}
          </div>
        </div>

        <div className="job-details">
          <h2>{selectedJob.title}</h2>
          <div className="description-box">

                {isEditing ? (
                    <textarea
                    ref={textareaRef}
                    style={{height: "800px"}}
                    className="description-text"
                    value={editedDescription}
                    maxLength={800}
                    
                    onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    <div className="description-text">{selectedJob.description}</div>
                )}

                <div className="char-count">
                {(isEditing ? editedDescription.length : selectedJob.description.length)}/800 characters
                </div>

                <div className="description-actions">
                {!isEditing && selectedJob.status === "available" && (
                    <button className="secondary-btn" onClick={handleEditDescription}>
                    Edit
                    </button>
                )}

                {isEditing && (
                    <>
                    <button className="secondary-btn" onClick={handleSaveDescription} disabled={editedDescription.trim() === ""}>
                        Save
                    </button>
                    <button className="secondary-btn" onClick={handleCancelEdit}>
                        Cancel
                    </button>
                    </>
                )}
                </div>
            </div>
          
          <h3>Status: <span>{selectedJob.status.toUpperCase()}</span></h3>
          {selectedJob.status === "available" && 
            <div className="applicants-section">
                <h3>Applicants:</h3>
                <div className="applicants-list">
                    { selectedJob.applicants && selectedJob.applicants.length > 0 ? jobApplicants.map((applicant) => (
                        <div key={applicant.id} className="applicant-card">
                        <img
                            src={applicant.profilePic ? applicant.profilePic : "https://via.placeholder.com/150"}
                            alt={applicant.name}
                            className="applicant-pic"
                        />
                        <div className="applicant-info">
                            <h4 className="applicant-name">{applicant.name}</h4>
                            <p className="applicant-bio">{applicant.bio}</p>
                        </div>
                        <button className="apply-btn" onClick={() => handleAccept(applicant.id)}>Accept</button>
                        </div>
                    )) : (<div style={{margin: "20px 0"}}><h4>No applicants yet.</h4>
                    <p> Try updating your description or adding more tags!</p></div>)}
                </div>
            </div>
          }
          {selectedJob.status === "in progress" && 
            <div className="current-helper">
                <h3>Current Helper: </h3> 
                <div className="applicant-card">
                    <img
                        src={applicants.find(applicant => applicant.id === selectedJob.helper_id)?.profilePic
                            || "https://via.placeholder.com/150"}
                        alt={applicants.find(applicant => applicant.id === selectedJob.helper_id)?.name || "Helper"}
                        className="applicant-pic"
                        />
                    <div className="applicant-info">
                        <h4 className="applicant-name">{applicants.find(applicant => applicant.id === selectedJob.helper_id)?.name || "Helper"}</h4>
                        <p className="applicant-bio">{applicants.find(applicant => applicant.id === selectedJob.helper_id)?.bio || "No bio available"}</p>
                    </div>
                    <div className="applicant-info"> Contact: {applicants.find(applicant => applicant.id === selectedJob.helper_id)?.email || "No contact info available"} </div>
                </div>
            </div>
          }
            <div className="job-actions" style={{ marginTop: selectedJob.status === "available" ? "10px" : "0" }}>
                {(selectedJob.status === "in progress" || selectedJob.status === "unavailable") && <button className="apply-btn" onClick={handleAvailable} alt="Return to the market? Make it Available">Make Available</button>}
                {selectedJob.status === "available" && <button className="apply-btn" onClick={handleUnavailable} alt="Mark this task as unavailable, removing it from the market">Mark Unavailable</button>}
                {selectedJob.status === "in progress" && <button className="apply-btn" onClick={handleComplete} alt="Mark this task as completed">Mark Completed</button>}
                
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default MyTasks;