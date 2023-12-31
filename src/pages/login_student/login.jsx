import React, { useState } from 'react';
import "./login_student.css"
import { login } from '../../components/api';
import { useNavigate } from 'react-router-dom';
import { useResponse } from '../../contexts/responseContext'
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';

const StudentLogin = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [numberId, setNumberId] = useState('');
  const [classroom, setClassroom] = useState('');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();
  const { updateResponse } = useResponse();

  const handleLogin = async (e) => {
    e.preventDefault();

    //if(sessionStorage.getItem('jwt_token')) {
    if(getCookie('jwt_token')) {
      console.log("Já tem cookie");
      setError('Já há um usuário conectado');
      //todo: show in a modal the message "Não foi possível realizar o login,
      //pois já há um usuário conectado. Clique ok para redirecionar."
    } else {
      try {
        setError('');

        if(name.length < 3) {
          setError('O nome deve conter ao menos 3 caracteres');
          return;
        }

        if(password.length  < 3) {
          setError('A senha deve conter ao menos 3 caracteres');
          return;
        }
        
        if(password != passwordConfirm) {
          setError('A senha e a confirmação de senha devem ser iguais');
          return;
        }

        if(numberId == '' || numberId <= 0) {
          setError('Número de ID do aluno digitado é inválido');
          return;
        }

        if(classroom == '') {
          setError('Por favor, digite a turma');
          return;
        }

        if(code == '') {
          setError('Por favor, digite um código identificador');
          return;
        }
  
        const data = { name,
          birthdate,
          numberId,
          classroom,
          school,
          type: "student",
          code,
          logTo: "exam",
          password
        };
        const token = await login(data);
  
        // Handle the response from the server
        //if (response.success) {
  
          //sessionStorage.setItem('jwt_token', token);
          setCookie('jwt_token', token, 7); // Store the token for 7 days
  
  
          navigate('/questions');
  
          // Redirect user to dashboard or another page if successful
          // For example, you can use React Router for navigation
        //} else {
        //  setError('Something went wrong. Please try again.');
        //}
  
        // Redirect user to dashboard or another page if successful
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    }
  };

 

  return (
    <div className="login-student-body">
      <div className="login-student-form">
        <h2>Olimpíada do Conhecimento <br /><br />Aluno</h2>
        <form onSubmit={handleLogin}>
          <div className="login-student-input">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login-student-input">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-student-input">
            <input
              type="password"
              placeholder="Confirmação de Senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="login-student-input">
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
            />
          </div>
          <div className="login-student-input">
            <input
              type="number"
              placeholder="Número"
              value={numberId}
              onChange={(e) => setNumberId(parseInt(e.target.value))}
              step="1"
            />
          </div>
          <div className="login-student-input">
            <input
              type="text"
              placeholder="Turma"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
            />
          </div>
          <div className="login-student-input">
            <input
              type="text"
              placeholder="Escola"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div className="login-student-input">
            <input
              type="text"
              placeholder="Identificador"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className="login-student-button" type="submit">Começar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      {/*<div dangerouslySetInnerHTML={{ __html: testText }} />*/}
    </div>
  );
};

export default StudentLogin;