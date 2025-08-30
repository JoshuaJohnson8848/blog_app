'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setUser(data);
        setNewName(data.name);
      } catch (error) {
        setMessage('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, password: newPassword || undefined }),
      });
      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        const err = await res.json();
        throw new Error(err.message);
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        {message && <p className="mb-4 text-sm {message.includes('success') ? 'text-green-600' : 'text-red-600'}">{message}</p>}
        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password (optional)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}