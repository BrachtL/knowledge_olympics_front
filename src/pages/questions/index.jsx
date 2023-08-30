import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import Question from '../../components/Question';
import { useResponse } from '../../contexts/responseContext'
import { getExamData } from '../../components/api';
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';

export function Questions() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('Student Name');
  const [classromm, setClassroom] = useState('classroom');
  const [numberId, setNumberId] = useState('numberId');
  const [school, setSchool] = useState('School Name');
  const [questions, setQuestions] = useState([]);
  //const { response } = useResponse(); //I think I wont be using it


  useEffect(() => {
    // Fetch data from backend API here and set the state accordingly
    getExamData(getCookie("jwt_token"))
      .then(data => {
        console.log("NAME HERE: ", data.studentName);
        setStudentName(data.studentName);
        setClassroom(data.classroom);
        setNumberId(data.numberId);
        setSchool(data.school);
        setQuestions(data.questionsArray); //todo: must have number, id, questionText, options
        //todo: I need media: an array with media objects:
        //type, //text, audio, image, none
        //if type == text -> text, title
        //if type == audio || image -> url
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array ensures the effect runs only on mount


  const handleOptionChange = (questionId, option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: option
    }));
    // TODO: save the selected options in the database
  };

  const calculateScore = () => {
    /*
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.options.indexOf(selectedOptions[index]) === question.correctAnswerIndex) {
        newScore += 1;
      }
    });
    setScore(newScore);
    */
  };

  return (
    <div className="questions-container">
      <header className="questions-header">
        <h1 className="questions-header-title">Bem vindo(a), {studentName}!<br /><br />1ª Olímpiada do Conhecimento</h1>
        <h2 className="questions-header-subtitle">Prefeitura Municipal de São João do Oeste</h2>
        <p className="questions-header-description">
          Secretaria de Educação - Secretaria de Cultura<br/><br/>Sistema de Luciano Bracht
        </p>
        <p className="questions-header-description">
          Apoio:
        </p>
        <div className="questions-entities-list">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="entity">
              Entidade {String.fromCharCode(65 + index)}
            </div>
          ))}
        </div>
      </header>

      <div className="questions-list">
        {questions.map((question) => (
          <Question
            key={question.number}//.id
            question={question}
            selectedOption={selectedOptions[question.number]}//.id
            onOptionChange={(option) => handleOptionChange(question.number, option)}//.id
          />
        ))}
      </div>

      {questions.length > 0 && (
        <div className="questions-calculate-button">
          <button type="button" onClick={calculateScore}>
            Entregar
          </button>
        </div>
      )}

      {score > 0 && <p>Your score: {score} out of {questions.length}</p>}
    </div>
  );
}