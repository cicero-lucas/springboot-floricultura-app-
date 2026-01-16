import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { UserIcon, AddIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import './ClienteListPage.css';

const ClienteListPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiService.getClientes();
        setClientes(response.clientes || []);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        showSecureToast('error', 'load');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await apiService.deleteCliente(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
        showSecureToast('success', 'delete');
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        showSecureToast('error', 'delete');
      }
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="cliente-list-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando clientes...</p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="cliente-list-page">
        <div className="page-header">
          <h1 className="page-title">
            <UserIcon size={28} /> Clientes
          </h1>
          <Link to="/clientes/novo" className="add-button">
            <AddIcon size={18} /> Adicionar Cliente
          </Link>
        </div>

        {clientes.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum cliente cadastrado ainda.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/clientes/editar/${cliente.id}`} className="edit-button">
                          ✏️ Editar
                        </Link>
                        <button onClick={() => handleDelete(cliente.id)} className="delete-button">
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ClienteListPage;
