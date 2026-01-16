import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { UserIcon, MoneyIcon, FlowerIcon, NumberIcon, SaveIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import '../../styles/FormStyles.css';

const VendaFormPage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    forma_pagamento: '',
    produto_id: '',
    quantidade: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, produtosRes] = await Promise.all([
          apiService.getClientes(),
          apiService.getProdutos()
        ]);
        setClientes(clientesRes.clientes || []);
        setProdutos(produtosRes.produtos || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showSecureToast('error', 'load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vendaData = {
        cliente_id: formData.cliente_id,
        forma_pagamento: formData.forma_pagamento,
        itens: [{
          produto_id: formData.produto_id,
          quantidade: formData.quantidade
        }]
      };
      await apiService.createVenda(vendaData);
      showSecureToast('success', 'create');
      navigate('/vendas');
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      showSecureToast('error', 'save');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <DefaultLayout title="Registrar Venda">
        <div className="loading-container">
          <p>Carregando dados...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title="Registrar Venda">
      <div className="modern-form-container">
        <div className="modern-form">
          <h1>
            <MoneyIcon size={32} color="#2d5016" />
            Registrar Venda
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="cliente_id" className="form-label">
                  <UserIcon size={18} /> Cliente
                </label>
                <select 
                  id="cliente_id" 
                  name="cliente_id" 
                  value={formData.cliente_id} 
                  onChange={handleChange} 
                  className="form-select"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="forma_pagamento" className="form-label">
                  <MoneyIcon size={18} /> Forma de Pagamento
                </label>
                <select 
                  id="forma_pagamento" 
                  name="forma_pagamento" 
                  value={formData.forma_pagamento} 
                  onChange={handleChange} 
                  className="form-select"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Pix">Pix</option>
                  <option value="Transferência">Transferência</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h3 style={{ color: '#2d5016', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FlowerIcon size={24} /> Produtos da Venda
              </h3>
              
              <div className="form-grid two-columns">
                <div className="form-group">
                  <label className="form-label">
                    <FlowerIcon size={18} /> Produto
                  </label>
                  <select 
                    name="produto_id" 
                    value={formData.produto_id} 
                    onChange={handleChange} 
                    className="form-select"
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {produtos.map(produto => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} (R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <NumberIcon size={18} /> Quantidade
                  </label>
                  <input 
                    type="number" 
                    name="quantidade" 
                    value={formData.quantidade} 
                    onChange={handleChange} 
                    className="form-input"
                    min="1" 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <SaveIcon size={18} /> Finalizar Venda
              </button>
              <Link to="/vendas" className="btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VendaFormPage;
