import Image from 'next/image';
import { FaHeart, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import type { Post } from '../types';

interface PostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export default function Post({ post, onLike, onComment, onShare }: PostProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(post.id);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post.id);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
      <div className="flex items-start gap-3">
        <Image
          src={post.user.avatar}
          alt={`${post.user.name}'s avatar`}
          width={44}
          height={44}
          className="rounded-full h-11 w-11 object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{post.user.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.user.role}</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FaEllipsisH />
            </button>
          </div>

          <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{post.content}</p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.image && (
            <div className="mt-3 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post content"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="mt-3 grid grid-cols-3 text-gray-600 dark:text-gray-300 text-sm">
            <button onClick={handleLike} className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
              <FaHeart className="h-4 w-4" />
              <span>{post.likes}</span>
            </button>
            <button onClick={handleComment} className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
              <FaComment className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
            <button onClick={handleShare} className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
              <FaShare className="h-4 w-4" />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
