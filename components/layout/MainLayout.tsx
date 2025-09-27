import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { getAccessToken } from '@/lib/auth-tokens';

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
    const { initialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!initialized) return;
        // Guard private pages by JWT existence; AuthContext user may be null before a /me fetch
        const hasToken = !!getAccessToken();
        if (!publicPage && !hasToken) router.replace('/login');
    }, [initialized, publicPage, router]);

    const isLoading = !initialized;

    return (
        <div className={`min-h-screen flex flex-col ${className ?? ''}`}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!publicPage && !isLoading && <Navbar />}

            <main className="flex-grow">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[60vh]"><div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-primary-600 animate-spin" /></div>
                ) : (
                    children
                )}
            </main>

            {!publicPage && !isLoading && <Footer />}
        </div>
    );
}
