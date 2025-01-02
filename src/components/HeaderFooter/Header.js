import React from 'react';
import './HeaderFooter.css'; // Import any necessary styles

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <h2>DataScience Prep</h2> {/* Placeholder logo text */}
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="header-actions">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? " 🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
