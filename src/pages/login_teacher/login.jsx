import React, { useState } from 'react';
import "./styles.css"

const Login = () => {
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
    <div className="login-form">
      <h2>Olimpíada do Conhecimento <br /><br />Professor</h2>
      <form onSubmit={handleLogin}>
        <div className="login-input">
          <input
            type="text"
            placeholder="Disciplina"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Começar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;