/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import StudentLogin from './pages/login_student/login.jsx'
//import Login from './pages/questions_creation/questionCreation.jsx'
//import { Questions } from './pages/questions' //3 considerações:
//1 - o arquivo padrão é o index.jsx, então não precisa informar './home/index.jsx'
//2 - estou importando a função Home() (não sei porque a letra maiúscula) do arquvio index.jsx
//3 - precisa colcoar {} quando não é exportado pelo método default, por exemplo: "export default Home"
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentLogin />
  </React.StrictMode>,
)
*/

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from './pages/login_student/login';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
      </Routes>
    </Router>
  );
}

export default Main;
*/

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from './pages/login_student/login.jsx';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './pages/login_student/login.jsx';
import TeacherLogin from './pages/login_teacher/login';
import { Questions } from './pages/questions/index.jsx';
import TeacherQuestionCreation from './pages/questions_creation/questionCreation';
import './styles/global.css';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/teacher-questions" element={<TeacherQuestionCreation />} />
      </Routes>
    </Router>
  );
}

// Use ReactDOM.createRoot to render the entire Main component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

