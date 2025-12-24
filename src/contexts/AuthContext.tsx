'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/api/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: number | null;
  login: (userData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Load user object from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Extract token and userId from stored user object
          if (userData.token) {
            setToken(userData.token);
          }
          if (userData.userId) {
            setUserId(userData.userId);
          } else if (userData.id) {
            setUserId(userData.id);
          }
        } catch (e) {
          console.error('Failed to parse stored user:', e);
        }
      }
    }
  }, []);

  const login = (userData: any) => {
    // Store the full user object with token and userId
    const userObject = {
      ...userData,
      token: userData.token,
      userId: userData.userId || userData.id,
    };
    
    setUser(userObject);
    setToken(userObject.token);
    setUserId(userObject.userId || userObject.id);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userObject));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserId(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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

