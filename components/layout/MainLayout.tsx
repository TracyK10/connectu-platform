import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
}

export default function MainLayout({
	children,
	title = 'ConnectU - Connect with Friends',
	description = 'Connect with friends and share your moments',
	className,
}: MainLayoutProps) {
	return (
		<div className={`min-h-screen flex flex-col ${className ?? ''}`}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />
			
			<main className="flex-grow">
				{children}
			</main>
			
			<Footer />
		</div>
	);
}
