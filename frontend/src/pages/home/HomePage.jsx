import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <Header />
        <Hero />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
