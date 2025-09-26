import { useState } from 'react';
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

export default function LoginForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [serverError, setServerError] = useState('');
	const [doLogin, { loading, error }] = useMutation(LOGIN_MUTATION, {
		errorPolicy: 'all',
		onCompleted: (data) => {
			const res = data?.tokenAuth;
			if (res?.success && res?.token) {
				saveTokens(res.token, res.refreshToken);
				if (typeof window !== 'undefined') window.location.href = '/home';
				return;
			}
			const msg = typeof res?.errors === 'string' ? res.errors : 'Invalid credentials or account not active.';
			setServerError(msg);
		},
		onError: (e) => setServerError(e.message || 'Login failed'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		setServerError('');
		await doLogin({ variables: { username, password } });
	};
	return (
		<form onSubmit={onSubmit} className="space-y-3">
			<div>
				<label className="block text-sm">Email or Username</label>
				<input value={username} onChange={(e) => setUsername(e.target.value)} className="input h-11" placeholder="your email or username" />
			</div>
			<div>
				<label className="block text-sm">Password</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input h-11" placeholder="password" />
			</div>
			<button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Logging in…' : 'Log in'}</button>
			{(error || serverError) && <div className="text-red-600 text-sm">{serverError || 'Login failed'}</div>}
		</form>
	);
}
