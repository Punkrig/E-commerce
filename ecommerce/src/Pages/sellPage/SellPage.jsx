import React, { useState } from 'react';
import './sellPage.scss';
import Header from '../../components/header/Header';
import { jwtDecode } from "jwt-decode";

function SellPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const formData = {
            title,
            description,
            price,
            category,
            condition,
            userId,
        };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            console.log('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="sellPage">
                <h2>Criar Anúncio de Venda</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Descrição:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Preço:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Categoria:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="eletronicos">Eletrônicos</option>
                            <option value="moveis">Móveis</option>
                            <option value="vestuario">Vestuário</option>
                            {/* Adicione mais opções conforme necessário */}
                        </select>
                    </label>
                    <label>
                        Condição:
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="NEW">Novo</option>
                            <option value="USED">Usado</option>
                            <option value="PARTIALLY_FUNCTIONAL">Parcialmente funcional</option>
                            {/* Adicione mais opções conforme necessário */}
                        </select>
                    </label>
                    <button type="submit">Criar Anúncio</button>
                </form>
            </div>
        </>
    );
}

export default SellPage;
