import React, { useState } from 'react';
import "./login_teacher.css"
import { login, getTeacherQuestionsData } from '../../components/api';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';

const TeacherLogin = () => {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(sessionStorage.getItem('jwt_token')) {
    //if(getCookie('jwt_token')) {
      console.log("Já tem cookie");
      setError('Já há um usuário conectado');
      //todo: show in a modal the message "Não foi possível realizar o login,
      //pois já há um usuário conectado. Clique ok para redirecionar."
    } else {

      try {
        setError('');
        //login validation
        if(!(name.length >= 3 && password.length >= 3)) {
          setError('Name and password must have at least 3 characters.');
          return;
        }


        // validate data in backend (user exists, is it all right to go to next page?)
        const data = {
          name: name,
          password: password,
          type: "teacher",
          logTo: "creation"
        }
        const token = await login(data);
        //console.log(token);

        sessionStorage.setItem('jwt_token', token);
        //setCookie('jwt_token', token, 7); // Store the token for 7 days


        navigate('/teacher-questions');

        // Redirect user to dashboard or another page if successful
        // For example, you can use React Router for navigation




        // Redirect teacher user to questions creation page


      } catch (err) {
        setError(err.message);
        //setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-teacher-body">
      <div className="login-teacher-form">
        <h2>Olimpíada do Conhecimento <br /><br />Professor</h2>
        <form onSubmit={handleLogin}>
          <div className="login-teacher-input">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login-teacher-input">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-teacher-button" type="submit">Começar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;