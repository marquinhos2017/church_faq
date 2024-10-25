import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate para navegação
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Estilos
const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const QuestionContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const QuestionText = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const AnswerText = styled.div`
  color: #666;
  padding: 10px 0 0;
`;

const AddQuestionInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: calc(100% - 22px);
`;

const AddQuestionButton = styled.button`
  background-color: rgb(111, 104, 221);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: rgb(91, 84, 181);
  }
`;

const BackButton = styled.button`
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #ccc;
  }
`;

const FAQPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializa o hook useNavigate para navegação
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('department_id', id);

      if (error) {
        console.error(error);
      } else {
        if (user.role === 'user') {
          const answeredQuestions = data.filter((question) => question.answer);
          setQuestions(answeredQuestions);
        } else {
          setQuestions(data);
        }
      }
    };

    fetchQuestions();
  }, [id, user.role]);

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    const { error } = await supabase
      .from('questions')
      .insert([{ question: newQuestion, department_id: id }]);

    if (error) {
      console.error('Error adding question:', error);
    } else {
      setQuestions([...questions, { question: newQuestion, answer: null }]);
      setNewQuestion('');
    }
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>Voltar</BackButton> {/* Botão de voltar */}

      <h2>Perguntas Frequentes</h2>
      <AddQuestionInput
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Digite sua pergunta aqui..."
      />
      <AddQuestionButton onClick={handleAddQuestion}>
        Adicionar Pergunta
      </AddQuestionButton>

      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionContainer key={question.id}>
            <QuestionHeader onClick={() => toggleQuestion(question.id)}>
              <QuestionText>{question.question}</QuestionText>
              {expandedQuestions[question.id] ? <FiChevronUp /> : <FiChevronDown />}
            </QuestionHeader>
            {expandedQuestions[question.id] && (
              <AnswerText
                dangerouslySetInnerHTML={{
                  __html: question.answer ? question.answer : 'Pergunta ainda não respondida.',
                }}
              />
            )}
            {user.role === 'admin' && (
              <Link to={`/answer-question/${question.id}`}>Responder</Link>
            )}
          </QuestionContainer>
        ))
      ) : (
        <p>Nenhuma pergunta encontrada.</p>
      )}
    </Container>
  );
};

export default FAQPage;
