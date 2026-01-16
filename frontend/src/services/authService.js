const API_URL = 'http://localhost:3000/api';

class AuthService {
    static async login(email, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro no login');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        
        return data;
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getAdmin() {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static async verifyToken() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                this.logout();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            this.logout();
            return false;
        }
    }
}

export default AuthService;