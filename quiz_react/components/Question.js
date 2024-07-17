// src/components/Question.js
import React from 'react';

const Question = ({ currentPage, questions, answers }) => {
  const start = currentPage * 5;
  const currentQuestions = questions.slice(start, start + 5);

  return (
    <div>
      {currentQuestions.map((q, index) => (
        <div key={index} className="question">
          <p>
            <span className="question-number">{start + index + 1}.</span>
            {q.question}
          </p>
          {q.type === 'radio' && q.options.map(option => (
            <label key={option}>
              <input
                type="radio"
                name={`question${start + index}`}
                value={option}
                defaultChecked={answers[start + index] === option}
              />
              {option}
            </label>
          ))}
          {q.type === 'checkbox' && q.options.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                name={`question${start + index}`}
                value={option}
                defaultChecked={answers[start + index] && answers[start + index].includes(option)}
              />
              {option}
            </label>
          ))}
          {q.type === 'text' && (
            <input
              type="text"
              name={`question${start + index}`}
              defaultValue={answers[start + index] || ''}
            />
          )}
          {q.type === 'dropdown' && (
            <select
              name={`question${start + index}`}
              defaultValue={answers[start + index] || ''}
            >
              {q.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default Question;
