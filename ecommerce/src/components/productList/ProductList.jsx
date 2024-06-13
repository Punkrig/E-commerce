import React, { useEffect, useState } from 'react';
import "./productList.scss";
import ProductItem from '../listProduct/ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const limit = 10; // Defina o número de produtos a serem puxados

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts?_limit=${limit}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched products:', data); // Log the fetched products
                setProducts(data.map(item => item.product)); // Extract the product object
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='mainProductList'>
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} className="product-item" />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
