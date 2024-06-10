import React from 'react';
import Header from '../../components/header/Header';

function ShoppingCart({ addItemToCart, removeItemFromCart }) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }

        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <Header />
            <h2>Carrinho de Compras</h2>
            <ul>
                {cartItems && cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - R$ {item.price.toFixed(2)}
                        <button onClick={() => removeItemFromCart(item.id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <p>Total: R$ {calculateTotal().toFixed(2)}</p>
        </div>
    );
}

export default ShoppingCart;
