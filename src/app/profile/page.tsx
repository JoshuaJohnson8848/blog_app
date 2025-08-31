'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/apiClient';
import { User } from '@/lib/types/user';
import { confirm } from 'material-ui-confirm';
import { useState, useEffect } from 'react';
import { showToast } from 'react-next-toast';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { user: loggedUser } = useAuth();

  const fetchProfile = async () => {
    if (!loggedUser?.id) return;

    try {
      const data = await apiClient(`/user/${loggedUser.id}`);
      setUser(data?.data);
      setFullName(data?.data.fullName || '');
      setEmail(data?.data.email || '');
      setPhone(data?.data.phone || '');
    } catch (error) {
      console.log(error);

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
      const { confirmed } = await confirm({
        title: "Confirm Action ?",
        description: "This action cannot be undone.",
        confirmationText: "Yes, Confirm",
        cancellationText: "Cancel",
      });

      if (confirmed) {
        await apiClient(`/user/${user?._id}`, {
          method: 'PUT',
          body: updateData,
          auth: true
        });

        await fetchProfile();
        showToast.success("Profile updated successfully!", 3000)
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast.error("Update failed. Please try again", 3000)
      } else {
        console.log('An unknown error occurred');
      }
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
            className={`p-3 mb-4 text-sm rounded ${message.includes('successfully')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
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