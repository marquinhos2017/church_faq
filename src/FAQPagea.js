import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp, FiSearch, FiPlus } from 'react-icons/fi';

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff; // Fundo branco do app
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif; // Fonte Montserrat
  padding-bottom: 80px; // Espaço para o botão flutuante
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
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
  color: #0C0C0C; // Cor principal
  font-size: 18px;
`;

const AnswerText = styled.div`
  color: #666;
  padding: 10px 0 0;
`;

const AddQuestionContainer = styled.div`
  position: fixed; // Fixa o container na tela
  bottom: 20px; // Distância do fundo
  left: 20px; // Distância da esquerda
  right: 20px; // Distância da direita
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AddQuestionInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
`;

const AddQuestionButton = styled.button`
  background-color: #F2613F; // Cor do botão Adicionar
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #9B3922; // Cor ao passar o mouse
  }
`;

const LogoutButton = styled.button`
  background-color: #FF4D4D; // Cor do botão de logout
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #C60000; // Cor ao passar o mouse
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
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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

    const { data, error } = await supabase
      .from('questions')
      .insert([{ question: newQuestion, department_id: id }])
      .select();

    if (error) {
      console.error('Erro ao adicionar pergunta:', error);
    } else if (data && data.length > 0) {
      if (user.role === 'admin' || data[0].answer) {
        setQuestions([...questions, data[0]]);
      }
      setNewQuestion('');
    }
  };



  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <BackButton onClick={() => navigate(user.role === 'admin' ? '/admin/departments' : '/user/departments')}>
        Voltar
      </BackButton>

      <h2 style={{ color: '#0C0C0C' }}>Perguntas Frequentes</h2> {/* Cor do título */}

      <SearchContainer>
        <FiSearch color="#666" />
        <SearchInput
          type="text"
          placeholder="Buscar perguntas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((question) => (
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

      <AddQuestionContainer>
        <FiPlus color="#666" />
        <AddQuestionInput
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Digite sua pergunta aqui..."
        />
        <AddQuestionButton onClick={handleAddQuestion}>
          Adicionar
        </AddQuestionButton>
      </AddQuestionContainer>

    </Container>
  );
};

export default FAQPage;
