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
    const [image, setImage] = useState(null);
    const [postId, setPostId] = useState(null);

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
            userId,
            product: {
                title,
                description,
                price,
                category,
                condition,
            }
        };
    
        console.log('Form Data:', formData); // Verifique os dados no console
    
        try {
            const response = await fetch(`http://localhost:3000/posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error('Failed to create product');
            }
    
            const data = await response.json();
            setPostId(data.id);
            console.log('Product created successfully', data);
        } catch (error) {
            console.error('Error creating product:', error.message);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!postId) {
            console.error('Post ID is not available');
            return;
        }

        if (!image) {
            console.error('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('picture', image);

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/pictures`, {
                method: 'POST',
                
                body: formData,
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error('Failed to upload image');
            }

            console.log('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error.message);
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
                            <option value="ULTRASSON">ULTRASSON</option>
                            <option value="ELETROCARDIOGRAMA_E_C_G">ELETROCARDIOGRAMA_E_C_G</option>
                            <option value="APARELHO_DE_RAIO_X">APARELHO_DE_RAIO_X</option>
                            <option value="ESTETOSCOPIO">ESTETOSCOPIO</option>
                            <option value="MONITOR_DE_PRESSAO_ARTERIAL">MONITOR_DE_PRESSAO_ARTERIAL</option>
                            <option value="OXIMETRO_DE_PULSO">OXIMETRO_DE_PULSO</option>
                            <option value="CENTRIFUGA">CENTRIFUGA</option>
                            <option value="MICROSCOPIO">MICROSCOPIO</option>
                            <option value="ANALISADOR_DE_SANGUE">ANALISADOR_DE_SANGUE</option>
                            <option value="MANEQUINS_DE_SIMULACAO">MANEQUINS_DE_SIMULACAO</option>


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

                {postId && (
                    <form onSubmit={handleImageUpload}>
                        <h3>Envie uma Imagem</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button type="submit">Upload Imagem</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default SellPage;
