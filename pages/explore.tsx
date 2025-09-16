import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { FiSearch, FiHash, FiUsers, FiImage } from 'react-icons/fi';

interface TrendingTopic {
  id: string;
  name: string;
  category: string;
  posts: number;
}

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  isVerified: boolean;
  isFollowing: boolean;
}

export default function Explore() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics: TrendingTopic[] = [
    { id: '1', name: 'TechNews', category: 'Technology', posts: 12500 },
    { id: '2', name: 'WebDev', category: 'Technology', posts: 8450 },
    { id: '3', name: 'ReactJS', category: 'Programming', posts: 15600 },
    { id: '4', name: 'StartupLife', category: 'Business', posts: 9200 },
    { id: '5', name: 'RemoteWork', category: 'Business', posts: 11200 },
  ];

  const suggestedUsers: SuggestedUser[] = [
    { id: '1', name: 'Alex Johnson', username: 'alexjdev', isVerified: true, isFollowing: false },
    { id: '2', name: 'Sarah Miller', username: 'sarahcodes', isVerified: true, isFollowing: true },
    { id: '3', name: 'Mike Chen', username: 'mikechen', isVerified: false, isFollowing: false },
    { id: '4', name: 'Tech Insights', username: 'techinsights', isVerified: true, isFollowing: true },
    { id: '5', name: 'Dev Community', username: 'devcommunity', isVerified: true, isFollowing: false },
  ];

  const filteredTopics = trendingTopics.filter(topic => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = suggestedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Explore | ConnectU">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="sticky top-16 z-10 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-3 pl-12 pr-4 text-gray-900 bg-gray-100 border-0 rounded-full dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="Search ConnectU"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 border-b border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                activeTab === 'trending'
                  ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                activeTab === 'people'
                  ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              People
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                activeTab === 'photos'
                  ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Photos
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'trending' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
              
              {searchQuery && filteredTopics.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <FiSearch className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No topics found matching &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(searchQuery ? filteredTopics : trendingTopics).map((topic) => (
                    <div key={topic.id} className="p-4 transition-colors duration-200 bg-white rounded-lg shadow-sm dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <FiHash className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <h3 className="font-medium text-gray-900 dark:text-white">{topic.name}</h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{topic.category} • {topic.posts.toLocaleString()} posts</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-primary-600 border border-primary-600 rounded-full dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700">
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'people' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">People to Follow</h2>
              
              {searchQuery && filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <FiUsers className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No people found matching &quot;{searchQuery}&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(searchQuery ? filteredUsers : suggestedUsers).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 transition-colors duration-200 bg-white rounded-lg shadow-sm dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-slate-700"></div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                            {user.isVerified && (
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                      <button 
                        className={`px-4 py-2 text-sm font-medium rounded-full ${
                          user.isFollowing 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600' 
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {user.isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Photos</h2>
              
              {searchQuery ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <FiImage className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>Search is not available for photos. Try another tab.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden dark:bg-slate-700">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
