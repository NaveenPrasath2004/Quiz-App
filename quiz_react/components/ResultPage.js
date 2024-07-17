// src/components/ResultPage.js
import React from 'react';

const ResultPage = ({ score }) => {
  return (
    <div id="results-container">
      <h1>Quiz Results</h1>
      <p id="score">Your score is: {score}</p>
    </div>
  );
};

export default ResultPage;
