// 'use client'
import PostCard from '@/components/PostCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';

export default async function PostListPage() {
  let posts: any[] = [];

  try {
    let response = await apiClient('/blog/');
    posts = response.data || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    // <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">My Posts</h1>
        <a
          href="/posts/create"
          className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Post
        </a>
        {posts.length === 0 ? (
          <p className="text-gray-600">You haven't created any posts yet.</p>
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
                    // onClick={async () => {
                    //   if (confirm('Delete this post?')) {
                    //     await apiClient(`/blog/${post._id}`, { method: 'DELETE' });
                    //     location.reload();
                    //   }
                    // }}
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
    // </ProtectedRoute>
  );
}