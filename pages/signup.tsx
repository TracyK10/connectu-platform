import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    await signup(formData.name, formData.email, formData.password);
    router.push('/home');
  };

  return (
    <MainLayout title="Create your ConnectU account" className="bg-gray-50 dark:bg-slate-900" publicPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto py-16">
          <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">Sign up</h1>
          <div className="p-8 space-y-6 bg-white rounded-xl border border-gray-200 dark:bg-slate-900 dark:border-slate-800">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiUser className="w-5 h-5 text-gray-400" />
                  </div>
                  <input id="name" name="name" type="text" autoComplete="name" required className="block w-full h-11 pl-10 input" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiMail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full h-11 pl-10 input" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input id="password" name="password" type="password" autoComplete="new-password" required className="block w-full h-11 pl-10 input" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="block w-full h-11 pl-10 input" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" name="terms" type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">I agree to the <a href="#" className="text-primary-600 hover:text-primary-700">Terms</a> and <a href="#" className="text-primary-600 hover:text-primary-700">Privacy</a></label>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className={`w-full h-11 rounded-full text-sm font-medium text-white ${isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}>{isLoading ? 'Creating account...' : 'Sign up'}</button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link href="/login" className="text-primary-600 hover:text-primary-700">Log in</Link></p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
