'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

export default function CommentForm({
  postId,
  onCommentAdded,
}: {
  postId: string;
  onCommentAdded: (comment: string) => void;
}) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await apiClient(`/comment`, {
        method: 'POST',
        body: { comment: content, postId: postId },
      });

      onCommentAdded(newComment);
      setContent('');
    } catch (error) {
      console.log(error);
      alert('Failed to add comment. Are you logged in?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}