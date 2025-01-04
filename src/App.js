import React, { useState } from 'react';
import { questionsData } from './data/questionsData';
import TopicCard from './components/TopicCard'; // Component for displaying topics
import Header from './components/HeaderFooter/Header'; // Header component
import Footer from './components/HeaderFooter/Footer'; // Footer component
import FlashCard from './components/FlashCard'; // Flashcard component for questions
import ProgressTracker from './components/ProgressTracker'; // Tracks progress
import Modal from './components/Modal'; // Modal for additional details
import './App.css'; // CSS styling

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode
  const [searchTerm, setSearchTerm] = useState(""); // State to track search term
  const [currentTopic, setCurrentTopic] = useState(null); // State to track the current topic
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current question
  const [readQuestions, setReadQuestions] = useState([]); // List of questions marked as read
  const [achievements, setAchievements] = useState([]); // Topics completed
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState({}); // Content to display in the modal

  // Get questions for the selected topic or an empty array if no topic is selected
  const questions = currentTopic ? questionsData[currentTopic] : [];

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Current question to display
  const currentQuestion = filteredQuestions[currentIndex];

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Mark a question as read and update achievements if all are read
  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);

      if (readQuestions.length + 1 === filteredQuestions.length) {
        setAchievements((prev) => [...prev, currentTopic]); // Add topic to achievements
      }
    }
  };

  // Open the modal with content
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => setModalOpen(false);

  // Navigate to the next question
  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Navigate to the previous question
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset progress for the current topic
  const resetProgress = () => {
    setReadQuestions([]);
    setAchievements(achievements.filter((ach) => ach !== currentTopic));
  };

  // Return to topic selection screen
  const returnToTopicSelection = () => {
    setCurrentTopic(null); // Clear the current topic
    setCurrentIndex(0); // Reset question index
    setReadQuestions([]); // Clear read questions
  };

  // Render topic selection screen if no topic is selected
  if (!currentTopic) {
    return (
      <div className={darkMode ? 'app dark-mode' : 'app'}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main style={{ padding: '20px' }}>
          {/* Motivational heading */}
          <div className="goal-heading-container">
            <h1 className="goal-heading">Making 'Data' learning exciting & fun</h1>
          </div>

          {/* Topic selection section */}
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

  // Render flashcards for the selected topic
  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main style={{ padding: '20px' }}>
        {/* Back button to return to topic selection */}
        <button onClick={returnToTopicSelection} className="back-button">
          ← Back to Topics
        </button>

        {/* Progress tracker */}
        <ProgressTracker
          completed={readQuestions.length}
          total={filteredQuestions.length}
          isCompleted={readQuestions.length === filteredQuestions.length}
        />

        {/* Achievement banner */}
        {achievements.includes(currentTopic) && (
          <div className="achievement-banner">
            🎉 Congratulations! You completed {currentTopic} and earned a badge! 🎉
          </div>
        )}

        {/* Flashcard display */}
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
                    ? 'completed-button'
                    : 'mark-read-button'
                }
                disabled={readQuestions.includes(currentIndex)}
              >
                {readQuestions.includes(currentIndex) ? 'Completed' : 'Mark as Read'}
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

        {/* Reset progress button */}
        <button onClick={resetProgress} className="reset-button">
          Reset Progress
        </button>

        {/* Modal component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
