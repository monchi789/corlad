import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  groups: string[];
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  hasGroup: (...groups: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getDecodedToken(token: string): DecodedToken | null {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('authToken');
      if (token) {
        const decodedToken = getDecodedToken(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decodedToken);
        } else {
          Cookies.remove('authToken');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 1 });
    const decodedToken = getDecodedToken(token);
    if (decodedToken) {
      setIsAuthenticated(true);
      setUser(decodedToken);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const hasGroup = (...groups: string[]): boolean => {
    return user ? groups.some(group => user.groups.includes(group)) : false;
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasGroup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
