'use client'

import PostCard from '@/components/PostCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { Post } from '@/lib/types/post';
import { confirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { showToast } from 'react-next-toast';

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
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

      const response = await apiClient(url, { auth: true });

      setPosts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { confirmed } = await confirm({
        title: "Confirm Action ?",
        description: "This action cannot be undone.",
        confirmationText: "Yes, Confirm",
        cancellationText: "Cancel",
      });

      if (confirmed) {
        const response = await apiClient(`/blog/${id}`, { method: 'DELETE', auth: true });
        if (!response) throw new Error('Failed to delete post');
        location.reload();
        showToast.success("Post deleted successfully!", 3000)
      }

    } catch (error) {
      console.error('Failed to delete post:', error);
      showToast.success("Seomthing went wrong!", 3000)
    } finally {
      setLoading(false);
      fetchPosts();
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [debouncedSearchTerm]);

  if (loading) {
    return <p className="text-gray-600">Loading posts...</p>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">My Posts</h1>
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

        <a
          href="/posts/create"
          className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Post
        </a>
        {posts.length === 0 ? (
          <p className="text-gray-600">{`No posts found.`}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="relative">
                <PostCard post={post} />
                <div className="mt-2 space-x-2">
                  <a
                    href={`/posts/${post._id}/edit`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    onClick={async () => { deletePost(post._id) }}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}