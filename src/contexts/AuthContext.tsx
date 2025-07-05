import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated and session is valid
    const authStatus = localStorage.getItem('isAuthenticated');
    const sessionToken = localStorage.getItem('sessionToken');
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    
    if (authStatus === 'true' && sessionToken && sessionExpiry) {
      const expiryTime = parseInt(sessionExpiry, 10);
      const currentTime = Date.now();
      
      if (currentTime < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Session expired, clean up
        logout();
      }
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionExpiry');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}