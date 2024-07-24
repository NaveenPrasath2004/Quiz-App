import React from 'react';

const Question = ({ question, questionIndex }) => {
  return (
    <div className="question-container">
      <div className="question">
        <p>{question.question}</p>
        {question.type === 'radio' && question.options.map((option, index) => (
          <label key={index} className="option-label">
            <input type="radio" name={`question${questionIndex}`} value={option} />
            {option}
          </label>
        ))}
        {question.type === 'checkbox' && question.options.map((option, index) => (
          <label key={index} className="option-label">
            <input type="checkbox" name={`question${questionIndex}`} value={option} />
            {option}
          </label>
        ))}
        {question.type === 'text' && (
          <input type="text" name={`question${questionIndex}`} className="text-input" />
        )}
        {question.type === 'dropdown' && (
          <select name={`question${questionIndex}`} className="dropdown-select">
            {question.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Question;
