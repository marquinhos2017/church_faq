import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EditorContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: rgb(111, 104, 221);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6f68dd;
  }
`;

const UploadButton = styled.input`
  margin-top: 10px;
`;

const AnswerQuestionPage = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('id', questionId)
                .single();

            if (error) {
                setError('Erro ao buscar a pergunta.');
                console.error('Error fetching question:', error);
            } else {
                setQuestion(data.question);
                setAnswer(data.answer || '');
            }
            setLoading(false);
        };

        fetchQuestion();
    }, [questionId]);

    const handleSubmit = async () => {
        const { data, error } = await supabase
            .from('questions')
            .update({ answer, status: 'respondida' })
            .eq('id', questionId);

        if (error) {
            console.error('Error updating answer:', error);
            alert('Erro ao salvar a resposta.');
        } else {
            alert('Resposta salva com sucesso!');
            setTimeout(async () => {
                const updatedQuestion = await supabase
                    .from('questions')
                    .select('department_id')
                    .eq('id', questionId)
                    .single();

                if (updatedQuestion.data) {
                    navigate(`/faq/${updatedQuestion.data.department_id}`);
                } else {
                    console.warn('Não foi possível encontrar o department_id atualizado');
                    alert('Não foi possível redirecionar. Tente novamente mais tarde.');
                }
            }, 3000);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { data, error } = await supabase.storage.from('images').upload(fileName, file);

            if (error) {
                console.error('Erro ao fazer upload da imagem:', error);
                alert('Erro ao carregar a imagem.');
            } else {
                const { publicURL, error: urlError } = supabase.storage.from('images').getPublicUrl(fileName);
                if (urlError) {
                    console.error('Erro ao obter URL da imagem:', urlError);
                } else {
                    // Adiciona a URL da imagem ao editor
                    setAnswer((prev) => prev + `<img src="${publicURL}" alt="Imagem" />`);
                }
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <EditorContainer>
            <h2>Responder Pergunta</h2>
            <p>{question}</p>
            <ReactQuill value={answer} onChange={setAnswer} />
            <UploadButton type="file" accept="image/*" onChange={handleImageUpload} />
            <Button onClick={handleSubmit}>Salvar Resposta</Button>
        </EditorContainer>
    );
};

export default AnswerQuestionPage;
