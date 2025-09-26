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

// Some backends expect email instead of username; try this as a fallback if needed
const LOGIN_BY_EMAIL_MUTATION = gql`
	mutation LoginByEmail($email: String!, $password: String!) {
		tokenAuth(email: $email, password: $password) {
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
	const [doLogin, { loading, error, client }] = useMutation(LOGIN_BY_EMAIL_MUTATION, {
		onCompleted: async (data) => {
			// Try email first
			const resEmail = data?.tokenAuth;
			if (resEmail?.success && resEmail?.token) {
				saveTokens(resEmail.token, resEmail.refreshToken);
				if (typeof window !== 'undefined') window.location.href = '/home';
				return;
			}

			// Fallback: try username param if email variant failed
			try {
				const attempt = await client.mutate({
					mutation: LOGIN_MUTATION,
					variables: { username, password },
				});
				const resUser = attempt?.data?.tokenAuth;
				if (resUser?.success && resUser?.token) {
					saveTokens(resUser.token, resUser.refreshToken);
					if (typeof window !== 'undefined') window.location.href = '/home';
					return;
				}
				const msg2 = typeof resUser?.errors === 'string' ? resUser.errors : 'Invalid credentials or inactive account.';
				setServerError(msg2);
			} catch (e) {
				setServerError(e.message || 'Login failed');
			}
		},
		onError: (e) => {
			setServerError(e.message || 'Login failed');
		},
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		setServerError('');
		await doLogin({ variables: { email: username, password } });
	};

	return (
		<form onSubmit={onSubmit} className="space-y-3">
			<div>
				<label className="block text-sm">Email or Username</label>
				<input value={username} onChange={(e) => setUsername(e.target.value)} className="input h-11" placeholder="you@example.com or username" />
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
