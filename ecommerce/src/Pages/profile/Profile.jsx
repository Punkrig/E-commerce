import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import './profile.scss';
import { jwtDecode } from 'jwt-decode'; // Mantendo a importação como solicitada

function Profile() {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

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
                        setFormData({
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                        });

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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(token);
    
        fetch(`http://localhost:3000/users/${decodedToken.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: String(formData.phone),
                }),
            })
        .then(response => response.json())
        .then(data => {
            console.log('Updated API Response:', data);
            setUser(data);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
    };
    

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

        if (confirmDelete) {
            const token = localStorage.getItem('accessToken');
            const decodedToken = jwtDecode(token);

            fetch(`http://localhost:3000/users/${decodedToken.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    console.log('Account deleted successfully');
                    // Redirecionar o usuário para a página de login ou realizar outra ação necessária
                } else {
                    console.error('Failed to delete account:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting account:', error);
            });
        }
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile">
                    <h2>Perfil do Usuário</h2>
                    {isAuthenticated && user ? (
                        <>
                            <div className="user-info">
                                <div className="user-avatar">
                                    <img src={user.avatar} alt="Avatar do Usuário" />
                                </div>
                                <div className="user-details">
                                    {isEditing ? (
                                        <form onSubmit={handleFormSubmit}>
                                            <div>
                                                <label>Nome: </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label>Email: </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label>Telefone: </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                           
                                            <button type="submit">Salvar</button>
                                            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                                        </form>
                                    ) : (
                                        <>
                                            <p>Nome: {user.name}</p>
                                            <p>Email: {user.email}</p>
                                            <p>Telefone: {user.phone}</p>
                                            <p>Tipo: {user.type}</p>
                                        </>
                                    )}
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
                <div className="gerenciaConta">
                <button className='delete' onClick={handleDeleteAccount}>Excluir Conta</button>
                    {!isEditing && <button className='edit' onClick={handleEditClick}>Editar</button>}
                </div>
            </div>
        </>
    );
}

export default Profile;
