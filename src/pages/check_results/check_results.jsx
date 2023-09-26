import React, { useState } from 'react';
import "./check_results.css"
import { checkResults } from '../../components/api';

const CheckResults = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      setError('');
      if(!(name.length >= 3 && password.length >= 3)) {
        setError('Name and password must have at least 3 characters.');
        return;
      }

      const data = {
        name: name,
        password: password,
        type: "stats"
      }
      await checkResults(data.password);
      
      console.log("Success on check results");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-stats-body">
      <div className="login-stats-form">
        <h2>Olimpíada do Conhecimento <br /><br />Correção</h2>
        <form onSubmit={handleCheck}>
          <div className="login-stats-input">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login-stats-input">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-stats-button" type="submit">Começar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckResults;