import React, { useState, useEffect } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import LittleCar from '../littleCar/LittleCar';
import { jwtDecode } from 'jwt-decode'; // Mantendo a importação como solicitada

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [cartItems, setCartItems] = useState([]);

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
                        // Verifica se o usuário é aluno ou professor
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

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUserRole(null);
        console.log('User logged out'); // Confirma o logout do usuário
    };
    console.log('User Role:', userRole); // Verifica o valor de userRole após a montagem do componente

    return (
        <header className='mainContainer'>
            <div className="left">
                <h1>ShareHub</h1>
            </div>
            <div className="right">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile" className='box'><GrUserManager />Profile</Link></li>

                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Log In</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
