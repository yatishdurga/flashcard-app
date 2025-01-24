import React from 'react';
import './HeaderFooter.css'; // Import the necessary styles
import logo from '../HeaderFooter/download.png'; // Import the logo image

const Header = ({ darkMode, toggleDarkMode, isAuthenticated }) => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="DataScience Prep Logo" className="logo-image" />
        <h2>DataScience Prep</h2> {/* Placeholder logo text */}
      </div>

      {/* Header Actions Section */}
      <div className="header-actions">
        {!isAuthenticated && (
          <>
            <button className="auth-button login-button">Login</button>
            <button className="auth-button signup-button">Sign Up</button>
          </>
        )}

        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
