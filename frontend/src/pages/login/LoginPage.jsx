import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { showSecureToast } from '../../utils/secureMessages';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      showSecureToast('success', 'default');
      setTimeout(() => {
        window.location.href = '/home';
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
              <h1>🔑 Fazer Login</h1>
              <p>Acesse sua conta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
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
              
              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Lembrar de mim
                </label>
                <Link to="/esqueci-senha" className="forgot-password">
                  Esqueceu a senha?
                </Link>
              </div>
              
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Entrando...
                  </>
                ) : (
                  <>
                    ✨ Entrar
                  </>
                )}
              </button>
              
              <div className="login-divider">
                <span>ou</span>
              </div>
              
              <div className="social-login">
                <button type="button" className="social-btn google">
                  🔍 Entrar com Google
                </button>
                <button type="button" className="social-btn facebook">
                  👥 Entrar com Facebook
                </button>
              </div>
              
              <div className="signup-link">
                <p>
                  Não tem uma conta? 
                  <Link to="/cadastro"> 🌸 Cadastre-se</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;