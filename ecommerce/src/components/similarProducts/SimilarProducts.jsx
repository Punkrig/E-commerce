// components/SimilarProducts.jsx
import React from 'react';
import './similarProducts.scss';
import { Link } from 'react-router-dom';

const SimilarProducts = ({ similarProducts }) => {
    return (
        <div className="similarProducts">
            <h3>Produtos Semelhantes</h3>
            <div className="productList">
                {similarProducts.map((similarProduct) => (
                    <Link to={`/product/${similarProduct.id}`} key={similarProduct.id}>
                        <div className="productItem">
                            <img src={similarProduct.image} alt={similarProduct.name} />
                            <p>{similarProduct.name}</p>
                            <p>Valor: R$ {similarProduct.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;
