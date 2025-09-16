import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/Post';
import { useRouter } from 'next/router';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: '',
      },
      content: 'Just launched our new product! Check it out and let me know what you think. #excited #launch',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      likes: 42,
      comments: 8,
      shares: 3,
      timeAgo: '2h ago',
    },
    {
      id: '2',
      user: {
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: '',
      },
      content: 'Beautiful day for a hike! Nature is truly healing. 🏞️ #nature #hiking #weekendvibes',
      likes: 128,
      comments: 24,
      shares: 7,
      timeAgo: '5h ago',
    },
  ]);

  const handlePostSubmit = (payload: { content: string; image?: string }) => {
    if (!payload.content.trim() && !payload.image) return;
    const post: Post = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        username: 'currentuser',
        avatar: '',
      },
      content: payload.content,
      image: payload.image,
      likes: 0,
      comments: 0,
      shares: 0,
      timeAgo: 'Just now',
    };
    setPosts([post, ...posts]);
  };

  return (
    <MainLayout title="Home | ConnectU">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <CreatePost onSubmit={handlePostSubmit} />
          {posts.map((post) => (
            <div key={post.id} onClick={() => router.push(`/posts/${post.id}`)} className="cursor-pointer">
              <PostCard post={{
                id: post.id,
                user: { id: `${post.id}-user`, name: post.user.name, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', handle: '@user', role: 'User' },
                content: post.content,
                image: post.image,
                timestamp: post.timeAgo,
                likes: post.likes,
                comments: post.comments,
                shares: post.shares,
                tags: [],
              }} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
