import React, { useState, useEffect } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import LittleCar from '../littleCar/LittleCar';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

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
                            <li><Link to="/profile"><GrUserManager />Profile</Link></li>
                            <li><Link to="/shop-car"><LittleCar /></Link></li>
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
