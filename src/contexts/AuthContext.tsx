import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'translator' | 'admin' | null;

interface User {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  translatorLevel?: string;
  ratingStats?: {
    accuracy: number;
    timeliness: number;
    attitude: number;
    average: number;
    count: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'role'>) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Omit<User, 'role'>) => {
    setUser({ ...userData, role: null });
  };

  const setRole = (role: UserRole) => {
    setUser(prev => prev ? { ...prev, role } : null);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, setRole, logout, updateUser }}>
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
