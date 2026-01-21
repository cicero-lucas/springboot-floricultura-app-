import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import HomePage from './pages/home/HomePage';
import ClienteListPage from './pages/cliente/ClienteListPage';
import ClienteFormPage from './pages/cliente/ClienteFormPage';
import ProdutoListPage from './pages/produto/ProdutoListPage';
import ProdutoFormPage from './pages/produto/ProdutoFormPage';
import VendaListPage from './pages/venda/VendaListPage';
import VendaFormPage from './pages/venda/VendaFormPage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/errors/NotFoundPage';
import CadastroPage from './pages/cadastro/CadastroPage';

// Import components and contexts
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ToastContainer from './components/Toast/ToastContainer';

// Import styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/cadastro" element={<CadastroPage />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          
          {/* Clientes */}
          <Route path="/clientes" element={<ProtectedRoute><ClienteListPage /></ProtectedRoute>} />
          <Route path="/clientes/novo" element={<ProtectedRoute><ClienteFormPage /></ProtectedRoute>} />
          <Route path="/clientes/editar/:id" element={<ProtectedRoute><ClienteFormPage /></ProtectedRoute>} />
          
          {/* Produtos */}
          <Route path="/produtos" element={<ProtectedRoute><ProdutoListPage /></ProtectedRoute>} />
          <Route path="/produtos/novo" element={<ProtectedRoute><ProdutoFormPage /></ProtectedRoute>} />
          <Route path="/produtos/editar/:id" element={<ProtectedRoute><ProdutoFormPage /></ProtectedRoute>} />
          
          {/* Vendas */}
          <Route path="/vendas" element={<ProtectedRoute><VendaListPage /></ProtectedRoute>} />
          <Route path="/vendas/nova" element={<ProtectedRoute><VendaFormPage /></ProtectedRoute>} />

          {/* Redirect /index.php to / */}
          <Route path="/index.php" element={<Navigate to="/" replace />} />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
