import PostCard from '@/components/PostCard';
import { apiClient } from '@/lib/apiClient';

export default async function HomePage() {
  let posts: any[] = [];

  try {
    let response = await apiClient('/blog/');
    posts = response.data || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

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