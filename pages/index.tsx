import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken } from '../lib/auth-tokens';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
	const router = useRouter();
	const { initialized } = useAuth();

	useEffect(() => {
		if (!initialized) return;
		const token = getAccessToken();
		router.replace(token ? '/home' : '/login');
	}, [initialized, router]);

	return null;
}
