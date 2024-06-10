// pages/ProductPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/productsData';
import "./productPage.scss";
import Header from "../../components/header/Header";
import SimilarProducts from "../../components/similarProducts/SimilarProducts";
import ShoppingCart from '../shoppingCart/ShoppingCart';

const ProductPage = ({ addItemToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    const similarProducts = products.filter(p => p.type === product.type && p.id !== parseInt(id)).slice(0, 3);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBuyNow = () => {
        addItemToCart(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Header />
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
                <button onClick={handleBuyNow}>Buy Now</button>
            </div>
        </div>
        <SimilarProducts similarProducts={similarProducts} />
        {isModalOpen && <ShoppingCart cartItems={[product]} onClose={closeModal} />}
        </>
    );
};

export default ProductPage;
