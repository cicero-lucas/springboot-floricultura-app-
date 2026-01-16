import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/DefaultLayout.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const DefaultLayout = ({ children, title = 'Floricultura' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user') !== null;
    setIsLoggedIn(userLoggedIn);
  }, [location]);

  return (
    <div className="app-container">
      <Header></Header>
     

      <div className="container">
        <h1>{title}</h1>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
