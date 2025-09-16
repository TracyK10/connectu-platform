import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { FiHome, FiCompass, FiMessageSquare, FiBell, FiSearch } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const navItems = [
    { name: 'Home', path: '/home', icon: <FiHome className="w-4 h-4" /> },
    { name: 'Explore', path: '/explore', icon: <FiCompass className="w-4 h-4" /> },
    { name: 'Notifications', path: '/notifications', icon: <FiBell className="w-4 h-4" /> },
    { name: 'Messages', path: '/messages', icon: <FiMessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-slate-900'
      }`}
    >
      <div className="container flex items-center h-16 px-4 mx-auto">
        {/* Left: Logo */}
        <Link href="/home" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 text-white rounded-md bg-primary-600">
            <img
              src="/images/icons/Vector - 0.svg"
              alt="ConnectU Logo"
              className="w-6 h-6"
            />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">ConnectU</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center mx-auto space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                router.pathname === item.path
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
              }`}
            >
              <span className="inline-flex items-center gap-2">{item.icon}<span className="hidden sm:inline">{item.name}</span></span>
            </Link>
          ))}
        </nav>

        {/* Right: Search + Avatar */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center w-56">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full h-9 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 rounded-full border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:bg-slate-800 dark:text-gray-200"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center justify-center w-9 h-9 overflow-hidden text-white bg-gray-300 rounded-full dark:bg-slate-700">
              <span className="text-sm font-medium">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden">
                <button onClick={() => { setMenuOpen(false); router.push('/profile'); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800">Profile</button>
                <button onClick={() => { setMenuOpen(false); router.push('/edit-profile'); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800">Edit Profile</button>
                <button onClick={() => { setMenuOpen(false); logout(); router.push('/login'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-800">Log out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full h-10 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 rounded-full border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:bg-slate-800 dark:text-gray-200"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
