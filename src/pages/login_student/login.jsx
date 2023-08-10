import React, { useState } from 'react';
import "./login_student.css"
import { submitStudentData } from '../../components/api';
import { useNavigate } from 'react-router-dom';
import { useResponse } from '../../contexts/responseContext'

const StudentLogin = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [number, setNumber] = useState('');
  const [classroom, setClassroom] = useState('');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { updateResponse } = useResponse();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform validation and login logic here

      // Simulate submitting student data
      const data = { name, birthdate, number, classroom, school };
      const response = await submitStudentData(data);

      // Handle the response from the server
      if (response.success) {
        updateResponse(response); // Update the response in the context
        // Store JWT in localStorage (replace 'token' with your actual JWT key)
        
        //localStorage.setItem('token', response.token);
        navigate('/questions');

        // Redirect user to dashboard or another page if successful
        // For example, you can use React Router for navigation
      } else {
        setError('Something went wrong. Please try again.');
      }

      // Redirect user to dashboard or another page if successful
    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try again.');
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
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
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
          <button className="login-student-button" type="submit">Começar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;