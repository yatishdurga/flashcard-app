import React, { useState, useEffect } from 'react';
import TopicCard from './components/TopicCard'; // Component for displaying topics
import Header from './components/HeaderFooter/Header'; // Header component
import Footer from './components/HeaderFooter/Footer'; // Footer component
import FlashCard from './components/FlashCard'; // Flashcard component for questions
import ProgressTracker from './components/ProgressTracker'; // Tracks progress
import Modal from './components/Modal'; // Modal for additional details
import './App.css'; // CSS styling

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode
  const [currentTopic, setCurrentTopic] = useState(null); // State to track the current topic
  const [questions, setQuestions] = useState([]); // Questions fetched from the backend
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current question
  const [readQuestions, setReadQuestions] = useState([]); // List of questions marked as read
  const [achievements, setAchievements] = useState([]); // Topics completed
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState({}); // Content to display in the modal
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch questions from the backend API
  const fetchQuestions = async (topic) => {
    setLoading(true); // Show loading indicator
    setError(null); // Reset error state
    try {
      const response = await fetch(`http://localhost:5001/api/questions?topic=${topic}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data); // Update questions state
      setCurrentIndex(0); // Reset current index
      setReadQuestions([]); // Reset progress
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error state
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Mark a question as read and update achievements if all are read
  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);

      if (readQuestions.length + 1 === questions.length) {
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
    if (currentIndex < questions.length - 1) {
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
    setReadQuestions([]); // Clear read questions
    setAchievements(achievements.filter((ach) => ach !== currentTopic)); // Remove topic from achievements
  };

  // Return to topic selection screen
  const returnToTopicSelection = () => {
    setCurrentTopic(null); // Clear current topic
    setQuestions([]); // Clear questions
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
            {['Machine Learning', 'Deep Learning', 'LLM/Agents AI', 'Stats & Probability'].map(
              (topic) => (
                <TopicCard
                  key={topic}
                  topic={topic}
                  description={`Learn flashcards on ${topic}`}
                  onSelectTopic={(selectedTopic) => {
                    setCurrentTopic(selectedTopic); // Set the selected topic
                    fetchQuestions(selectedTopic); // Fetch questions for the topic
                  }}
                />
              )
            )}
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

        {loading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            {/* Progress tracker */}
            <ProgressTracker
              completed={readQuestions.length}
              total={questions.length}
              isCompleted={readQuestions.length === questions.length}
            />

            {/* Achievement banner */}
            {achievements.includes(currentTopic) && (
              <div className="achievement-banner">
                <span role="img" aria-label="celebration">🎉</span> Congratulations! You completed {currentTopic} and earned a badge! <span role="img" aria-label="celebration">🎉</span>
              </div>
            )}

            {/* Flashcard display */}
            {questions[currentIndex] ? (
              <>
                <FlashCard
                  question={questions[currentIndex].Question}
                  answer={questions[currentIndex].Answer}
                  company={questions[currentIndex].Company || 'General'}
                  onViewDetails={() => openModal(questions[currentIndex])}
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
                    disabled={currentIndex === questions.length - 1}
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
