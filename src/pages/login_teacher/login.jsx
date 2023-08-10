import React, { useState } from 'react';
import "./login_teacher.css"

const TeacherLogin = () => {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform validation and login logic here
      // Redirect user to dashboard or another page
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
              placeholder="Disciplina"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
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