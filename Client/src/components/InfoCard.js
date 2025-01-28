import React from "react";
import "./InfoCard.css"; // Import the CSS styling

const InfoCard = () => {
  return (
    <div className="card-container">
      <div className="card-content">
        <h1 className="card-title">Making 'Data' learning exciting & fun</h1>
        <p className="card-description">
          Join our program to boost learning and collaboration in AI, Data Science, and more.
        </p>
        <button className="card-button">Explore Partnership →</button>
      </div>
      <div className="card-details">
        <div className="card-detail">
          <h2>Topics Covered</h2>
          <p></p>
        </div>
        <div className="card-detail">
          <h2>Active Learners</h2>
          <p></p>
        </div>
        <div className="card-detail">
          <h2>Average Hours</h2>
          <p></p>
        </div>
        <div className="card-detail">
          <h2>Support</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;