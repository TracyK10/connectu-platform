export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophia Carter',
    handle: '@sophiacarter',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'Software Engineer',
  },
  {
    id: '2',
    name: 'Olivia Bennett',
    handle: '@oliviab',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'Travel Enthusiast',
  },
  {
    id: '3',
    name: 'Ava Harper',
    handle: '@avaharper',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'Food Blogger',
  },
  {
    id: '4',
    name: 'Isabella Clark',
    handle: '@bella_clark',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'Fitness Coach',
  },
  {
    id: '5',
    name: 'Mia Turner',
    handle: '@miaturner',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    role: 'Artist',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'Just finished a 6-hour coding session! 🚀 Working on a new feature for our project using Next.js and TypeScript. #coding #webdev #typescript',
    timestamp: '2h ago',
    likes: 24,
    comments: 5,
    shares: 2,
    tags: ['#coding', '#webdev', '#typescript'],
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Beautiful sunset at Santorini today! 🌅 The views here are absolutely breathtaking. #travel #santorini #sunset',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    timestamp: '5h ago',
    likes: 142,
    comments: 23,
    shares: 15,
    tags: ['#travel', '#santorini', '#sunset'],
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Just made these delicious avocado toasts with poached eggs for brunch! 🥑🍳 Recipe in my latest blog post. #foodie #brunch #avocadotoast',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    timestamp: '1d ago',
    likes: 89,
    comments: 12,
    shares: 7,
    tags: ['#foodie', '#brunch', '#avocadotoast'],
  },
  {
    id: '4',
    user: mockUsers[3],
    content: 'Morning workout complete! 💪 30 minutes of HIIT followed by 20 minutes of yoga. What\'s your workout routine today? #fitness #workout #healthylifestyle',
    timestamp: '1d ago',
    likes: 56,
    comments: 8,
    shares: 3,
    tags: ['#fitness', '#workout', '#healthylifestyle'],
  },
  {
    id: '5',
    user: mockUsers[4],
    content: 'New painting inspired by the ocean waves. Acrylic on canvas, 24x36". What do you think? #art #painting #ocean',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    timestamp: '2d ago',
    likes: 203,
    comments: 34,
    shares: 28,
    tags: ['#art', '#painting', '#ocean'],
  },
];
