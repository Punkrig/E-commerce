// components/ProductItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./productList.scss";

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <p>Valor: <br /> R$ {product.price}</p>
                <h3>{product.name}</h3>
            </Link>
        </div>
    );
};

export default ProductItem;
