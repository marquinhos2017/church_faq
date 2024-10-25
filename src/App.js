import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DepartmentsPage from './DepartmentsPage';
import FAQPage from './FAQPagea';
import AddQuestionPage from './AddQuestionPage';
import AnswerQuestionPage from './AnswerQuestionPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Exibe LoginPage se o user não está logado */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        {user && (
          <>
            <Route path="/admin/departments" element={<DepartmentsPage user={user} />} />
            <Route path="/user/departments" element={<DepartmentsPage user={user} />} />
            <Route path="/faq/:id" element={<FAQPage user={user} />} />
            <Route path="/add-question" element={<AddQuestionPage />} />
            <Route path="/answer-question/:questionId" element={<AnswerQuestionPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
