import React, { useState } from 'react';
import './teacherList.scss';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
const TeacherList = () => {
    const [creatingList, setCreatingList] = useState(false);
    const [listTitle, setListTitle] = useState('');
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState('');

    const handleCreateList = () => {
        setCreatingList(true);
    };

    const handleAddMaterial = () => {
        if (newMaterial.trim() !== '') {
            setMaterials([...materials, newMaterial.trim()]);
            setNewMaterial('');
        }
    };

    const handleDeleteMaterial = (index) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    const handleEditMaterial = (index, newName) => {
        const updatedMaterials = materials.map((material, i) => i === index ? newName : material);
        setMaterials(updatedMaterials);
    };

    const handleSubmit = () => {
        const listData = {
            title: listTitle,
            materials: materials,
        };

        fetch('http://localhost:3000/api/teacher-lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(listData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setCreatingList(false);
            setListTitle('');
            setMaterials([]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            <Header />
            <div className="teacherListContainer">
                {!creatingList ? (
                    <>
                        <h2>Bem-vindo(a) à Página de Criação de Lista</h2>
                        <p>Para começar, clique no botão abaixo para criar uma nova lista de materiais.</p>
                        <button onClick={handleCreateList}>Criar Lista</button>
                    </>
                ) : (
                    <>
                        <h2>Criação de Lista de Materiais</h2>
                        <div className="listTitle">
                            <input 
                                type="text" 
                                placeholder="Título da lista" 
                                value={listTitle} 
                                onChange={(e) => setListTitle(e.target.value)} 
                            />
                        </div>
                        <div className="materialInput">
                            <input 
                                type="text" 
                                placeholder="Adicionar novo material" 
                                value={newMaterial} 
                                onChange={(e) => setNewMaterial(e.target.value)} 
                            />
                            <button onClick={handleAddMaterial}>Adicionar</button>
                        </div>
                        <ul className="materialList">
                            {materials.map((material, index) => (
                                <li key={index} className="materialItem">
                                    <input 
                                        type="text" 
                                        value={material} 
                                        onChange={(e) => handleEditMaterial(index, e.target.value)} 
                                    />
                                    <button onClick={() => handleDeleteMaterial(index)}>Excluir</button>
                                </li>
                            ))}
                        </ul>
                        <div className="listPreview">
                            <h3>Pré-visualização da Lista</h3>
                            <p><strong>Título:</strong> {listTitle}</p>
                            <ul>
                                {materials.map((material, index) => (
                                    <li key={index}>{material}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="submitButton" onClick={handleSubmit}> <Link to='/profile'>Enviar Lista</Link></button>
                    </>
                )}
            </div>
        </>
    );
};

export default TeacherList;
