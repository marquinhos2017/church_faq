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

  input, textarea {
    font-size: 16px; /* Aumente o tamanho da fonte para evitar zoom */
    -webkit-text-size-adjust: 100%; /* Impede o ajuste do tamanho do texto no iOS */
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
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
