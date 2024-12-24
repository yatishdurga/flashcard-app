import React, { useState } from 'react';
import { questionsData } from './data/questionsData';
import FlashCard from './components/FlashCard';
import SearchBar from './components/SearchBar';
import ProgressTracker from './components/ProgressTracker';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTopic, setCurrentTopic] = useState("Machine Learning");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readQuestions, setReadQuestions] = useState([]); // Track read questions
  const [achievements, setAchievements] = useState([]); // Track earned achievements
  const [isModalOpen, setModalOpen] = useState(false); // Manage modal state
  const [modalContent, setModalContent] = useState({}); // Content for the modal

  const questions = questionsData[currentTopic] || [];
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentQuestion = filteredQuestions[currentIndex];

  // Mark the current question as read
  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);

      // Check if all questions are marked as read
      if (readQuestions.length + 1 === filteredQuestions.length) {
        setAchievements((prev) => [...prev, currentTopic]); // Add topic to achievements
      }
    }
  };

  // Open the modal with detailed content
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset progress and achievements for the current topic
  const resetProgress = () => {
    setReadQuestions([]);
    setAchievements(achievements.filter((ach) => ach !== currentTopic)); // Remove achievement
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flashcards for Data Science</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <select
        value={currentTopic}
        onChange={(e) => {
          setCurrentTopic(e.target.value);
          setCurrentIndex(0);
          setReadQuestions([]); // Reset read questions when switching topics
        }}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        {Object.keys(questionsData).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <ProgressTracker
        completed={readQuestions.length}
        total={filteredQuestions.length}
        isCompleted={readQuestions.length === filteredQuestions.length}
      />
      {achievements.includes(currentTopic) && (
        <div className="achievement-banner">
          🎉 Congratulations! You completed {currentTopic} and earned a badge! 🎉
        </div>
      )}
      {currentQuestion ? (
        <>
          <FlashCard
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            isRead={readQuestions.includes(currentIndex)} // Pass if the question is read
            onViewDetails={() => openModal(currentQuestion)} // Pass content to modal
          />
          <div className="button-container">
            <button onClick={handleBack} disabled={currentIndex === 0}>
              Back
            </button>
            <button onClick={markAsRead}>Mark as Read</button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredQuestions.length - 1}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No questions found</p>
      )}
      <button onClick={resetProgress} className="reset-button">
        Reset Progress
      </button>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default App;
