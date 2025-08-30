'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/apiClient';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
  } | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { user: loggedUser } = useAuth();

  // Fetch user profile
  const fetchProfile = async () => {
    if (!loggedUser?.id) return;

    try {
      const data = await apiClient(`/user/${loggedUser.id}`);
      setUser(data?.data);
      setFullName(data?.data.fullName || '');
      setEmail(data?.data.email || '');
      setPhone(data?.data.phone || '');
    } catch (error) {
      setMessage('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [loggedUser?.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const updateData = {
      fullName,
      email,
      ...(phone && { phone }),
    };

    try {
      await apiClient(`/user/${user?._id}`, {
        method: 'PUT',
        body: updateData,
        auth: true
      });

      await fetchProfile();

      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Update failed. Please try again.');
    }
  };

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center mt-10">
          <p>Loading profile...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        {message && (
          <div
            className={`p-3 mb-4 text-sm rounded ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}