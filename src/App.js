import React, { useState } from 'react';
import { questionsData } from './data/questionsData';
import Header from './components/HeaderFooter/Header'; // Import Header component
import Footer from './components/HeaderFooter/Footer'; // Import Footer component
import FlashCard from './components/FlashCard';
import SearchBar from './components/SearchBar';
import ProgressTracker from './components/ProgressTracker';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  // State to track Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // State to manage search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to track the current topic
  const [currentTopic, setCurrentTopic] = useState("Machine Learning");

  // State to track the current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track which questions have been marked as read
  const [readQuestions, setReadQuestions] = useState([]);

  // State to track achievements
  const [achievements, setAchievements] = useState([]);

  // State to manage modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State to manage the content displayed in the modal
  const [modalContent, setModalContent] = useState({});

  // Fetch questions for the current topic
  const questions = questionsData[currentTopic] || [];

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current question based on the index
  const currentQuestion = filteredQuestions[currentIndex];

  // Function to toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Function to mark a question as read
  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);

      // Check if all questions are marked as read
      if (readQuestions.length + 1 === filteredQuestions.length) {
        setAchievements((prev) => [...prev, currentTopic]);
      }
    }
  };

  // Function to open the modal with content
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to move to the next question
  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Function to move to the previous question
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Function to reset progress and achievements for the current topic
  const resetProgress = () => {
    setReadQuestions([]);
    setAchievements(achievements.filter((ach) => ach !== currentTopic));
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      {/* Header Component with Dark Mode toggle */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main style={{ padding: "20px" }}>
        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Topic Selector */}
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

        {/* Progress Tracker */}
        <ProgressTracker
          completed={readQuestions.length}
          total={filteredQuestions.length}
          isCompleted={readQuestions.length === filteredQuestions.length}
        />

        {/* Achievements Banner */}
        {achievements.includes(currentTopic) && (
          <div className="achievement-banner">
            🎉 Congratulations! You completed {currentTopic} and earned a badge! 🎉
          </div>
        )}

        {/* FlashCard Display */}
        {currentQuestion ? (
          <>
            <FlashCard
              question={currentQuestion.question}
              answer={currentQuestion.answer}
              company={currentQuestion.company} // Pass the company field
              onViewDetails={() => openModal(currentQuestion)}
            />
            <div className="button-container">
              {/* Back Button */}
              <button onClick={handleBack} disabled={currentIndex === 0}>
                Back
              </button>
              {/* Mark as Read Button */}
              <button
                onClick={markAsRead}
                className={
                  readQuestions.includes(currentIndex) ? "completed-button" : "mark-read-button"
                }
                disabled={readQuestions.includes(currentIndex)}
              >
                {readQuestions.includes(currentIndex) ? "Completed" : "Mark as Read"}
              </button>
              {/* Next Button */}
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

        {/* Reset Progress Button */}
        <button onClick={resetProgress} className="reset-button">
          Reset Progress
        </button>

        {/* Modal Component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;
