// src/authContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there's a stored user in localStorage on component mount
    // and set the user accordingly
    const storedUser = localStorage.getItem('user');
    if (storedUser && user === null) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]); // Add user as a dependency

  const login = (userData) => {
    // Perform authentication logic, set user data, and handle tokens
    setUser(userData);

    // Persist the user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Perform logout logic, clear user data and tokens
    setUser(null);

    // Clear the user data from localStorage
    localStorage.removeItem('user');

    window.location.replace('/');
  };

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
