import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer, company, onViewDetails }) => {
  const [flipped, setFlipped] = useState(false);
  const [truncatedAnswer, setTruncatedAnswer] = useState("");

  // Reset flipped state when the question changes
  useEffect(() => {
    setFlipped(false);
  }, [question]);

  // Truncate the answer to 2-3 sentences
  useEffect(() => {
    const truncateText = (text) => {
      const sentences = text.split('.'); // Split by periods
      return sentences.slice(0, 2).join('.') + (sentences.length > 2 ? "..." : "");
    };
    setTruncatedAnswer(truncateText(answer));
  }, [answer]);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)} // Flip card on click
    >
      {/* Front side */}
      <div className="front">
        <div className="company-name">{company}</div> {/* Display company name */}
        <p>{question}</p>
      </div>

      {/* Back side */}
      <div className="back">
        <p>{truncatedAnswer}</p> {/* Show truncated answer */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent flipping when clicking the button
            onViewDetails(); // Open the modal for more details
          }}
          className="learn-more-button" // Optional class for styling
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
