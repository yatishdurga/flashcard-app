import React, { useState } from 'react';
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

  const fetchQuestions = async (topic) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3002/questions/${topic}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      const formattedQuestions = data.map((item) => ({
        question: item.Question.S,
        answer: item.Answer.S,
        topicName: item.TopicName.S,
        questionId: item.QuestionID.S,
      }));
      setQuestions(formattedQuestions);
      setCurrentIndex(0);
      setReadQuestions([]);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const markAsRead = () => {
    if (!readQuestions.includes(currentIndex)) {
      setReadQuestions((prev) => [...prev, currentIndex]);
      if (readQuestions.length + 1 === questions.length) {
        setAchievements((prev) => [...prev, currentTopic]);
      }
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
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

  const returnToTopicSelection = () => {
    setCurrentTopic(null);
    setQuestions([]);
    setCurrentIndex(0);
    setReadQuestions([]);
  };

  if (!currentTopic) {
    return (
      <div className={darkMode ? 'app dark-mode' : 'app'}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main style={{ padding: '20px' }}>
          <div className="goal-heading-container">
            <h1 className="goal-heading">Making 'Data' learning exciting & fun</h1>
          </div>
          <h1>Choose a Topic</h1>
          <div className="topic-selection">
            {['Machine Learning', 'Deep Learning', 'LLM/Agents AI', 'Stats & Probability'].map(
              (topic) => (
                <TopicCard
                  key={topic}
                  topic={topic}
                  description={`Learn flashcards on ${topic}`}
                  onSelectTopic={(selectedTopic) => {
                    setCurrentTopic(selectedTopic);
                    fetchQuestions(selectedTopic);
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

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main style={{ padding: '20px' }}>
        <button onClick={returnToTopicSelection} className="back-button">
          ← Back to Topics
        </button>
        {loading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <ProgressTracker
              completed={readQuestions.length}
              total={questions.length}
              isCompleted={readQuestions.length === questions.length}
            />
            {achievements.includes(currentTopic) && (
              <div className="achievement-banner">
                <span role="img" aria-label="celebration">🎉</span> Congratulations! You completed {currentTopic} and earned a badge! <span role="img" aria-label="celebration">🎉</span>
              </div>
            )}
            {questions[currentIndex] ? (
              <>
                <FlashCard
                  question={questions[currentIndex].question}
                  answer={questions[currentIndex].answer}
                  company="General"
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
            <button onClick={resetProgress} className="reset-button">
              Reset Progress
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
