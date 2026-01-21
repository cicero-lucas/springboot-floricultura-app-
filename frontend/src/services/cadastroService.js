const API_URL = import.meta.env.VITE_API_URL;


class cadastroService {
    static async cadastro(name, email, password) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || data.error || 'Erro no cadastro');
        }

        const data = await response.json();
        return data;
    }

}

export default cadastroService;