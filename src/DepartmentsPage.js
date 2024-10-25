import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Estilos
const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); // Responsividade
  gap: 15px;
  width: 100%;
  max-width: 600px;
`;

const DepartmentCard = styled.button`
  background-color: rgb(111, 104, 221);
  color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgb(91, 84, 181);
  }
`;

const DepartmentName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const AdminButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e55656;
  }
`;

const DepartmentsPage = ({ user }) => {
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

  return (
    <Container>
      <Title>Departamentos</Title>
      <DepartmentGrid>
        {departments.map((department) => (
          <DepartmentCard key={department.id} onClick={() => handleDepartmentClick(department.id)}>
            <DepartmentName>{department.name}</DepartmentName>
          </DepartmentCard>
        ))}
      </DepartmentGrid>

      {user.role === 'admin' && (
        <AdminButton onClick={() => navigate('/add-question')}>
          Adicionar Pergunta
        </AdminButton>
      )}
    </Container>
  );
};

export default DepartmentsPage;
