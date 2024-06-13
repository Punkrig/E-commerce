import React from 'react';
import { Link } from 'react-router-dom';
import "./productList.scss";

const ProductItem = ({ product }) => {
    if (!product) {
        return <p>No product data</p>; // Check if product data exists
    }

    const { title, price, description, category } = product;

    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={title} />
                <p>Valor: <br /> R$ {price}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{category}</p>
            </Link>
        </div>
    );
};

export default ProductItem;
