'use client';

import PostCard from '@/components/PostCard';
import { apiClient } from '@/lib/apiClient';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      let url = '/blog/';
      if (debouncedSearchTerm) {
        url += `?keyword=${encodeURIComponent(debouncedSearchTerm)}`;
      }

      const response = await apiClient(url);
      setPosts(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {debouncedSearchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            Searching for: <strong>{debouncedSearchTerm}</strong>
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}