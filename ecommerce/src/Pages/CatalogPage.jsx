// pages/CatalogPage.js
import React from 'react';
import Header from '../components/header/Header';
import ProductList from '../components/productList/ProductList'; // Importe o ProductList corretamente
const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30 },
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30 },
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30 },

];

const CatalogPage = () => {
    return (
        <div>
            <Header />
            <ProductList products={products} />
        </div>
    );
};

export default CatalogPage;
