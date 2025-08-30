'use client'

import PostCard from '@/components/PostCard';
import { apiClient } from '@/lib/apiClient';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await apiClient('/blog/');
      setPosts(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}