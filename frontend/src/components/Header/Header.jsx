import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon } from '../Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, admin, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    showSecureToast('success', 'default');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          
          <h1> 🌸 Flora Bella</h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/home" onClick={() => setIsMenuOpen(false)}>Início</Link></li>
            <li><Link to="/produtos" onClick={() => setIsMenuOpen(false)}>Produtos</Link></li>
            <li><Link to="/clientes" onClick={() => setIsMenuOpen(false)}>Clientes</Link></li>
            <li><Link to="/vendas" onClick={() => setIsMenuOpen(false)}>Vendas</Link></li>
            {isAuthenticated && (
              <li className="admin-section">
                <UserIcon size={20} color="#2d5016" />
                <span className="admin-name">{admin?.name}</span>
                <button onClick={handleLogout} className="logout-btn">Sair</button>
              </li>
            )}
          </ul>
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;