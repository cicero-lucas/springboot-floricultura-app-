import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { FlowerIcon, ProductIcon, MoneyIcon, NumberIcon, SaveIcon, AddIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import '../../styles/FormStyles.css';

const ProdutoFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [errors, setErrors] = useState([]);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProduto = async () => {
        try {
          const response = await apiService.getProduto(id);
          setFormData(response.produto);
        } catch (error) {
          console.error('Erro ao carregar produto:', error);
          showSecureToast('error', 'load');
        } finally {
          setLoading(false);
        }
      };
      fetchProduto();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    
    console.log('Enviando produto:', formData);
    
    try {
      if (isEditMode) {
        const result = await apiService.updateProduto(id, formData);
        console.log('Update result:', result);
      } else {
        const result = await apiService.createProduto(formData);
        console.log('Create result:', result);
      }
      showSecureToast('success', isEditMode ? 'update' : 'create');
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErrors([error.message]);
      showSecureToast('error', 'save');
    }
  };

  if (loading) {
    return (
      <DefaultLayout title={isEditMode ? 'Editar Produto' : 'Adicionar Produto'}>
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title={isEditMode ? 'Editar Produto' : 'Adicionar Produto'}>
      <div className="modern-form-container">
        <div className="modern-form">
          <h1>
            <FlowerIcon size={32} color="#2d5016" />
            {isEditMode ? 'Editar Produto' : 'Adicionar Produto'}
          </h1>
          


          <form onSubmit={handleSubmit}>
            {isEditMode && <input type="hidden" name="id" value={formData.id || ''} />}
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome" className="form-label">
                  <FlowerIcon size={18} /> Nome do Produto
                </label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  value={formData.nome} 
                  onChange={handleChange} 
                  className="form-input"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descricao" className="form-label">
                  <ProductIcon size={18} /> Descrição
                </label>
                <textarea 
                  id="descricao" 
                  name="descricao" 
                  value={formData.descricao} 
                  onChange={handleChange} 
                  className="form-textarea"
                  rows="4" 
                />
              </div>
              
              <div className="form-grid two-columns">
                <div className="form-group">
                  <label htmlFor="preco" className="form-label">
                    <MoneyIcon size={18} /> Preço
                  </label>
                  <input 
                    type="text" 
                    id="preco" 
                    name="preco" 
                    value={formData.preco} 
                    onChange={handleChange} 
                    className="form-input"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="quantidade" className="form-label">
                    <NumberIcon size={18} /> Quantidade
                  </label>
                  <input 
                    type="number" 
                    id="quantidade" 
                    name="quantidade" 
                    value={formData.quantidade} 
                    onChange={handleChange} 
                    className="form-input"
                    required 
                    min="0" 
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isEditMode ? (
                  <><SaveIcon size={18} /> Salvar Alterações</>
                ) : (
                  <><AddIcon size={18} /> Adicionar Produto</>
                )}
              </button>
              <Link to="/produtos" className="btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProdutoFormPage;
