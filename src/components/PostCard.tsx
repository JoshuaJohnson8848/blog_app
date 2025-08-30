import Link from 'next/link';

export default function PostCard({ post }: { post: any }) {
    return (
        <div className="border rounded-lg p-5 shadow-sm bg-white hover:shadow transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-2">
                By {typeof post.author === 'object' ? post.author.name : 'Unknown'} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-3 text-gray-700 line-clamp-3">{post.content}</p>
            <Link
                href={`/blog/${post._id}`}
                className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline"
            >
                Read More →
            </Link>
        </div>
    );
}