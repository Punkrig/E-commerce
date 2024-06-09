// pages/CatalogPage.jsx
import React from 'react';
import Header from '../components/header/Header';
import ProductList from '../components/productList/ProductList';
import products from '../data/productsData';

const CatalogPage = () => {
    return (
        <div>
            <Header />
            <ProductList products={products} />
        </div>
    );
};

export default CatalogPage;
