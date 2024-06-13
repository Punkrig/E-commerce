// components/Filters.jsx
import React from 'react';
import './filter.scss';

const Filters = ({ onFilterChange }) => {
    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        onFilterChange(selectedFilter);
    };

    return (
        <div className="filters">
            <label htmlFor="filter">Filtrar por tipo:</label>
            <select id="filter" onChange={handleFilterChange}>
                <option value="all">Todos</option>
                <option value="clothing">Roupas</option>
                <option value="electronics">Eletrônicos</option>
                <option value="books">Livros</option>
            </select>
        </div>
    );
};

export default Filters;