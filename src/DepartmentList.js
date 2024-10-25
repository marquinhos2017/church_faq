import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

`;

const DepartmentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e7eaf3;
  }
  
`;

const Icon = styled.div`
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
`;

const DepartmentName = styled.h3`
  font-size: 18px;
  color: #34495e;
`;

const DepartmentList = ({ departments, onSelect }) => {
    return (
        <Grid>
            {departments.map((dept) => (
                <DepartmentCard key={dept.name} onClick={() => onSelect(dept)}>
                    <Icon>
                        {/* Verifique se a classe do ícone está correta */}
                        <i className={dept.icon}></i>
                    </Icon>
                    <DepartmentName>{dept.name}</DepartmentName>
                </DepartmentCard>
            ))}
        </Grid>
    );
};


export default DepartmentList;
