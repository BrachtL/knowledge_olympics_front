import React from 'react';
import './Question.css';

function Question({ question, selectedOption, onOptionChange }) {
  return (
    <div className="question-container">
      <h2>Question {question.id}</h2>
      <p>{question.text}</p>
      <form>
        {question.options.map((option) => (
          <label key={option} className="option-label">
            <input
              type="radio"
              name={`question_${question.id}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </form>
    </div>
  );
}

export default Question;