import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = AuthService.getToken();

        
        console.log('Verificando auth:', { token: !!token});
        
        if (token ) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setAdmin(null);
        }
        
        setLoading(false);
    };

    const login = async (email, password) => {
        const data = await AuthService.login(email, password);
        console.log('Login realizado:', data);
        setIsAuthenticated(true);

        return data;
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        console.log('Logout realizado');
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};