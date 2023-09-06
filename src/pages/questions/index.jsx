import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import Question from '../../components/Question';
import { useResponse } from '../../contexts/responseContext'
import { getExamData, postExam, matchCookie } from '../../components/api';
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';
import Modal from '../../components/modal';
//todo: make the notification using modal when send exam

export function Questions() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('Student Name');
  const [classromm, setClassroom] = useState('classroom');
  const [numberId, setNumberId] = useState('numberId');
  const [school, setSchool] = useState('School Name');
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(-1);
  //const [examOptions, setExamOptions] = useState([]);
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
        setUserId(data.userId);
        //todo: I need media: an array with media objects:
        //type, //text, audio, image, none
        //if type == text -> text, title
        //if type == audio || image -> url
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array ensures the effect runs only on mount

  useEffect(() => {
    if (userId != -1) {

      matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token"));
      const intervalId = setInterval(
        () => matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token")),
        5000
      );
      console.log("start interval");
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  async function handleFinish() {
    // Once finished, provide user feedback

    /*
    setExamOptions(Object.keys(selectedOptions).map((id) => ({
      id: parseInt(id),
      option: selectedOptions[id]
    })));
    */
   let examOptions = Object.keys(selectedOptions).map((id) => ({
    id: parseInt(id),
    option: selectedOptions[id]
  }));

    console.log("Json sent: ", JSON.stringify(examOptions));

    try {

      const cookieMatchResponse = await matchCookie({userId: userId, type: "student"}, getCookie("jwt_token"));

      console.log("checkpoint 00014");

      const data = await postExam(getCookie("jwt_token"), examOptions);

      //todo: modify this code: I dont need this if
      //if it would have an error, it will be catch down below
      if (data.message == "success") {
        // Positive feedback to the user on successful save
        //setModalMessage("Prova enviada com sucesso!");
      } else {
        // Negative feedback to the user with the error message
        //setModalMessage(`Erro ao enviar a prova: ${data.message}`);
      }
    } catch (error) {
      //setModalMessage(`Erro ao enviar a prova: ${error.message}`);
      console.log("checkpoint 00015");
      console.log(error);
    }
    //setModalOpen(true);
  };
  

  const handleOptionChange = async (questionId, option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: option
    }));
    // TODO: save the selected options in the database

    let examOptions = [{
      id: questionId,
      option: option
    }]

    try {

      const cookieMatchResponse = await matchCookie({userId: userId, type: "student"}, getCookie("jwt_token"));

      console.log("checkpoint 00011");
      

      console.log("Json sent: ", JSON.stringify(examOptions));
      const data = await postExam(getCookie("jwt_token"), examOptions);

      //todo: modify this code: I dont need this if
      //if it would have an error, it will be catch down below
      if (data.message == "success") {
        // Positive feedback to the user on successful save
        //setModalMessage("Prova enviada com sucesso!");
      } else {
        //it will never be here, because API just send success message with
        //status code 200
        // Negative feedback to the user with the error message
        //setModalMessage(`Erro ao enviar a prova: ${data.message}`);
      }
      
    } catch (error) {
      console.log("checkpoint 00013");
      console.log(error);
      //setModalMessage(`Erro ao enviar a prova: ${error.message}`);

    }
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
        <div className="student-id-info fixed-header">{studentName}, {numberId}, {classromm}</div>
        <br/>
        <h1 className="questions-header-title">Bem vindo(a), {studentName}!<br /><br />1ª Olímpiada do Conhecimento</h1>
        <h2 className="questions-header-subtitle">Escola De Educação Básica Madre Benvenuta</h2>
        <p className="questions-header-description">
          Sistema de Luciano Bracht
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
            key={question.id}//.id
            question={question}
            selectedOption={selectedOptions[question.id]}//.id
            onOptionChange={(option) => handleOptionChange(question.id, option)}//.id
          />
        ))}
      </div>

      {questions.length > 0 && (
        <div className="questions-finish-button">
          <button type="button" onClick={handleFinish}>
            Entregar
          </button>
        </div>
      )}

      {score > 0 && <p>Your score: {score} out of {questions.length}</p>}
    </div>
  );
}