'use client';

import { use, useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import { Post } from '@/lib/types/post';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }: any = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOnePost = async () => {
    try {
      setLoading(true);
      const response = await apiClient(`/blog/${id}`);
      setPost(response?.data || null);
    } catch (error) {
      console.error('Fetch error:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnePost();
  }, [params]);

  if (loading) return <p>Loading...</p>;
  if (!post) return notFound();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-6" />
      <article className="prose lg:prose-xl max-w-none">
        <p className="whitespace-pre-line text-lg">{post.content}</p>
      </article>

      <div className="mt-12">
        <CommentSection
          comments={post?.comments || []}
          postId={post?._id}
          refetchPost={fetchOnePost}
        />
      </div>
    </div>
  );
}