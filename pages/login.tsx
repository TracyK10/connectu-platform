import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMail, FiLock } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, user, initialized } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(formData.email, formData.password);
    router.push('/home');
  };

  return (
    <MainLayout title="Log in to ConnectU" className="bg-gray-50 dark:bg-slate-900" publicPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto py-16">
          <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">Log in to ConnectU</h1>
          <div className="p-8 space-y-6 bg-white rounded-xl border border-gray-200 dark:bg-slate-900 dark:border-slate-800">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiMail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full h-11 pl-10 input"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full h-11 pl-10 input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700" />
                  <label htmlFor="remember-me" className="text-gray-700 dark:text-gray-300">Remember me</label>
                </div>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 rounded-full text-sm font-medium text-white ${isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account? <Link href="/signup" className="text-primary-600 hover:text-primary-700">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
