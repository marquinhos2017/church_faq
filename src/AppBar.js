// AppBar.js
import React from 'react';
import styled from 'styled-components';

const AppBarContainer = styled.div`
  background-color: #007bff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  flex-grow: 1; /* Faz o título ocupar o espaço restante */
  text-align: center; /* Centraliza o título */
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AppBar = ({ onBack }) => {
  return (
    <AppBarContainer>
      <BackButton onClick={onBack}>
        <i className="fas fa-arrow-left"></i>
      </BackButton>
      <Title>Lagoinha FAQ</Title>
      <div style={{ width: '24px' }}></div> {/* espaço vazio para alinhar o título */}
    </AppBarContainer>
  );
};

export default AppBar;
