import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer, company, onViewDetails }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [question]);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      aria-label={`Flashcard: ${question}`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <div className="front">
        <div className="company-name">{company || 'General'}</div>
        <p className="question-text">{question}</p>
      </div>
      <div className="back">
        <p className="answer-text">{answer}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="learn-more-button"
          aria-label="Learn more about this question"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
