'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { User } from '@/lib/types/user';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient('/user?type=user', { auth: true });
        setUsers(Array.isArray(data?.data) ? data?.data : []);
      } catch (error) {
        alert('Failed to load users');
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      await apiClient(`/api/users/${id}`, { method: 'DELETE', auth: true });
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error);
      alert('Failed to delete user');
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border">{user.fullName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border capitalize">{user.phone}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
}