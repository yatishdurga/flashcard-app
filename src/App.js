import React, { useState } from 'react';
import { questionsData } from './data/questionsData';
import TopicCard from './components/TopicCard'; // Import TopicCard for topic selection
import Header from './components/HeaderFooter/Header'; // Import Header component
import Footer from './components/HeaderFooter/Footer'; // Import Footer component
import FlashCard from './components/FlashCard';
import SearchBar from './components/SearchBar';
import ProgressTracker from './components/ProgressTracker';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentTopic, setCurrentTopic] = useState(null); // Current topic state
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [readQuestions, setReadQuestions] = useState([]); // Read questions state
  const [achievements, setAchievements] = useState([]); // Achievements state
  const [isModalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [modalContent, setModalContent] = useState({}); // Modal content

  const questions = currentTopic ? questionsData[currentTopic] : []; // Fetch questions for selected topic
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter questions based on search term

  const currentQuestion = filteredQuestions[currentIndex]; // Get current question

  const toggleDarkMode = () => setDarkMode((prev) => !prev); // Toggle dark mode

  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);

      if (readQuestions.length + 1 === filteredQuestions.length) {
        setAchievements((prev) => [...prev, currentTopic]); // Update achievements
      }
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false); // Close modal

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

  const resetProgress = () => {
    setReadQuestions([]);
    setAchievements(achievements.filter((ach) => ach !== currentTopic));
  };

  // Handle return to topic selection
  const returnToTopicSelection = () => {
    setCurrentTopic(null); // Reset the current topic
    setCurrentIndex(0); // Reset the question index
    setReadQuestions([]); // Clear read questions
  };

  if (!currentTopic) {
    return (
      <div className={darkMode ? "app dark-mode" : "app"}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main style={{ padding: "20px" }}>
        <div class="goal-heading-container">
          <h1 class="goal-heading">Making 'Data' learning exciting & fun</h1>
        </div>
          <h1>Choose a Topic</h1>
          <div className="topic-selection">
              {Object.keys(questionsData).map((topic) => (
                <TopicCard
                  key={topic}
                  topic={topic}
                  description={`Learn flashcards on ${topic}`}
                  onSelectTopic={(selectedTopic) => {
                    setCurrentTopic(selectedTopic);
                    setCurrentIndex(0);
                    setReadQuestions([]); // Reset read questions for the new topic
                  }}
                />
              ))}
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main style={{ padding: "20px" }}>
        <button onClick={returnToTopicSelection} className="back-button">
          ← Back to Topics
        </button>
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
              company={currentQuestion.company}
              onViewDetails={() => openModal(currentQuestion)}
            />
            <div className="button-container">
              <button onClick={handleBack} disabled={currentIndex === 0}>
                Back
              </button>
              <button
                onClick={markAsRead}
                className={
                  readQuestions.includes(currentIndex)
                    ? "completed-button"
                    : "mark-read-button"
                }
                disabled={readQuestions.includes(currentIndex)}
              >
                {readQuestions.includes(currentIndex) ? "Completed" : "Mark as Read"}
              </button>
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
        <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
