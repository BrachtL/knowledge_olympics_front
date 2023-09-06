
import React, { useState, useRef, useEffect } from 'react';
import "./styles.css";
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';
import { getTeacherQuestionsData, postTeacherQuestionsData, matchCookie } from '../../components/api';
import Modal from '../../components/modal';

const TeacherQuestionCreation = () => {
  //console.log("token from cookie: ", getCookie("jwt_token"));
  const [teacherName, setTeacherName] = useState('Teacher Name');
  const [subject, setSubject] = useState('Subject');
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    // Fetch data from backend API here and set the state accordingly
    getTeacherQuestionsData(sessionStorage.getItem('jwt_token'))
    //getTeacherQuestionsData(getCookie("jwt_token"))
      .then(data => {
        console.log("NAME HERE: ", data.teacherName);
        setTeacherName(data.teacherName);
        setSubject(data.subject);
        setQuestions(data.questionsArray);
        setUserId(data.userId);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array ensures the effect runs only on mount

  useEffect(() => {
    if (userId != -1) {

      matchCookie({ userId: userId, type: "teacher" }, sessionStorage.getItem('jwt_token'));
      //matchCookie({ userId: userId, type: "teacher" }, getCookie("jwt_token"));
      const intervalId = setInterval(
        () => matchCookie({ userId: userId, type: "teacher" }, sessionStorage.getItem('jwt_token')),
        //() => matchCookie({ userId: userId, type: "teacher" }, getCookie("jwt_token")),
        5000
      );
      console.log("start interval");
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  async function handleSave() {
    // Once saved, provide user feedback
    console.log("Questions saved:", questions);
    console.log("Json sent: ", JSON.stringify(modifiedContent));

    try {
      
      const cookieMatchResponse = await matchCookie({userId: userId, type: "teacher"}, sessionStorage.getItem('jwt_token'));
      //const cookieMatchResponse = await matchCookie({userId: userId, type: "teacher"}, getCookie("jwt_token"));

      const data = await postTeacherQuestionsData(sessionStorage.getItem('jwt_token'), questions);
      //const data = await postTeacherQuestionsData(getCookie("jwt_token"), questions);

      if (data.message == "success") {
        // Positive feedback to the user on successful save
        setModalMessage("Conteúdo salvo com sucesso!");
      } else {
        // Negative feedback to the user with the error message
        setModalMessage(`Error saving questions: ${data.message}`);
      }
    } catch (error) {
      setModalMessage(`Error saving questions: ${error.message}`);
    }

    setModalOpen(true);
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

  const handleMediaTypeChange = (index, media_type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].media_type = media_type;
    setQuestions(updatedQuestions);
  };

  const handleMediaFileNameChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].media_name = value;
    setQuestions(updatedQuestions);
  };

  const handleMediaSourceChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].media_source = value;
    setQuestions(newQuestions);
  };

  const [questionHeights, setQuestionHeights] = useState([]);
  const [alternativeHeights, setAlternativeHeights] = useState([]);
  const [modifiedContent, setModifiedContent] = useState([]);

  useEffect(() => {
    setModifiedContent([...questions]);
  }, [questions]);

  const handleTextareaChange = (index, field, value) => {
    const newModifiedContent = [...modifiedContent];
    newModifiedContent[index][field] = value;
    setModifiedContent(newModifiedContent);
  };

  const handleQuestionTextareaResize = (index, height) => {
    const newQuestionHeights = [...questionHeights];
    newQuestionHeights[index] = height;
    setQuestionHeights(newQuestionHeights);
  };

  const handleAlternativeTextareaResize = (index, field, height) => {
    const newAlternativeHeights = [...alternativeHeights];
    if (!newAlternativeHeights[index]) {
      newAlternativeHeights[index] = {};
    }
    newAlternativeHeights[index][field] = height;
    setAlternativeHeights(newAlternativeHeights);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    //todo: send the cookie to API to save in blacklist 
    sessionStorage.removeItem('jwt_token');
    //deleteCookie("jwt_token");
    window.location.href = '/teacher';
  };

  return (
    <div className="teacher-question-container">
      <div className="header-container">
        <h2 className="header">{teacherName} - {subject}</h2>
        <button className="logout-button-top" onClick={handleLogout}>
          SAIR
        </button>
      </div>
      <div className="question-list">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <div className="question-number">Questão {question.number}</div>
            <div className="media-type-group">
              <label className="media-type-label">Esta questão está relacionada a algum arquivo de mídia?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="audio"
                    checked={question.media_type === 'audio'}
                    onChange={() => handleMediaTypeChange(index, 'audio')}
                    className="media-type-radio"
                  />
                  Áudio
                </label> &nbsp; &nbsp;
                <label>
                  <input
                    type="radio"
                    value="text"
                    checked={question.media_type === 'text'}
                    onChange={() => handleMediaTypeChange(index, 'text')}
                    className="media-type-radio"
                  />
                  Texto
                </label> &nbsp; &nbsp;
                <label>
                  <input
                    type="radio"
                    value="image"
                    checked={question.media_type === 'image'}
                    onChange={() => handleMediaTypeChange(index, 'image')}
                    className="media-type-radio"
                  />
                  Imagem
                </label> &nbsp; &nbsp;
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={question.media_type === 'no'}
                    onChange={() => handleMediaTypeChange(index, 'no')}
                    className="media-type-radio"
                  />
                  Não
                </label>
              </div>
            </div>
            <div className="media-file-name">
              <input
                type="text"
                className="media-file-input"
                value={question.media_name}
                onChange={(event) => handleMediaFileNameChange(index, event.target.value)}
                placeholder="Nome da mídia"
              />
            </div>
            <div className="media-source">
              <input
                type="text"
                className="media-source-input"
                value={question.media_source}
                onChange={(event) => handleMediaSourceChange(index, event.target.value)}
                placeholder="Fonte (url, livro...)"
              />
            </div>
            <div className="question-textarea">
              <label className="alternative-label">Questão: </label>
              <textarea
                className="question-textarea-input"
                value={question.question}
                onChange={(event) => handleTextareaChange(index, 'question', event.target.value)}
                placeholder="Pergunta"
                rows="1"
                style={{ height: `${Math.max(30, questionHeights[index] || 30)}px` }}
                onInput={(e) => handleQuestionTextareaResize(index, e.target.scrollHeight)}
              />
            </div>
            <div className="alternatives">
              {['correct_answer', 'wrong_answer_1', 'wrong_answer_2', 'wrong_answer_3', 'wrong_answer_4'].map((field, subIndex) => (
                <div className="alternative" key={subIndex}>
                  <label className="alternative-label">
                    {subIndex === 0 ? 'Alternativa Correta:' : `Alternativa Errada ${subIndex}:`}
                  </label>
                  <textarea
                    className="alternative-textarea-input"
                    value={question[field]}
                    onChange={(event) => handleTextareaChange(index, field, event.target.value)}
                    placeholder={`Alternativa ${subIndex === 0 ? 'correta' : 'errada'}`}
                    rows="1"
                    style={{ height: `${Math.max(30, alternativeHeights[index]?.[field] || 30)}px` }}
                    onInput={(e) => handleAlternativeTextareaResize(index, field, e.target.scrollHeight)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
      <button className="logout-button-bot" onClick={handleLogout}>
        SAIR
      </button>
      <button className="save-button" onClick={handleSave}>
        SALVAR
      </button>
    </div>

      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default TeacherQuestionCreation;







/*
import React, { useState } from 'react';
import "./styles.css";
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';

const TeacherQuestionCreation = () => {
  console.log("token from cookie: ", getCookie("jwt_token"));
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
*/