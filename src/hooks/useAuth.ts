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
    console.error('Failed to decode token');
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = getStoredUser();
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: any) => {
    localStorage.setItem('token', token);
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