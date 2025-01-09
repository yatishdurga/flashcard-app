import React, { useState, useEffect } from 'react';
import './FlashCard.css';

/**
 * FlashCard Component
 * @param {string} question - The question to display.
 * @param {string} answer - The answer to display.
 * @param {string} company - The company or category associated with the card.
 * @param {function} onViewDetails - Function to open detailed view or modal.
 */
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
      role="button"
      aria-label={`Flashcard: ${question}`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && setFlipped(!flipped)} // Allow keyboard flipping
    >
      {/* Front side */}
      <div className="front">
        <div className="company-name">
          {company || "General"} {/* Display company name or fallback */}
        </div>
        <p className="question-text">{question}</p> {/* Question text */}
      </div>

      {/* Back side */}
      <div className="back">
        <p className="answer-text">{truncatedAnswer}</p> {/* Show truncated answer */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent flipping when clicking the button
            onViewDetails(); // Open the modal for more details
          }}
          className="learn-more-button" // Optional class for styling
          aria-label="Learn more about this question"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
