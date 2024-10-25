import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const userRole = localStorage.getItem('role'); // Armazene o papel do usuário no login

    if (userRole !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
