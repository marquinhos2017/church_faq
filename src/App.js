import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DepartmentsPage from './DepartmentsPage';
import FAQPage from './FAQPagea';
import AddQuestionPage from './AddQuestionPage';
import AnswerQuestionPage from './AnswerQuestionPage';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/admin/departments" element={<DepartmentsPage user={user} />} />
        <Route path="/user/departments" element={<DepartmentsPage user={user} />} />
        <Route path="/faq/:id" element={<FAQPage user={user} />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
        <Route path="/answer-question/:questionId" element={<AnswerQuestionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
