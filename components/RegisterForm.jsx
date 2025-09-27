import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { saveTokens } from '../lib/auth-tokens';
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// Registration mutation per backend guide
const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password1: String!, $password2: String!) {
    register(email: $email, username: $username, password1: $password1, password2: $password2) {
      success
      errors
      token
      refreshToken
    }
  }
`;

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

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [serverError, setServerError] = useState('');
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const apollo = useApolloClient();

  const [doRegister, { loading, error }] = useMutation(REGISTER_MUTATION, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      const res = data?.register;
      const ok = res?.success;
      const at = res?.token;
      const rt = res?.refreshToken;

      if (ok) {
        // If backend returns tokens on register, save them; else redirect to login
        if (at) saveTokens(at, rt);
        if (typeof window !== 'undefined') {
          if (at) {
            window.location.assign('/home');
            return;
          }
          // If no token came back, try to auto-login using the entered credentials
          (async () => {
            try {
              const attempts = [
                { username: email, password: password1 },
                { username: username, password: password1 },
              ];
              for (const vars of attempts) {
                const resLogin = await apollo.mutate({ mutation: LOGIN_MUTATION, variables: vars, errorPolicy: 'all' });
                const auth = resLogin?.data?.tokenAuth;
                if (auth?.success && auth?.token) {
                  saveTokens(auth.token, auth.refreshToken);
                  window.location.assign('/home');
                  return;
                }
              }
              // Fallback: go to login if auto-login did not succeed
              window.location.assign('/login');
            } catch {
              window.location.assign('/login');
            }
          })();
        }
      } else {
        // Attempt to extract a human-readable message from nested errors
        let msg = 'Registration failed. Please check inputs or verify email.';
        if (typeof res?.errors === 'string') {
          msg = res.errors;
        } else if (res?.errors && typeof res.errors === 'object') {
          try {
            const firstKey = Object.keys(res.errors)[0];
            const firstVal = res.errors[firstKey];
            if (Array.isArray(firstVal)) msg = firstVal[0];
            else if (typeof firstVal === 'string') msg = firstVal;
          } catch {}
        }
        setServerError(String(msg));
      }
    },
    onError: (e) => setServerError(String(e?.message || 'Registration failed')),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (password1 !== password2) {
      setServerError("Passwords don't match.");
      return;
    }
    await doRegister({ variables: { email, username, password1, password2 } });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiMail className="w-5 h-5 text-gray-400" />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input h-11 w-full pl-10" placeholder="you@example.com" required />
        </div>
      </div>
      <div>
        <label className="block text-sm">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiUser className="w-5 h-5 text-gray-400" />
          </div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="input h-11 w-full pl-10" placeholder="username" required />
        </div>
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiLock className="w-5 h-5 text-gray-400" />
          </div>
          <input type={showPwd1 ? 'text' : 'password'} value={password1} onChange={(e) => setPassword1(e.target.value)} className="input h-11 w-full pl-10 pr-10" placeholder="Password" required />
          <button type="button" onClick={() => setShowPwd1((v) => !v)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
            {showPwd1 ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiLock className="w-5 h-5 text-gray-400" />
          </div>
          <input type={showPwd2 ? 'text' : 'password'} value={password2} onChange={(e) => setPassword2(e.target.value)} className="input h-11 w-full pl-10 pr-10" placeholder="Confirm password" required />
          <button type="button" onClick={() => setShowPwd2((v) => !v)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600">
            {showPwd2 ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
        For your security, use a strong password: at least 12 characters, with one uppercase letter, one number, and one special character.
      </p>
      {serverError && <div className="text-red-600 text-sm" role="alert">{serverError}</div>}
      <button type="submit" disabled={loading} className="w-full h-11 rounded-full text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed">
        {loading ? 'Creating account…' : 'Sign up'}
      </button>
    </form>
  );
}
