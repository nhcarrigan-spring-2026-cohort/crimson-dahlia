import React from "react";

const HelpRequest = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Request Help</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.group}>
          <label>Title</label>
          <input type="text" placeholder="Enter request title" />
        </div>

        <div style={styles.group}>
          <label>Description</label>
          <textarea placeholder="Describe your request"></textarea>
        </div>

        <div style={styles.group}>
          <label>Zip Code</label>
          <input type="text" placeholder="Enter zip code" />
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submit}>
            Submit
          </button>

          <button type="button" style={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#B11226",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  group: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  submit: {
    backgroundColor: "#B11226",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancel: {
    backgroundColor: "#ccc",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default HelpRequest;