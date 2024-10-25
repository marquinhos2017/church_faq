import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DepartmentsPage from './DepartmentsPage';
import FAQPage from './FAQPagea';
import AddQuestionPage from './AddQuestionPage';
import AnswerQuestionPage from './AnswerQuestionPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
`;

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Exibe LoginPage se o user não está logado */}
          {!user ? (
            <Route path="/" element={<LoginPage setUser={setUser} />} />
          ) : (
            <>
              <Route path="/admin/departments" element={<DepartmentsPage user={user} setUser={setUser} />} />
              <Route path="/user/departments" element={<DepartmentsPage user={user} setUser={setUser} />} />
              <Route path="/faq/:id" element={<FAQPage user={user} />} />
              <Route path="/add-question" element={<AddQuestionPage />} />
              <Route path="/answer-question/:questionId" element={<AnswerQuestionPage />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
