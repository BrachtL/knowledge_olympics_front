import React, { useState } from 'react';
import "./login_stats.css"
import { login } from '../../components/api';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, deleteCookie } from '../../cookieHandler';

const StatsLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError('');
      //login validation
      if(!(name.length >= 3 && password.length >= 3)) {
        setError('Nome e Senha devem ter pelo menos 3 caracteres');
        return;
      }
      if(type == '') {
        setError("Você é professor ou aluno?");
        return;
      }

      const data = {
        name: name,
        password: password,
        type: type,
        logTo: 'stats'
      }
      
      const token = await login(data);

      //console.log(token);
      sessionStorage.removeItem('jwt_token');
      sessionStorage.setItem('jwt_token', token);

      //todo: when logging in with student, check what happens if I try to go to /teacher (question creation page)

      navigate('/stats-data');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-stats-body">
      <div className="login-stats-form">
        <h2>Olimpíada do Conhecimento <br /><br />Estatísticas</h2>
        <form onSubmit={handleLogin}>
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
          <div className="login-stats-input">
            <label>
              <input
                type="radio"
                name="type"
                value="teacher"
                checked={type === 'teacher'}
                onChange={(e) => setType(e.target.value)}
              />
              Professor
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="student"
                checked={type === 'student'}
                onChange={(e) => setType(e.target.value)}
              />
              Aluno
            </label>
          </div>
          <button className="login-stats-button" type="submit">Começar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default StatsLogin;