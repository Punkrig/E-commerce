import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./productPage.scss";
import Header from "../../components/header/Header";
import SimilarProducts from "../../components/similarProducts/SimilarProducts";
import ShoppingCart from '../shoppingCart/ShoppingCart';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Fetching product...');
                const response = await fetch(`http://localhost:3000/posts/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched product:', data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        console.log('Adding product to cart:', product);
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = [...existingCartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    // Aqui você pode adicionar lógica para filtrar produtos semelhantes
    const similarProducts = [];

    return (
        <div className="productContainer">
            <Header />
            <div className='mainProduct'>
                <div className="imgContainer">
                    <div className="littleImages">
                        {product.images && product.images.map((img, index) => (
                            <img key={index} src={img} alt={product.name} />
                        ))}
                    </div>
                    <div className="mainImage">
                        {/* <img src={product.image} alt={product.name} /> */}
                    </div>
                </div>
                <div className="textContainer">
                    <h3>{product.product.title}</h3>
                    <p>Valor: R$ {product.product.price}</p>
                    <p>{product.product.description}</p>
                    <button onClick={handleBuyNow}>Compre Agora</button>
                </div>
            </div>
            {/* <SimilarProducts similarProducts={similarProducts} products={product.product} /> */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>Produto adicionado ao carrinho!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
