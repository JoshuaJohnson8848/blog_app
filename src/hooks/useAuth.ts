import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __user: any | null;
  }
}

function getStoredUser(): any | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      _id: payload.id,
      name: payload.name || 'User',
      email: payload.email || '',
      role: payload.role || 'user',
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
    setUser(null);
    window.location.href = '/';
  };

  return { user, loading, login, logout };
}