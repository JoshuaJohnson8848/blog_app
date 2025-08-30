'use client';

import CommentForm from './CommentForm';

export default function CommentSection({ comments, postId, refetchPost }: { comments: any, postId: any, refetchPost: any }) {
  console.log('comments', comments);

  const handleNewComment = () => {
    refetchPost()
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      <CommentForm postId={postId} onCommentAdded={handleNewComment} />

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment: any) => (
            <div key={comment._id} className="border-l-4 border-blue-200 pl-4 py-2 bg-white shadow-sm rounded">
              <p className="text-gray-800">{comment.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                — {comment.author},{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}