// src/authContext.js
import  { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => {
    // Perform authentication logic, set user data, and handle tokens
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, clear user data and tokens
    setUser(null);
    window.location.replace('/');
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
