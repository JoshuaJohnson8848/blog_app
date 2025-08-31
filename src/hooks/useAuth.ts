import { User } from '@/lib/types/user';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __user: any | null;
  }
}

function getStoredUser(): any | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const user_name = localStorage.getItem('user_name');
  const role = localStorage.getItem('role');

  if (!token) return null;

  try {
    return {
      id: userId,
      name: user_name || 'User',
      token: token || '',
      role: role || 'user',
    };
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = getStoredUser();
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async(token: any, userData: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_name', userData?.name);
    localStorage.setItem('role', userData?.role);
    localStorage.setItem('id', userData?.id);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setUser(null);
    window.location.href = '/';
  };

  return { user, loading, login, logout };
}