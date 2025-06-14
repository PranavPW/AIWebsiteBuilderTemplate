import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';
import { authStorage, mockApi, sanitizeInput, validateEmail, validatePassword } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const initAuth = () => {
      try {
        const token = authStorage.getToken();
        const userData = authStorage.getUser();
        
        if (token && userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        authStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const sanitizedEmail = sanitizeInput(email);
    
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Please enter a valid email address');
    }
    
    if (!validatePassword(password)) {
      throw new Error('Password must be at least 8 characters long');
    }

    setLoading(true);
    try {
      const { user: userData, token } = await mockApi.login(sanitizedEmail, password);
      
      authStorage.setToken(token);
      authStorage.setUser(userData);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    
    if (!sanitizedName.trim()) {
      throw new Error('Name is required');
    }
    
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Please enter a valid email address');
    }
    
    if (!validatePassword(password)) {
      throw new Error('Password must be at least 8 characters long');
    }

    setLoading(true);
    try {
      const { user: userData, token } = await mockApi.register(sanitizedName, sanitizedEmail, password);
      
      authStorage.setToken(token);
      authStorage.setUser(userData);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authStorage.clear();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    setLoading(true);
    try {
      const updatedUser = await mockApi.updateProfile(user.id, data);
      authStorage.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};