import React from 'react';
import './Footer.css';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, PhoneIcon, EmailIcon } from '../Icons/ModernIcons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo.svg" alt="Flora Bella" className="footer-logo-icon" />
              <h3>🌸 Flora Bella</h3>
            </div>
            <p>Criando momentos especiais com a beleza das flores desde 2020.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <InstagramIcon size={24} /> Instagram
              </a>
              <a href="#" aria-label="Facebook">
                <FacebookIcon size={24} /> Facebook
              </a>
              <a href="#" aria-label="WhatsApp">
                <WhatsAppIcon size={24} /> WhatsApp
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>🌺 Serviços</h4>
            <ul>
              <li><a href="#">🌸 Buquês Personalizados</a></li>
              <li><a href="#">🎉 Decoração de Eventos</a></li>
              <li><a href="#">🌿 Plantas e Jardins</a></li>
              <li><a href="#">🚀 Entrega Expressa</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>📞 Contato</h4>
            <div className="contact-info">
              <p>
                📍 Endereço: Rua das Flores, 123 - Centro
              </p>
              <p>
                <PhoneIcon size={18} color="#a8e6a3" /> Telefone: (11) 9999-9999
              </p>
              <p>
                <EmailIcon size={18} color="#a8e6a3" /> Email: contato@florabella.com
              </p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>🕒 Horário de Funcionamento</h4>
            <div className="hours">
              <p>Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 16h</p>
              <p>Domingo: 9h às 14h</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Flora Bella. Todos os direitos reservados.</p>
          <p>
            Feito com ❤️ para espalhar beleza pelo mundo 🌸
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;