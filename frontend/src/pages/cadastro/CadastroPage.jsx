import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { showSecureToast } from '../../utils/secureMessages';
import './CadastroPage.css';
import cadastroService from '../../services/cadastroService';

const CadastroPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await cadastroService.cadastro(formData.name, formData.email, formData.password);
      console.log('Cadastro realizado com sucesso');
      showSecureToast('success', 'default');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      showSecureToast('error', 'validation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-decoration">
            <div className="flower-bg">
              🌸
            </div>
            <div className="flower-bg flower-2">
              🌺
            </div>
            <div className="flower-bg flower-3">
              🌷
            </div>
          </div>
          <div className="login-info">
            <h2>🌸 Bem-vindo à Flora Bella</h2>
            <p>Entre na sua conta e continue criando momentos especiais com a beleza das flores.</p>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <img src="/images/logo.svg" alt="Flora Bella" className="login-logo-large" />
              <h1>🔑 Fazer seu cadastro</h1>
              <p>Crie sua conta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name">👤 Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">🔒 Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  required
                />
              </div>
              
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    ✨ Entrar
                  </>
                )}
              </button>
              
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;