import React, { useState } from 'react';
import "./styles.css"

const Login = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [number, setNumber] = useState('');
  const [classroom, setClassroom] = useState('');
  const [school, setSchool] = useState('');
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
      <h2>Olimpíada do Conhecimento <br /><br />Aluno</h2>
      <form onSubmit={handleLogin}>
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
            type="date"
            placeholder="Data de Nascimento"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
          />
        </div>
        <div className="login-input">
          <input
            type="number"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            step="1"
          />
        </div>
        <div className="login-input">
          <input
            type="text"
            placeholder="Turma"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="text"
            placeholder="Escola"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Começar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;