// src/context/AuthProvider.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem('sipakatau_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('sipakatau_user');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkStoredUser, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback((userData) => {
    const userWithRole = { role: 'user', points: 0, ...userData };
    setUser(userWithRole);
    localStorage.setItem('sipakatau_user', JSON.stringify(userWithRole));
    navigate('/dashboard');
  }, [navigate]);


  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sipakatau_user');
    navigate('/');
  }, [navigate]);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isLoading,
  }), [user, login, logout, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;