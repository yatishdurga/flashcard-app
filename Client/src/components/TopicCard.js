import React from 'react';
import './TopicCard.css';

const TopicCard = ({ topic, description, onSelectTopic }) => {
  return (
    <div className="topic-card" onClick={() => onSelectTopic(topic)}>
      <h2>{topic}</h2>
      <p>{description}</p>
    </div>
  );
};

export default TopicCard;
