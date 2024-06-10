// components/ProductList.js
import React from 'react';
import "./productList.scss"
import ProductItem from '../listProduct/ProductItem'; // Importa o ProductItem.jsx do diretório listProduct
const ProductList = ({ products }) => {
    return (
        <div className='mainProductList'>
           
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} className="product-item"/>

                ))}
                
            </div>
        </div>
    );
};

export default ProductList;
