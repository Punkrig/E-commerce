import { FaUser, FaEnvelope, FaLock, FaIdBadge } from "react-icons/fa";
import { useState } from "react";
import PropTypes from 'prop-types';
import "./cadastro.scss";
import Header from "../../components/header/Header";
const Cadastro = ({ onToggle }) => {
    const [fullName, setFullName] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }
        console.log("Cadastro:", fullName, matricula, email, password, role);
    };

    return (
        <>
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Criar nova conta</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Nome completo" required
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Matrícula" required
                            onChange={(e) => setMatricula(e.target.value)}
                        />
                        <FaIdBadge className="icon" />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="E-mail" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Senha" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirmação de senha" required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="role-selection">
                        <label>
                            <input
                                type="radio"
                                value="Aluno"
                                checked={role === "Aluno"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Aluno
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Professor"
                                checked={role === "Professor"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Professor
                        </label>
                    </div>
                    <button>Cadastrar</button>
                    <div className="login-link">
                        <p>
                            Já tem uma conta? <a href="#" onClick={onToggle}>Acesse sua conta</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

Cadastro.propTypes = {
    onToggle: PropTypes.func.isRequired,
};

export default Cadastro;