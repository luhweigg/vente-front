import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await api.checkAuth();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}