import React from 'react';
import './Question.css';


function Question({ question, selectedOption, onOptionChange }) {

  return (
    <div className="exam-container">
      {question.media_type == 'text' && question.isFirstMedia && (
        <div className="text-content">
          <h2>{question.media_name}</h2>
          <div dangerouslySetInnerHTML={{ __html: question.media_text }} />
          {console.log("checkpoint 00001")}
          {//TODO: I need x from the backend > questions page
          /*
          <br/>
          <h2>Answer the next x questions based on that media</h2>
          <br/>
          <br/>
          */
        }
        </div>
      )}

      {question.media_type == 'audio' && question.isFirstMedia && (
        <div className="audio-content">
          <h2>{question.media_name}</h2>
          <audio controls>
            <source src={question.media_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <br />
          {//TODO: I need x from the backend > questions page
          /*
          <br/>
          <h2>Answer the next x questions based on that media</h2>
          <br/>
          <br/>
          */
        }
        </div>
      )}

      {question.media_type == 'image' && question.isFirstMedia == true && (
        <div className="image-content">
          <h2>{question.media_name}</h2>
          <br />
          <img
            src={question.media_url}
            alt='A imagem não pôde ser carregada'
            style={{ maxWidth: '25%', height: 'auto' }}
          />
          <br />
          <br />
          {//TODO: I need x from the backend > questions page
          /*
          <br/>
          <h2>Answer the next x questions based on that media</h2>
          <br/>
          <br/>
          */
          }
        </div>
      )}

      {question.media_type == 'no' && question.isFirstMedia == true && (
        <div className="no-content">
          <br/>
          <h2>Die nächsten Fragen beziehen sich nicht auf Medien</h2>
          <br/>
          <br/>
          {//TODO: I need x from the backend > questions page
          /*
          <br/>
          <h2>Answer the next x questions based on no media</h2>
          <br/>
          <br/>
          */
        }
        </div>
      )}

      <div className="question-container">
        <h2>Question {question.number}</h2>
        <p>{question.questionText}</p>
        <form>
          {question.options.map((option) => (
            <label key={`${question.number}_${option}`} className="option-label">
              <input
                type="radio"
                name={`question_${question.number}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => onOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </form>
      </div>
    </div>
  );
}

export default Question;