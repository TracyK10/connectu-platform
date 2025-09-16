import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
	const router = useRouter();
	const { user, initialized } = useAuth();

	useEffect(() => {
		if (!initialized) return;
		router.replace(user ? '/home' : '/login');
	}, [user, initialized, router]);

	return null;
}
