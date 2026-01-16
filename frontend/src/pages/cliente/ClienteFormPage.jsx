import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { UserIcon, EmailIcon, PhoneIcon, IdIcon, SaveIcon, AddIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import '../../styles/FormStyles.css';

const ClienteFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [errors, setErrors] = useState([]);
  
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchCliente = async () => {
        try {
          const response = await apiService.getCliente(id);
          setFormData(response.cliente);
        } catch (error) {
          console.error('Erro ao carregar cliente:', error);
          showSecureToast('error', 'load');
        } finally {
          setLoading(false);
        }
      };
      fetchCliente();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    
    console.log('Enviando dados:', formData);
    
    try {
      if (isEditMode) {
        const result = await apiService.updateCliente(id, formData);
        console.log('Update result:', result);
      } else {
        const result = await apiService.createCliente(formData);
        console.log('Create result:', result);
      }
      showSecureToast('success', isEditMode ? 'update' : 'create');
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrors([error.message]);
      showSecureToast('error', 'save');
    }
  };

  if (loading) {
    return (
      <DefaultLayout title={isEditMode ? 'Editar Cliente' : 'Adicionar Cliente'}>
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title={isEditMode ? 'Editar Cliente' : 'Adicionar Cliente'}>
      <div className="modern-form-container">
        <div className="modern-form">
          <h1>
            <UserIcon size={32} color="#2d5016" />
            {isEditMode ? 'Editar Cliente' : 'Adicionar Cliente'}
          </h1>
          


          <form onSubmit={handleSubmit}>
            {isEditMode && <input type="hidden" name="id" value={formData.id || ''} />}
            
            <div className="form-grid two-columns">
              <div className="form-group">
                <label htmlFor="nome" className="form-label">
                  <UserIcon size={18} /> Nome
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
                <label htmlFor="cpf" className="form-label">
                  <IdIcon size={18} /> CPF
                </label>
                <input 
                  type="text" 
                  id="cpf" 
                  name="cpf" 
                  value={formData.cpf} 
                  onChange={handleChange} 
                  className="form-input"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <EmailIcon size={18} /> Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefone" className="form-label">
                  <PhoneIcon size={18} /> Telefone
                </label>
                <input 
                  type="text" 
                  id="telefone" 
                  name="telefone" 
                  value={formData.telefone} 
                  onChange={handleChange} 
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isEditMode ? (
                  <><SaveIcon size={18} /> Salvar Alterações</>
                ) : (
                  <><AddIcon size={18} /> Adicionar Cliente</>
                )}
              </button>
              <Link to="/clientes" className="btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ClienteFormPage;
