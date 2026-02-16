import "./CreateAccount.css";
import heroImg from "../assets/image/heroImg.webp";
import logo from "../assets/icons/logo.svg";

function CreateAccount() {
  return (
    <div className="container">
      <div className="left-section">
        <img
          src={heroImg}
          alt="Community of people helping each others."
          id="hero--img"
        />

        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Community Aid</span>
        </div>

        <div className="caption">
          <h1>Help your neighbors, build your community.</h1>
        </div>
      </div>

      <div className="right-section">
        <h2>Create an account</h2>

        <form className="create-account-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <div className="buttons">
            <button type="submit">Sign Up</button>
            <button type="button">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
