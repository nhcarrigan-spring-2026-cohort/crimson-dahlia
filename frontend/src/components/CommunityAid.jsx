import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityAid.css";

const CommunityAid = () => {
  const navigate = useNavigate();
  const [searchZipcode, setSearchZipcode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample data for help requests
  const helpRequests = [
    {
      id: 1,
      title: "Grocery Shopping Assistance",
      description: "Need help with weekly grocery shopping for elderly neighbor",
      zipcode: "10001",
      status: "Available",
      urgency: "Medium",
      category: "Shopping",
      postedBy: "Sarah Johnson",
      postedDate: "2 hours ago"
    },
    {
      id: 2,
      title: "Dog Walking Help",
      description: "Looking for someone to walk my dog twice a week while I recover from surgery",
      zipcode: "10001",
      status: "In Progress",
      urgency: "Low",
      category: "Pet Care",
      postedBy: "Mike Chen",
      postedDate: "5 hours ago"
    },
    {
      id: 3,
      title: "Math Tutoring for Middle Schooler",
      description: "Need help with algebra and geometry homework for my 13-year-old",
      zipcode: "10002",
      status: "Available",
      urgency: "High",
      category: "Education",
      postedBy: "Emily Davis",
      postedDate: "1 day ago"
    },
    {
      id: 4,
      title: "Furniture Moving",
      description: "Need help moving a couch and dining table to new apartment",
      zipcode: "10001",
      status: "Completed",
      urgency: "High",
      category: "Moving",
      postedBy: "Robert Wilson",
      postedDate: "3 days ago"
    },
    {
      id: 5,
      title: "Garden Maintenance",
      description: "Elderly homeowner needs help with basic garden upkeep and lawn mowing",
      zipcode: "10003",
      status: "Available",
      urgency: "Low",
      category: "Yard Work",
      postedBy: "Margaret Brown",
      postedDate: "1 week ago"
    },
    {
      id: 6,
      title: "Tech Support for Senior",
      description: "Help set up smartphone and teach basic apps usage",
      zipcode: "10002",
      status: "Available",
      urgency: "Medium",
      category: "Technology",
      postedBy: "James Miller",
      postedDate: "2 days ago"
    }
  ];

  const filteredRequests = helpRequests.filter(request => {
    const matchesZipcode = !searchZipcode || request.zipcode === searchZipcode;
    const matchesStatus = selectedStatus === "all" || request.status.toLowerCase().replace(" ", "-") === selectedStatus;
    return matchesZipcode && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Available": return "status-available";
      case "In Progress": return "status-in-progress";
      case "Completed": return "status-completed";
      default: return "";
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case "High": return "urgency-high";
      case "Medium": return "urgency-medium";
      case "Low": return "urgency-low";
      default: return "";
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Shopping": "🛒",
      "Pet Care": "🐕",
      "Education": "📚",
      "Moving": "📦",
      "Yard Work": "🌱",
      "Technology": "💻"
    };
    return icons[category] || "🤝";
  };

  return (
    <div className="community-aid-page">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-btn">
              <div className="site-logo-menu">🤝</div>
            </button>
            <div className="logo">
              <span className="logo-text">Community Aid</span>
            </div>
          </div>
          <button className="logout-btn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="filters-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Filter by zipcode..."
                className="search-input"
                value={searchZipcode}
                onChange={(e) => setSearchZipcode(e.target.value)}
              />
            </div>
          </div>
          
          <div className="status-filters">
            <button 
              className={`filter-btn ${selectedStatus === "all" ? "active" : ""}`}
              onClick={() => setSelectedStatus("all")}
            >
              All Requests
            </button>
            <button 
              className={`filter-btn ${selectedStatus === "available" ? "active" : ""}`}
              onClick={() => setSelectedStatus("available")}
            >
              Available
            </button>
            <button 
              className={`filter-btn ${selectedStatus === "in-progress" ? "active" : ""}`}
              onClick={() => setSelectedStatus("in-progress")}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${selectedStatus === "completed" ? "active" : ""}`}
              onClick={() => setSelectedStatus("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="paths-section">
          <h2 className="paths-title">Navigation</h2>
          <div className="paths-grid">
            <div className="path-card" onClick={() => navigate("/")}>
              <span className="path-icon">🏠</span>
              <span className="path-label">Login</span>
            </div>
            <div className="path-card" onClick={() => navigate("/create-account")}>
              <span className="path-icon">👤</span>
              <span className="path-label">Create Account</span>
            </div>
            <div className="path-card" onClick={() => navigate("/community-aid")}>
              <span className="path-icon">🤝</span>
              <span className="path-label">Community Aid</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{helpRequests.filter(r => r.status === "Available").length}</span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{helpRequests.filter(r => r.status === "In Progress").length}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{helpRequests.filter(r => r.status === "Completed").length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="help-requests-grid">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div key={request.id} className="help-request-card">
                <div className="card-header">
                  <div className="category-icon">
                    {getCategoryIcon(request.category)}
                  </div>
                  <div className="card-badges">
                    <span className={`urgency-badge ${getUrgencyClass(request.urgency)}`}>
                      {request.urgency}
                    </span>
                    <span className={`status-badge ${getStatusClass(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="request-title">{request.title}</h3>
                  <p className="request-description">{request.description}</p>
                </div>

                <div className="card-footer">
                  <div className="location-info">
                    <span className="location-icon">📍</span>
                    <span className="zipcode">{request.zipcode}</span>
                  </div>
                  <div className="meta-info">
                    <span className="category-tag">{request.category}</span>
                    <span className="posted-time">{request.postedDate}</span>
                  </div>
                </div>

                <div className="card-author">
                  <div className="author-avatar">
                    {request.postedBy.charAt(0)}
                  </div>
                  <span className="author-name">{request.postedBy}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No requests found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </main>

      <button className="fab" title="Create new help request">
        <span>+</span>
      </button>
    </div>
  );
};

export default CommunityAid;
