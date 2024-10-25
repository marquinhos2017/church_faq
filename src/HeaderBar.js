// HeaderBar.js
import React from 'react';
import styled from 'styled-components';

// Estilo para a HeaderBar
const HeaderContainer = styled.div`
  background-color: #007bff; /* Cor da HeaderBar */
  color: white;
  padding: 15px 0; /* Padding vertical */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Largura total */
  position: fixed; /* Fixo no topo */
  top: 0; /* Alinhado ao topo */
  left: 0; /* Alinhado à esquerda */
  z-index: 10; /* Para garantir que fique acima de outros elementos */
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  margin: 0; /* Removendo margens */
`;

const HeaderBar = () => {
    return (
        <HeaderContainer>
            <HeaderTitle>Lagoinha FAQ</HeaderTitle> {/* Título da HeaderBar */}
        </HeaderContainer>
    );
};

export default HeaderBar;
