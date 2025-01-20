import React from "react";
import image from "./download.png"; // Ensure the image path is correct
import "./HeaderFooter.css"; // Ensure the CSS file exists and is updated

const Header = ({ darkMode, toggleDarkMode, signOut, signOutRedirect }) => {
  return (
    <header className="header">
      {/* Left Section: Logo and Website Name */}
      <div className="header-left">
        <img
          src={image} // Use the imported image variable
          alt="Logo"
          className="header-logo"
        />
        <h1 className="website-name">Data Science Prep</h1>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="header-right">
        <button
          onClick={toggleDarkMode}
          className={`action-btn ${darkMode ? "dark-mode" : "light-mode"}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={signOut} className="action-btn signout-btn">
          Sign Out
        </button>
        <button
          onClick={signOutRedirect}
          className="action-btn signout-redirect-btn"
        >
          Sign Out (Redirect)
        </button>
      </div>
    </header>
  );
};

export default Header;
