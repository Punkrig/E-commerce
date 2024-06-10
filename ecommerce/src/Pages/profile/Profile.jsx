import { Link } from 'react-router-dom'; // Importe o Link do React Router

import Header from '../../components/header/Header';
import './profile.scss';

function Profile() {
    return (
        <>
            <Header />
            <div className="profile">
                <h2>Perfil do Usuário</h2>
                <div className="user-info">
                    <div className="user-avatar">
                        <img src="caminho_para_a_imagem_do_usuario" alt="Avatar do Usuário" />
                    </div>
                    <div className="user-details">
                        <p>Nome: Nome do Usuário</p>
                        <p>Email: email@exemplo.com</p>
                        <p>Endereço de Entrega: Rua Exemplo, 1234</p>
                        {/* Adicione mais informações do usuário aqui */}
                    </div>
                </div>
                <div className="order-history">
                    <h3>Histórico de Pedidos</h3>
                    <ul>
                        <li>Pedido #1</li>
                        <li>Pedido #2</li>
                        <li>Pedido #3</li>
                        {/* Adicione mais pedidos conforme necessário */}
                    </ul>
                </div>
                <Link to="/sell" className="sell-button">Fazer uma venda</Link>
            </div>
        </>
    )
}

export default Profile;
