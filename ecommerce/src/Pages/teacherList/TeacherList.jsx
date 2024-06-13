import React, { useState, useEffect } from 'react';
import './teacherList.scss';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';

const TeacherList = () => {
    const [creatingList, setCreatingList] = useState(false);
    const [listTitle, setListTitle] = useState('');
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editMaterialValue, setEditMaterialValue] = useState('');
    const [teacherLists, setTeacherLists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/teacher-lists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setTeacherLists(data);
            } else {
                setTeacherLists([]);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setTeacherLists([]);
        });
    }, []);

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

    const handleEditMaterial = (index) => {
        setEditingIndex(index);
        setEditMaterialValue(materials[index]);
    };

    const handleSaveEditMaterial = () => {
        const updatedMaterials = materials.map((material, i) => i === editingIndex ? editMaterialValue : material);
        setMaterials(updatedMaterials);
        setEditingIndex(null);
        setEditMaterialValue('');
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
            setTeacherLists([...teacherLists, data]);
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
                                    {editingIndex === index ? (
                                        <input 
                                            type="text" 
                                            value={editMaterialValue} 
                                            onChange={(e) => setEditMaterialValue(e.target.value)} 
                                        />
                                    ) : (
                                        <span>{material}</span>
                                    )}
                                    {editingIndex === index ? (
                                        <button onClick={handleSaveEditMaterial}>Salvar</button>
                                    ) : (
                                        <button onClick={() => handleEditMaterial(index)}>Editar</button>
                                    )}
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
                <div className="existingLists">
                    <h2>Listas de Materiais Criadas</h2>
                    {teacherLists.length === 0 ? (
                        <p>Nenhuma lista criada ainda.</p>
                    ) : (
                        teacherLists.map((list, index) => (
                            <div key={index} className="teacherList">
                                <h3>{list.title}</h3>
                                <ul>
                                    {Array.isArray(list.materials) ? list.materials.map((material, i) => (
                                        <li key={i}>{material}</li>
                                    )) : <li>Nenhum material</li>}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default TeacherList;
