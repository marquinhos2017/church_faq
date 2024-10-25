import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSettings, FiCamera, FiVideo, FiMic, FiZap, FiUsers, FiLogOut } from 'react-icons/fi';

// Estilos
const Container = styled.div`
  padding: 20px;
  background-color: #ffffff; // Fundo branco do app
  min-height: 80vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // Centraliza verticalmente
  font-family: 'Montserrat', sans-serif; // Fonte Montserrat
`;

const Title = styled.h2`
  color: #0C0C0C; // Título na cor principal
  margin-bottom: 24px; // Ajustado para dar mais espaço ao texto de boas-vindas
`;

const WelcomeMessage = styled.h1`
  color: #0C0C0C; // Cor do texto de boas-vindas
  font-size: 42px;
  margin-bottom: 42px; // Espaço entre a mensagem de boas-vindas e os departamentos
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Duas colunas
  gap: 36px;
  width: 100%;
  max-width: 600px;
`;

const DepartmentCard = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const IconCircle = styled.div`
  background-color: #f6f6f8; // Círculo com cor #f6f6f8
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const DepartmentIcon = styled.div`
  color: #0C0C0C; // Ícone na cor preta
  font-size: 32px;
`;

const DepartmentName = styled.span`
  color: #0C0C0C; // Nome do departamento na cor principal
  font-size: 12px;
  font-weight: bold;
`;

const AdminButton = styled.button`
  background-color: #F2613F; // Cor do botão de administrador
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;

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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // Alinhamento à esquerda
  width: 100%;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  background-color: #481E14; // Cor do rodapé
  color: white;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

const DepartmentsPage = ({ user, setUser }) => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      let { data, error } = await supabase.from('departments').select('*');
      if (error) {
        console.error(error);
      } else {
        setDepartments(data);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (departmentId) => {
    navigate(`/faq/${departmentId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    setUser(null); // Redefine o estado do usuário
    navigate('/'); // Redireciona para a página de login
  };

  const renderIcon = (departmentName) => {
    switch (departmentName.toLowerCase()) {
      case 'som':
        return <FiMic />;
      case 'fotografia':
        return <FiCamera />;
      case 'vídeo':
        return <FiVideo />;
      case 'iluminação':
        return <FiZap />;
      case 'transmissão':
        return <FiSettings />;
      case 'membros':
        return <FiUsers />;
      default:
        return <FiSettings />;
    }
  };

  return (
    <Container>
      <Header>
        <LogoutButton onClick={handleLogout} style={{ marginRight: '20px' }}>
          <FiLogOut style={{ marginRight: '5px' }} /> Logout
        </LogoutButton>
      </Header>
      {user && <WelcomeMessage>Bem-vindo, {user.nickname}!</WelcomeMessage>}
      <Title>Escolha um departamento</Title>

      <DepartmentGrid>
        {departments.map((department) => (
          <DepartmentCard key={department.id} onClick={() => handleDepartmentClick(department.id)}>
            <IconCircle>
              <DepartmentIcon>{renderIcon(department.name)}</DepartmentIcon>
            </IconCircle>
            <DepartmentName>{department.name}</DepartmentName>
          </DepartmentCard>
        ))}
      </DepartmentGrid>
      {/*}
      {user.role === 'admin' && (
        <AdminButton onClick={() => navigate('/add-question')}>
          Adicionar Pergunta
        </AdminButton>
      )}*/}
    </Container>
  );
};

export default DepartmentsPage;
