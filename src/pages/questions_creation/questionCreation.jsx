import React, { useState } from 'react';
import "./styles.css";

const TeacherQuestionCreation = () => {
  const [teacherName, setTeacherName] = useState('Teacher Name');
  const [subject, setSubject] = useState('Subject');
  const [questions, setQuestions] = useState([
    {
      number: '1',
      question: 'Question title',
      wrongAlternatives: ['', '', '', ''],
      rightAlternative: '',
    },
    {
      number: '2',
      question: 'Question title',
      wrongAlternatives: ['', '', '', ''],
      rightAlternative: '',
    }
    // ... Repeat for 9 more questions
  ]);

  const handleSave = () => {
    // Implement the logic to save the questions
    // For example, you can send a request to your backend API
    // and provide the questions data to be saved
    // Once saved, you can provide user feedback or redirect them
    console.log("Questions saved:", questions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleWrongAlternativeChange = (index, subIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].wrongAlternatives[subIndex] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="teacher-question-container">
      <h2 className="header">{teacherName} - {subject}</h2>
      <div className="question-list">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <div className="question-number">Question {question.number}:</div>
            <input
              type="text"
              className="question-input"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              placeholder="Enter the question"
            />
            <div className="alternatives">
              {[1, 2, 3, 4].map(subIndex => (
                <div className="alternative" key={subIndex}>
                  <label className="alternative-label">Wrong alternative {subIndex}:</label>
                  <input
                    type="text"
                    className="alternative-input"
                    value={question.wrongAlternatives[subIndex - 1]}
                    onChange={(e) => handleWrongAlternativeChange(index, subIndex - 1, e.target.value)}
                    placeholder="Enter wrong alternative"
                  />
                </div>
              ))}
              <div className="alternative correct-alternative">
                <label className="alternative-label">Right alternative:</label>
                <input
                  type="text"
                  className="alternative-input"
                  value={question.rightAlternative}
                  onChange={(e) => handleQuestionChange(index, 'rightAlternative', e.target.value)}
                  placeholder="Enter correct alternative"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="save-button" onClick={handleSave}>
        SALVAR
      </button>
    </div>
  );
};

export default TeacherQuestionCreation;