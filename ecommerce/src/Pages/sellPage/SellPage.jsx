import React, { useState } from 'react';
import './sellPage.scss';
import Header from '../../components/header/Header';
function SellPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados do formulário para o backend
        console.log('Dados do formulário:', { title, description, price, category });
    }

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
                    <button type="submit">Criar Anúncio</button>
                </form>
            </div>
        </>    
    )
}

export default SellPage;