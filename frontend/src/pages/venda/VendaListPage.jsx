import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { MoneyIcon, AddIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import './VendaListPage.css';

const VendaListPage = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await apiService.getVendas();
        setVendas(response.vendas || []);
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
        showSecureToast('error', 'load');
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  };

  const calcularTotal = () => {
    return vendas.reduce((total, venda) => total + (parseFloat(venda.valor_total) || 0), 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
      try {
        await apiService.deleteVenda(id);
        setVendas(vendas.filter(venda => venda.id !== id));
        showSecureToast('success', 'delete');
      } catch (error) {
        console.error('Erro ao excluir venda:', error);
        showSecureToast('error', 'delete');
      }
    }
  };

  if (loading) {
    return (
      <DefaultLayout title="Vendas">
        <p>⏳ Carregando vendas...</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="venda-list-page">
        <div className="page-header">
          <h1 className="page-title">
            <MoneyIcon size={28} /> Vendas
          </h1>
          <Link to="/vendas/nova" className="add-button">
            <AddIcon size={18} /> Nova Venda
          </Link>
        </div>

        {vendas.length === 0 ? (
          <div className="empty-state">
            <p>📊 Nenhuma venda registrada ainda.</p>
          </div>
        ) : (
          <>
          <div className="total-vendas">
            <MoneyIcon size={18} color="#2d5016" />
            <span>Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>🆔 ID</th>
                  <th>👤 Cliente</th>
                  <th>💳 Pagamento</th>
                  <th>💰 Valor</th>
                  <th>📅 Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map(venda => (
                  <tr key={venda.id}>
                    <td>{venda.id}</td>
                    <td>👤 {venda.cliente}</td>
                    <td>
                      <span className={`payment-badge payment-${venda.forma_pagamento.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        💳 {venda.forma_pagamento}
                      </span>
                    </td>
                    <td className="value-cell">R$ {parseFloat(venda.valor_total || 0).toFixed(2).replace('.', ',')}</td>
                    <td className="date-cell">📅 {formatDate(venda.dt_venda)}</td>
                    <td>
                      <button onClick={() => handleDelete(venda.id)} className="delete-button">
                        🗑️ Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default VendaListPage;
