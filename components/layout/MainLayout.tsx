import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

interface MainLayoutProps {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
	publicPage?: boolean;
}

export default function MainLayout({
	children,
	title = 'ConnectU - Connect with Friends',
	description = 'Connect with friends and share your moments',
	className,
	publicPage = false,
}: MainLayoutProps) {
	const { user, initialized } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!initialized) return;
		if (!publicPage && !user) {
			router.replace('/login');
		}
	}, [user, initialized, publicPage, router]);

	return (
		<div className={`min-h-screen flex flex-col ${className ?? ''}`}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{!publicPage && <Navbar />}
			
			<main className="flex-grow">
				{children}
			</main>
			
			{!publicPage && <Footer />}
		</div>
	);
}
