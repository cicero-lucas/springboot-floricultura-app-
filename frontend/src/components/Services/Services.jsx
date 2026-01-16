import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: '🌸',
      title: 'Buquês Personalizados',
      description: 'Criamos arranjos únicos para expressar seus sentimentos mais especiais.'
    },
    {
      icon: '💒',
      title: 'Casamentos',
      description: 'Buquês e decorações únicas para tornar seu dia especial inesquecível.'
    },
    {
      icon: '🌹',
      title: 'Funerais',
      description: 'Arranjos respeitosos e elegantes para homenagear momentos de despedida.'
    },
    {
      icon: '🚀',
      title: 'Entrega Expressa',
      description: 'Levamos carinho e beleza até você com nossa entrega rápida e cuidadosa.'
    }
  ];

  return (
    <section ref={sectionRef} className={`services ${isVisible ? 'services-visible' : ''}`}>
      <div className="services-container">
        <div className="services-header">
          <h2>Nossos Serviços</h2>
          <p>Transformamos momentos em memórias inesquecíveis</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="service-icon">
                <span className="emoji-icon">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;