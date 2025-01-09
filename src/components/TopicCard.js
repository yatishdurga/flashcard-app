import React from 'react';
import './TopicCard.css';

/**
 * Component for displaying a topic card.
 * @param {string} topic - The topic name.
 * @param {string} description - A brief description of the topic.
 * @param {function} onSelectTopic - Callback function triggered when the topic is selected.
 */
const TopicCard = ({ topic, description, onSelectTopic }) => {
  return (
    <div 
      className="topic-card" 
      onClick={() => onSelectTopic(topic)} 
      role="button" 
      aria-label={`Select ${topic}`} 
      tabIndex={0} 
      onKeyPress={(e) => e.key === 'Enter' && onSelectTopic(topic)} // Keyboard accessibility
    >
      <h2>{topic}</h2>
      <p>{description}</p>
    </div>
  );
};

export default TopicCard;
