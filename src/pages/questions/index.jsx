import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import Question from '../../components/Question';
import { useResponse } from '../../contexts/responseContext'
import { getExamData, postExam, matchCookie, postFinish } from '../../components/api';
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
  const [previousMarkedOptions, setPreviousMarkedOptions] = useState(-1);
  //const [isFinished, setIsFinished] = useState()
  //const [examOptions, setExamOptions] = useState([]);
  //const { response } = useResponse(); //I think I wont be using it


  useEffect(() => {
    // Fetch data from backend API here and set the state accordingly
    //getExamData(sessionStorage.getItem('jwt_token'))
    getExamData(getCookie("jwt_token"))
      .then(data => {
        console.log("NAME HERE: ", data.studentName);
        setStudentName(data.studentName);
        setClassroom(data.classroom);
        setNumberId(data.numberId);
        setSchool(data.school);
        setQuestions(data.questionsArray);
        setUserId(data.userId);
        setPreviousMarkedOptions(data.previousMarkedOptions);
        //media: an array with media objects:
        //type, //text, audio, image, none
        //if type == text -> text, title
        //if type == audio || image -> url
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        //todo: erase cookie and show modal saying something related to isFinished       
        //redirect when click on ok button
      
      });
  }, []); // The empty array ensures the effect runs only on mount

  useEffect(() => {
    if (userId != -1) {

      //matchCookie({ userId: userId, type: "student" }, sessionStorage.getItem('jwt_token'));
      matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token"));
      const intervalId = setInterval(
        //() => matchCookie({ userId: userId, type: "student" }, sessionStorage.getItem('jwt_token')),
        () => matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token")),
        5000
      );
      console.log("start interval");

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  useEffect(() => {
    if (previousMarkedOptions != -1) {

      console.log(previousMarkedOptions);

    }
  }, [previousMarkedOptions]);

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

      //const cookieMatchResponse = await matchCookie({userId: userId, type: "student"}, sessionStorage.getItem('jwt_token'));
      const cookieMatchResponse = await matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token"));

      console.log("checkpoint 00014");

      //todo: show loading here and block the button

      //const data = await postExam(sessionStorage.getItem('jwt_token'), examOptions);
      const data = await postExam(getCookie("jwt_token"), examOptions);

      //todo: modify this code: I dont need this if
      //if it would have an error, it will be catch down below
      if (data.message == "success") {
        const finished = await postFinish(getCookie("jwt_token"));
        deleteCookie("jwt_token");
        //todo: show modal
        getCookie("jwt_token");

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

    let examOptions = [{
      id: questionId,
      option: option
    }]

    try {

      //const cookieMatchResponse = await matchCookie({userId: userId, type: "student"}, sessionStorage.getItem('jwt_token'));
      const cookieMatchResponse = await matchCookie({ userId: userId, type: "student" }, getCookie("jwt_token"));

      console.log("checkpoint 00011");


      console.log("Json sent: ", JSON.stringify(examOptions));
      //const data = await postExam(sessionStorage.getItem('jwt_token'), examOptions);
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
        <h1 className="questions-header-title">Bem vindo(a), {studentName}!<br /><br />1ª Olímpiada da Língua Alemã</h1>
        <h2 className="questions-header-subtitle">Escola De Educação Básica Madre Benvenuta</h2>
        <p className="questions-header-description">
          Sistema de Luciano Bracht
        </p>
        <br/>
      </header>

      <div className="questions-list">
        {questions.map((question) => (
          <Question
            key={question.id}//.id
            question={question}
            selectedOption={selectedOptions[question.id] || previousMarkedOptions[question.id] || ''}
            onOptionChange={(option) => handleOptionChange(question.id, option)}//.id
          />
        ))}
      </div>

      {questions.length > 0 && (
        <div className="questions-finish-button-container">
          <button className="questions-finish-button" onClick={handleFinish}>
            Entregar
          </button>
        </div>
      )}

      {score > 0 && <p>Your score: {score} out of {questions.length}</p>}
    </div>
  );
}

/*

      <header className="questions-header">
        <div className="fixed-header">
          {studentName}, {numberId}, {classromm}
        </div>
        <div className="questions-header-content">
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
        </div>
      </header>

*/