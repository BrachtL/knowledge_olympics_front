import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './pages/login_student/login.jsx';
import TeacherLogin from './pages/login_teacher/login';
import { Questions } from './pages/questions/index.jsx';
import TeacherQuestionCreation from './pages/questions_creation/questionCreation';
import './styles/global.css';
import { ResponseProvider } from './contexts/responseContext.jsx'
import StatsLogin from './pages/login_stats/login.jsx';
import CheckResults from './pages/check_results/check_results.jsx';
import StatsData from './pages/stats-data/index.jsx';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/teacher-questions" element={<TeacherQuestionCreation />} />
        <Route path="/stats" element={<StatsLogin />} />
        <Route path="/stats-data" element={<StatsData />} />
        <Route path="/check-results" element={<CheckResults />} />
      </Routes>
    </Router>
  );
}

// Use ReactDOM.createRoot to render the entire Main component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResponseProvider>
      <Main />
    </ResponseProvider>
  </React.StrictMode>
);

