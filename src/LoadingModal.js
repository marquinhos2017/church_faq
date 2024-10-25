import React from 'react';
import styled from 'styled-components';

// Estilo do Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Para ficar acima de outros elementos */
`;

// Estilo do Spinner
const Spinner = styled.div`
  border: 8px solid #f3f3f3; /* Cor do fundo do spinner */
  border-top: 8px solid #3498db; /* Cor da parte de cima do spinner */
  border-radius: 50%;
  width: 60px;  /* Tamanho do spinner */
  height: 60px; /* Tamanho do spinner */
  animation: spin 1s linear infinite; /* Animação de rotação */

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Estilo do texto
const LoadingText = styled.p`
  margin-top: 20px;
  color: white; /* Cor do texto */
  font-size: 20px;
  text-align: center;
`;

const LoadingModal = () => {
    return (
        <ModalOverlay>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Spinner />
                <LoadingText>Procurando dúvidas relacionadas ao departamento escolhido...</LoadingText>
            </div>
        </ModalOverlay>
    );
};

export default LoadingModal;
