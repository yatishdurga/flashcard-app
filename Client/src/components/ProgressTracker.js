import React from 'react';

const ProgressTracker = ({ completed, total, isCompleted }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ margin: "20px 0" }}>
      <p className="completed-status">
  <span role="img" aria-label="completed">🎉</span> Completed! <span role="img" aria-label="celebration">🎉</span>
    </p>
      <div
        style={{
          width: "50%",
          background: "#ddd",
          height: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: isCompleted ? "gold" : "green", // Gold for completion
            height: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
