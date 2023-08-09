import './styles.css';
import React, { useState } from 'react';
import Question from '../../components/Question';
import questionsMock from '../../questionsMock'; // Make sure to adjust the import path

export function Questions() {
  const [selectedOptions, setSelectedOptions] = useState(new Array(questionsMock.length).fill(''));
  const [score, setScore] = useState(0);

  const handleOptionChange = (index, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);
    // TODO: save the selected options in the database
  };

  const calculateScore = () => {
    let newScore = 0;
    questionsMock.forEach((question, index) => {
      if (question.options.indexOf(selectedOptions[index]) === question.correctAnswerIndex) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">1ª Olímpiada do Conhecimento</h1>
        <h2 className="header-subtitle">Prefeitura Municipal de São João do Oeste</h2>
        <p className="header-description">
          Secretaria de Educação - Secretaria de Cultura<br/><br/>Sistema de Luciano Bracht
        </p>
        <p className="header-description">
          Apoio:
        </p>
        <div className="entities-list">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="entity">
              Entidade {String.fromCharCode(65 + index)}
            </div>
          ))}
        </div>
      </header>

      <div className="questions-list">
        {questionsMock.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            selectedOption={selectedOptions[index]}
            onOptionChange={(option) => handleOptionChange(index, option)}
          />
        ))}
      </div>

      {questionsMock.length > 0 && (
        <div className="calculate-button">
          <button type="button" onClick={calculateScore}>
            Entregar
          </button>
        </div>
      )}

      {score > 0 && <p>Your score: {score} out of {questionsMock.length}</p>}
    </div>
  );
}