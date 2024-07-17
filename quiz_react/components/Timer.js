// src/components/Timer.js
import React from 'react';

const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="timer">
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </div>
  );
};

export default Timer;
