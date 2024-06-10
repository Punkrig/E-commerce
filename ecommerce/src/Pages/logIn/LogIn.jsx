import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import PropTypes from 'prop-types';
import "./login.scss";
import Header from "../../components/header/Header";

const Login = ({ onToggle }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("teste", username, password);
        console.log("Envio");
    };

    return (
        <>
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit}>
                <img src="/LOGO.png" alt="Estudante" className="img-logo" />
                    <h1>Acesse a sua conta</h1>
                    <div className="signup-link">
                        <p>
                            Novo usuário? <a href="#" onClick={onToggle}>Criar nova conta</a>
                        </p>
                    </div>
                    <div>
                        <input type="email" placeholder='E-mail' required onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Senha' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="recall-forget">
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                            Mostrar senha
                        </label>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                    <button>Entrar</button>
                </form>
            </div>
        </>    
    );
}

Login.propTypes = {
    onToggle: PropTypes.func.isRequired,
};

export default Login;