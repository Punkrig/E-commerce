// components/Header.js
import React from 'react';
import './header.scss'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
    
        <header className='mainContainer'>
            <div className="left">
                <h1>My Commerce</h1>
            </div>
            <div className="right">
                <ul>
                    <li><Link to='/'> Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to={"/login"}>Log In</Link></li>
                    <li><Link to={"/register"}>Register</Link></li>
                </ul>        
            </div>
        </header>
    );
};

export default Header;
