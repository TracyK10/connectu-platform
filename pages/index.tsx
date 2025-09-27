import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken, getRefreshToken } from '../lib/auth-tokens';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
	const router = useRouter();
	const { initialized } = useAuth();

	useEffect(() => {
		if (!initialized) return;
		// Defer router navigation to avoid racing with token writes
		const id = setTimeout(() => {
			const at = getAccessToken();
			const rt = getRefreshToken();
			const target = at || rt ? '/home' : '/login';
			router.replace(target);
		}, 0);
		return () => clearTimeout(id);
	}, [initialized, router]);

	return null;
}
