// components/Header.js
import React, { useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";

const Header = () => {
    // Estado para controlar se o usuário está logado ou não
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLogout = () => {
        // Lógica para logout (por exemplo, limpar o estado de autenticação)
        setIsAuthenticated(true);
    };

    return (
        <header className='mainContainer'>
            <div className="left">
                <h1>My Commerce</h1>
            </div>
            <div className="right">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile"><GrUserManager />Profile</Link></li>
                            <li><Link to="/littleCar"><IoIosCart /></Link></li>
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
