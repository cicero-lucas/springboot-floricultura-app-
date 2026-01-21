const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
    static async login(email, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || data.error || 'Erro no login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
      
        return data;
    }

    static logout() {
        localStorage.removeItem('token');
     
    }

    static getToken() {
        return localStorage.getItem('token');
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