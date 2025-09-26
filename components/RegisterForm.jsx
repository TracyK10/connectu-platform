import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { saveTokens } from '../lib/auth-tokens';

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

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [serverError, setServerError] = useState('');

  const [doRegister, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      const res = data?.register;
      const ok = res?.success;
      const at = res?.token;
      const rt = res?.refreshToken;

      if (ok) {
        // If backend returns tokens on register, save them; else redirect to login
        if (at) saveTokens(at, rt);
        if (typeof window !== 'undefined') {
          // If token was issued, go home; else ask user to log in
          window.location.href = at ? '/home' : '/login';
        }
      } else {
        const msg = typeof res?.errors === 'string' ? res.errors : 'Registration failed. Please check inputs or verify email.';
        setServerError(msg);
      }
    },
    onError: (e) => setServerError(e.message || 'Registration failed'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    await doRegister({ variables: { email, username, password1, password2 } });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input h-11 w-full" placeholder="you@example.com" required />
      </div>
      <div>
        <label className="block text-sm">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="input h-11 w-full" placeholder="username" required />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} className="input h-11 w-full" placeholder="Password" required />
      </div>
      <div>
        <label className="block text-sm">Confirm Password</label>
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="input h-11 w-full" placeholder="Confirm password" required />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Creating account…' : 'Sign up'}</button>
      {(error || serverError) && <div className="text-red-600 text-sm">{serverError || 'Registration failed'}</div>}
    </form>
  );
}
