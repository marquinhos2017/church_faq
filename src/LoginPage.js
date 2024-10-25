import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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

const LoginPage = ({ setUser }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('nickname', nickname)
            .eq('password', password)
            .single();

        if (error) {
            setError('Usuário ou senha inválidos.');
        } else {
            localStorage.setItem('user', JSON.stringify(user)); // Armazena o usuário no localStorage
            setUser(user);
            navigate(user.role === 'admin' ? '/admin/departments' : '/user/departments');
        }
    };

    return (
        <Container>
            <h1>Login</h1>
            <Input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <Button onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default LoginPage;
