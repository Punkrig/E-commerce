// components/ProductItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./productList.scss";

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
            </Link>
        </div>
    );
};

export default ProductItem;
