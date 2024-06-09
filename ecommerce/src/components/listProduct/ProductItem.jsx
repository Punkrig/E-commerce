// components/ProductItem.js
import React from 'react';
import "./productList.scss";

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <a href="">
            <h3>{product.name}</h3>
            <img src="" alt="" />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            </a>
        </div>
    );
};

export default ProductItem;
