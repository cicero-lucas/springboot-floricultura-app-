import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';
import apiService from '../../services/api';
import { FlowerIcon, AddIcon } from '../../components/Icons/ModernIcons';
import { showSecureToast } from '../../utils/secureMessages';
import './ProdutoListPage.css';

const ProdutoListPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        console.log('Buscando produtos...');
        const response = await apiService.getProdutos();
        console.log('Resposta produtos:', response);
        setProdutos(response.produtos || []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setError(error.message);
        showSecureToast('error', 'load');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await apiService.deleteProduto(id);
        setProdutos(produtos.filter(produto => produto.id !== id));
        showSecureToast('success', 'delete');
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        showSecureToast('error', 'delete');
      }
    }
  };

  if (loading) {
    return (
      <DefaultLayout title="Produtos">
        <p>Carregando produtos...</p>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout title="Produtos">
        <div className="error-container">
          <p>Erro ao carregar produtos: {error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="produto-list-page">
        <div className="page-header">
          <h1 className="page-title">
            <FlowerIcon size={28} /> Produtos
          </h1>
          <Link to="/produtos/novo" className="add-button">
            <AddIcon size={18} /> Adicionar Produto
          </Link>
        </div>

        {produtos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum produto cadastrado ainda.</p>
          </div>
        ) : (
          <div>
            <p>Produtos encontrados: {produtos.length}</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map(produto => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td className="price-cell">R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')}</td>
                    <td className="quantity-cell">
                      <span className={`quantity-badge ${produto.quantidade < 10 ? 'low-stock' : produto.quantidade === 0 ? 'out-of-stock' : ''}`}>
                        {produto.quantidade}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/produtos/editar/${produto.id}`} className="edit-button">
                          ✏️ Editar
                        </Link>
                        <button onClick={() => handleDelete(produto.id)} className="delete-button">
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProdutoListPage;
