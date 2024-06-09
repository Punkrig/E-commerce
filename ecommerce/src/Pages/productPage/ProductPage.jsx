// pages/ProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/productsData';
import "./productPage.scss";
const ProductPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className='mainProduct'>
            <div className="imgContainer">
            <div className="littleImages">
                    <img src="" alt={product.name} />
                    <img src="" alt={product.name} />
                    <img src="" alt={product.name} />
                </div>
                <div className="mainImage">
                    <img src={product.image} alt={product.name} />
                </div>
                
            </div>
            <div className="textContainer">
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
                <label htmlFor="quantity">
                    <p>quantidade:</p>
                    <input type="number" name="quantity" id="quantity " />
                </label>
                <button>Buy Now</button>
            </div>
        </div>
    );
};

export default ProductPage;
