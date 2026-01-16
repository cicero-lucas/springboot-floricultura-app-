// Mensagens genéricas para garantir segurança
export const getSecureMessage = (type, action = '') => {
  const messages = {
    success: {
      save: 'Operação realizada com sucesso',
      create: 'Item criado com sucesso',
      update: 'Item atualizado com sucesso',
      delete: 'Item removido com sucesso',
      default: 'Operação concluída'
    },
    error: {
      save: 'Erro ao processar solicitação',
      create: 'Erro ao criar item',
      update: 'Erro ao atualizar item',
      delete: 'Erro ao remover item',
      load: 'Erro ao carregar dados',
      network: 'Erro de conexão',
      validation: 'Dados inválidos',
      default: 'Erro interno do sistema'
    },
    warning: {
      validation: 'Verifique os dados informados',
      permission: 'Acesso não autorizado',
      default: 'Atenção necessária'
    },
    info: {
      loading: 'Carregando dados...',
      processing: 'Processando...',
      default: 'Informação'
    }
  };

  return messages[type]?.[action] || messages[type]?.default || 'Operação processada';
};

// Função helper para mostrar toast seguro
export const showSecureToast = (type, action = '') => {
  const message = getSecureMessage(type, action);
  if (window.showToast) {
    window.showToast(message, type);
  }
};