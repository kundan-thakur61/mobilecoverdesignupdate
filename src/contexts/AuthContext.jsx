import { createContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defer token validation to idle time — never block initial render/FCP
    const token = localStorage.getItem('token');
    if (token) {
      const validate = () => {
        authAPI.getMe()
          .then(response => {
            setUser(response.user || response);
          })
          .catch(() => {
            localStorage.removeItem('token');
          })
          .finally(() => {
            setLoading(false);
          });
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(validate, { timeout: 2000 });
      } else {
        setTimeout(validate, 100);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data?.data || response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response.data?.data || response.data;
      
      localStorage.setItem('token', token);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};