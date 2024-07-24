import React from 'react';

const ResultPage = ({ score }) => {
  return (
    <div className="result-container">
      <h2>Your Score: {score}</h2>
    </div>
  );
};

export default ResultPage;
