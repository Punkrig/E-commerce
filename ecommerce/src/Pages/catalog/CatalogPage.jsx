// pages/CatalogPage.jsx
import React, { useState } from 'react';
import Header from '../../components/header/Header';
import ProductList from '../../components/productList/ProductList';
import Filters from '../../components/filters/Filters';
import products from '../../data/productsData';
import './catalogPage.scss';

const CatalogPage = () => {
    const [filter, setFilter] = useState('all');
    const filteredProducts = filter === 'all' ? products : products.filter(product => product.type === filter);

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    return (
        <div className='mainCatalog'>
            <Header />
                <div className="listDescription">
                    <h2>Lista de produtos</h2>
                    <Filters onFilterChange={handleFilterChange} />
                </div>
            <div className="listProdutos">
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
};

export default CatalogPage;
