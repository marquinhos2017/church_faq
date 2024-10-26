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

const VideoInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AnswerQuestionPage = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('id', questionId)
                .single();

            if (error) setError('Erro ao buscar a pergunta.');
            else {
                setQuestion(data.question);
                setAnswer(data.answer || '');
                setImageURL(data.image || '');
                setVideoURL(data.video || '');
            }
            setLoading(false);
        };
        fetchQuestion();
    }, [questionId]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`; // Gerar um nome único para o arquivo

            // Faça upload do arquivo para o Supabase Storage
            const { data, error } = await supabase.storage.from('image').upload(fileName, file);

            if (error) {
                console.error('Erro ao fazer upload da imagem:', error.message);
                alert(`Erro ao carregar a imagem: ${error.message}`);
            } else {
                console.log("Imagem carregada com sucesso:", data);

                // Gere a URL pública da imagem usando o caminho correto
                const { publicURL, error: urlError } = supabase.storage.from('image').getPublicUrl(data.path);
                const link = supabase
                    .storage
                    .from('image')
                    .getPublicUrl(data.path).data.publicUrl;
                console.log(link);
                if (urlError) {
                    console.error('Erro ao gerar URL pública:', urlError.message);
                    alert('Erro ao gerar a URL pública.');
                } else {
                    console.log("URL pública gerada:", publicURL); // Verifique a URL gerada
                    setImageURL(link); // Atualize `imageURL` com a URL gerada
                    setAnswer((prev) => prev + `<img src="${link}" alt="Imagem" />`); // Adicione a imagem ao campo de resposta
                }
            }
        }
    };




    const handleSubmit = async () => {
        console.log("Valor de imageURL no momento de envio:", imageURL); // Verifique `imageURL`
        const { error } = await supabase
            .from('questions')
            .update({ answer, image: imageURL, video: videoURL, status: 'respondida' }) // Aqui você salva a URL na coluna image
            .eq('id', questionId);

        if (error) {
            console.error('Erro ao salvar a resposta:', error);
            alert('Erro ao salvar a resposta.');
        } else {
            alert('Resposta salva com sucesso!');
            const { data: updatedQuestion } = await supabase
                .from('questions')
                .select('department_id')
                .eq('id', questionId)
                .single();

            navigate(`/faq/${updatedQuestion.department_id}`);
        }
    };




    return (
        <EditorContainer>
            <h2>Responder Pergunta</h2>
            <p>{question}</p>
            <ReactQuill value={answer} onChange={setAnswer} />
            <UploadButton type="file" accept="image/*" onChange={handleImageUpload} />
            <VideoInput
                type="text"
                placeholder="Link do vídeo (opcional)"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
            />
            <Button onClick={handleSubmit}>Salvar Resposta</Button>
        </EditorContainer>
    );
};

export default AnswerQuestionPage;
