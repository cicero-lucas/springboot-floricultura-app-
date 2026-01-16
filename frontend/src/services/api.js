const API_URL = 'http://localhost:3000/api';

class ApiService {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Adicionar token apenas se não for o endpoint de registro
        if (token && !endpoint.includes('/register')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.location.href = '/login';
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição');
        }

        return data;
    }

    // Métodos de Clientes
    static getClientes() {
        return this.request('/clientes');
    }

    static getCliente(id) {
        return this.request(`/clientes/${id}`);
    }

    static createCliente(clienteData) {
        return this.request('/clientes', {
            method: 'POST',
            body: JSON.stringify(clienteData),
        });
    }

    static updateCliente(id, clienteData) {
        return this.request(`/clientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(clienteData),
        });
    }

    static deleteCliente(id) {
        return this.request(`/clientes/${id}`, {
            method: 'DELETE',
        });
    }

    // Métodos de Produtos
    static getProdutos() {
        return this.request('/produtos');
    }

    static getProduto(id) {
        return this.request(`/produtos/${id}`);
    }

    static createProduto(produtoData) {
        return this.request('/produtos', {
            method: 'POST',
            body: JSON.stringify(produtoData),
        });
    }

    static updateProduto(id, produtoData) {
        return this.request(`/produtos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(produtoData),
        });
    }

    static deleteProduto(id) {
        return this.request(`/produtos/${id}`, {
            method: 'DELETE',
        });
    }

    // Métodos de Vendas
    static getVendas() {
        return this.request('/vendas');
    }

    static getVenda(id) {
        return this.request(`/vendas/${id}`);
    }

    static createVenda(vendaData) {
        return this.request('/vendas', {
            method: 'POST',
            body: JSON.stringify(vendaData),
        });
    }

    static updateVenda(id, vendaData) {
        return this.request(`/vendas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(vendaData),
        });
    }

    static deleteVenda(id) {
        return this.request(`/vendas/${id}`, {
            method: 'DELETE',
        });
    }

    // Método de Registro de Usuário
    static registerUser(userData) {
        return this.request('/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }
}

export default ApiService;