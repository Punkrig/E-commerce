// components/SimilarProducts.jsx
import React from 'react';
import './similarProducts.scss';
import { Link } from 'react-router-dom';

const SimilarProducts = ({ similarProducts, products }) => {
    return (
        <div className="similarProducts">
            <h3>Produtos Semelhantes</h3>
            <div className="productList">
                {similarProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="productItem">
                            <img src={product.image} alt={product.tittle} />
                            <p>{product.name}</p>
                            <p>Valor: R$ {product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;
