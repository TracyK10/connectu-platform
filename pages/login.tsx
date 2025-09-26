import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMail, FiLock } from 'react-icons/fi';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { saveTokens } from '../lib/auth-tokens';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const { login, user, initialized } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState('');

  const [doLogin] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
    onCompleted: (data: any) => {
      const res = data?.tokenAuth;
      if (res?.success && res?.token) {
        saveTokens(res.token, res.refreshToken);
        router.push('/home');
        return;
      }
      const msg = typeof res?.errors === 'string' ? res.errors : 'Invalid credentials or account not active.';
      setServerError(msg);
      setIsLoading(false);
    },
    onError: (e: any) => {
      setServerError(e.message || 'Login failed');
      setIsLoading(false);
    },
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
    setServerError('');
    setIsLoading(true);
    await doLogin({ variables: { username: formData.email, password: formData.password } });
  };

  return (
    <MainLayout title="Log in to ConnectU" className="bg-gray-50 dark:bg-slate-900" publicPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto py-16">
          <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">Log in to ConnectU</h1>
          <div className="p-8 space-y-6 bg-white rounded-xl border border-gray-200 dark:bg-slate-900 dark:border-slate-800">
            {/* GraphQL-backed login that saves access/refresh tokens */}
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
              {serverError && (
                <div className="text-red-600 text-sm" role="alert">{serverError}</div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 rounded-full text-sm font-medium text-white ${isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account? <Link href="/signup" className="text-primary-600 hover:text-primary-700">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
