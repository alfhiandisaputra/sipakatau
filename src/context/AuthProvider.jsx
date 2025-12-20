// src/context/AuthProvider.jsx
import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const login = (userData) => {
    const userWithRole = { role: 'user', points: 0, ...userData };
    setUser(userWithRole);
    localStorage.setItem('sipakatau_user', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sipakatau_user');
  };

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isLoading,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;