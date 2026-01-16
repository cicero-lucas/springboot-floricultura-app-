import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`hero ${isVisible ? 'hero-visible' : ''}`}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Flores que Falam ao <span className="highlight">Coração</span>
          </h1>
          <p className="hero-subtitle">
            Transformamos momentos especiais em memórias eternas com arranjos únicos 
            que expressam seus sentimentos mais verdadeiros.
          </p>
          <div className="hero-buttons">
            <a href="/produtos"><button className="btn-primary">🌸 Ver Catálogo</button></a>
            <button className="btn-secondary">✨ Criar Arranjo</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-bg.svg" alt="Flores decorativas" className="hero-bg" />
          <div className="flower-decoration">🌸</div>
          <div className="flower-decoration flower-2">🌺</div>
          <div className="flower-decoration flower-3">🌷</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;