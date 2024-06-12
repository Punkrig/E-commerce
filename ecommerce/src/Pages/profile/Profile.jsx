import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import './profile.scss';
import { jwtDecode } from 'jwt-decode'; // Mantendo a importação como solicitada

function Profile() {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log('Access Token:', token); // Verifica se o token está sendo obtido

        if (token) {
            setIsAuthenticated(true);
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Verifica o conteúdo do token decodificado
                if (decodedToken && decodedToken.id) {
                    // Use o id decodificado para fazer a chamada na API
                    fetch(`http://localhost:3000/users/${decodedToken.id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('API Response:', data);
                        setUser(data);
                        setUserRole(data.type);

                        if (data.type === 'STUDENT') {
                            console.log('User is a student');
                        } else if (data.type === 'TEACHER') {
                            console.log('User is a teacher');
                        } else {
                            console.warn('Unknown role:', data.type);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data from API:', error);
                    });
                } else {
                    console.warn('ID not found in token:', decodedToken);
                }
            } catch (error) {
                console.error('Error decoding token:', error); // Captura e exibe qualquer erro de decodificação do token
            }
        }
    }, []);

    return (
        <>
            <Header />
            <div className="profile">
                <h2>Perfil do Usuário</h2>
                {isAuthenticated && user ? (
                    <>
                        <div className="user-info">
                            <div className="user-avatar">
                                <img src={user.avatar} alt="Avatar do Usuário" />
                            </div>
                            <div className="user-details">
                                <p>Nome: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Telefone: {user.phone}</p>
                                <p>Tipo: {user.type}</p>
                                {/* Adicione mais informações do usuário aqui */}
                            </div>
                        </div>
                      
                        {userRole === 'STUDENT' && (
                            <Link to="/sell" className="sell-button">Fazer uma venda</Link>
                        )}
                        {userRole === 'TEACHER' && (
                            <Link to="/teacher-list" className="list-button">Criar Lista</Link>
                        )}
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default Profile;
