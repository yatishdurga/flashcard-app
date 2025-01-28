import React, { useState, useEffect } from "react";
import "./SuccessStories.css";

const stories = [
  {
    name: "Marc Benioff",
    title: "Founder, chairman and CEO of Salesforce",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Tony Robbins and his strategies and tools have been at the core of our culture...",
  },
  {
    name: "Maria Menounos",
    title: "Actress & TV Host",
    image: "https://via.placeholder.com/100",
    testimonial:
      "I feel on top of the world. I feel incredible, I feel motivated, I feel empowered...",
  },
  {
    name: "Serena Williams",
    title: "American Professional Tennis Player",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Tony Robbins helped me discover what I am really made of...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla and SpaceX",
    image: "https://via.placeholder.com/100",
    testimonial:
      "Innovation and creativity drive our future. Tony Robbins' tools help us lead the way...",
  },
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === stories.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  
  return (
    <div className="success-stories-container">
      <h2>Success Stories</h2>
      <div className="carousel">
        <button className="arrow left" onClick={handlePrev}>
          &lt;
        </button>
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {stories.map((story, index) => (
            <div key={index} className="carousel-item">
              <img src={story.image} alt={story.name} />
              <h3>{story.name}</h3>
              <p className="title">{story.title}</p>
              <p className="testimonial">"{story.testimonial}"</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};


export default SuccessStories;