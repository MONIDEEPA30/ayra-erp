import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Default admin credentials — change these as you like
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin@123',
  name: 'Admin',
  role: 'Administrator',
  email: 'admin@university.edu',
  // avatar: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('erp_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loginError, setLoginError] = useState('');

  const login = (username, password) => {
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const userData = {
        username: DEFAULT_ADMIN.username,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role,
        email: DEFAULT_ADMIN.email,
      };
      setUser(userData);
      localStorage.setItem('erp_admin_user', JSON.stringify(userData));
      setLoginError('');
      return true;
    } else {
      setLoginError('Invalid username or password.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erp_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
