import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from './supabaseClient';

const Container = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: rgb(111, 104, 221);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6a5bcb;
  }
`;

const AddQuestionPage = () => {
  const { id } = useParams(); // Recebe o ID do departamento
  const [question, setQuestion] = useState(''); // Estado para a pergunta
  const navigate = useNavigate(); // Hook para navegação

  const handleAddQuestion = async () => {
    console.log('Tentando adicionar pergunta:', question); // Log para depuração

    // Insere a nova pergunta na tabela 'questions' com status 'not answered'
    const { data, error } = await supabase
      .from('questions') // Mudou para 'questions'
      .insert([{ question, department_id: id, status: 'not answered' }]);

    if (error) {
      console.error('Erro ao adicionar pergunta:', error.message);
    } else {
      console.log('Pergunta adicionada com sucesso:', data);
      navigate(`/faq/${id}`); // Navega de volta para a página de perguntas
    }
  };

  return (
    <Container>
      <h1>Adicionar Pergunta</h1>
      <Input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Digite sua pergunta"
      />
      <Button onClick={handleAddQuestion}>Adicionar</Button>
    </Container>
  );
};

export default AddQuestionPage;
