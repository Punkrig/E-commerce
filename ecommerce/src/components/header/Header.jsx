// components/Header.js
import React from 'react';
import './header.scss'
const Header = () => {
    return (
        <header className='mainContainer'>
            <div className="left">
                <h1>My Commerce</h1>
            </div>
            <div className="right">
                <ul>
                    <li><a href="/"> Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/singin">Sign In</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
