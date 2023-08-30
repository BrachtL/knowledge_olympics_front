import React from 'react';
import './Question.css';

function Question({ question, selectedOption, onOptionChange }) {
  return (
    <div className="question-container">
      <h2>Question {question.number}</h2>
      <p>{question.questionText}</p>
      <form>
        {question.options.map((option) => (
          <label key={`${question.number}_${option}`} className="option-label">
            <input
              type="radio"
              name={`question_${question.number}`} //.id here
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