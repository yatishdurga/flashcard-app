import React from 'react';
import './HeaderFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:your-email@example.com" aria-label="Gmail">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>© {new Date().getFullYear()} Flashcard App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
