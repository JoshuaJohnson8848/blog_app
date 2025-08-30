'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser({ name: decoded.name || 'User', role: decoded.role });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          <a href="/">BlogApp</a>
        </h1>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:underline">Home</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
              {user.role === 'admin' && (
                <a href="/admin/users" className="hover:underline text-red-600">Admin</a>
              )}
              <button onClick={handleLogout} className="text-red-600 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/auth/login" className="hover:underline">Login</a>
              <a href="/auth/register" className="hover:underline">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}