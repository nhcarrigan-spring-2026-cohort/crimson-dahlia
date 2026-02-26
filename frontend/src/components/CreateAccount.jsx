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
          aria-hidden="true"
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
          <input type="text" placeholder="Username" name="username" id="username" required />
          <input type="email" placeholder="Email address" name="email" id="email"required />
          <input type="password" placeholder="Password" name="password" id="password" required />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required />

          <div className="buttons">
            <button type="submit">Sign Up</button>
            <button onClick={() => window.location.href = "/"} type="button">Already have an account? Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
