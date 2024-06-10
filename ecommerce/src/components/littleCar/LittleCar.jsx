import React from 'react';
import { IoIosCart } from "react-icons/io";
import './littleCar.scss';

const LittleCar = ({ cartItems = [], setCartItems }) => {
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div className="littleCar">
            <IoIosCart />
            <span className="cartCount">{cartItems.length}</span>
            <ul className="cartItems">
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LittleCar;
