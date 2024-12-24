import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer, isRead, onViewDetails }) => {
  const [flipped, setFlipped] = useState(false);

  // Reset flipped state when question changes
  useEffect(() => {
    setFlipped(false);
  }, [question]);

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''} ${isRead ? 'read' : ''}`}>
      {/* Front side */}
      <div className="front" onClick={() => setFlipped(!flipped)}>
        {question}
      </div>

      {/* Back side */}
      <div className="back" onClick={() => setFlipped(!flipped)}>
        {answer}
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent flipping when clicking the button
          onViewDetails();
        }}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
