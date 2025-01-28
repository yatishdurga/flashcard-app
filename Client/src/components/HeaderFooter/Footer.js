import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HeaderFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a 
          href="https://www.linkedin.com/in/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a 
          href="https://www.instagram.com/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a 
          href="https://www.youtube.com/channel/yourchannel" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="YouTube"
        >
          <i className="fab fa-youtube"></i>
        </a>
      </div>
      <p>© {new Date().getFullYear()} Flashcard App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;