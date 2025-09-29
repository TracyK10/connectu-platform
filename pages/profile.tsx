import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { getAccessToken } from '@/lib/auth-tokens';

export default function Profile() {
	const token = getAccessToken();

	const ME_QUERY = gql`
		query MeProfile {
			me {
				id
				username
				email
				isActive
				dateJoined
			}
		}
	`;

	type Me = { id: string; username: string; email: string; isActive: boolean; dateJoined: string };
	const { data, loading, error } = useQuery<{ me: Me }>(ME_QUERY, {
		fetchPolicy: 'network-only',
		skip: !token,
		ssr: false,
	});

	const me = data?.me;
	const photos = [
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1514516311471-fc02b0bd5b6c?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1523419409543-a5e549c1c518?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
	];

	return (
		<MainLayout title="Profile | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto py-6">
					{/* Header */}
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 text-center">
						<div className="relative h-24 w-24 mx-auto">
							<Image 
								src="https://randomuser.me/api/portraits/women/65.jpg" 
								alt="avatar" 
								fill
								className="rounded-full object-cover"
								sizes="96px"
							/>
						</div>
						<h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{me?.username || 'Your Username'}</h1>
						<p className="text-sm text-gray-600 dark:text-gray-400">{me?.email || 'you@example.com'}</p>
						<p className="mt-1 text-sm text-gray-500">{me ? (me.isActive ? 'Active account' : 'Inactive account') : '—'} · Joined {me?.dateJoined ? new Date(me.dateJoined).toLocaleDateString() : '—'}</p>
						<Link href="/edit-profile" className="inline-block mt-4 h-10 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200">Edit Profile</Link>
					</div>

					{!token && (
						<div className="mt-4 text-sm text-gray-500">Please log in to view your profile details.</div>
					)}
					{loading && token && (
						<div className="mt-4 text-sm text-gray-500">Loading profile…</div>
					)}
					{error && token && (
						<div className="mt-4 text-sm text-red-600">Not authenticated or failed to load profile</div>
					)}

					{/* Tabs */}
					<div className="mt-6 border-b border-gray-200 dark:border-slate-800 flex gap-6 text-sm">
						<button className="py-2 px-1 border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium">Posts</button>
						<button className="py-2 px-1 text-gray-500">Likes</button>
					</div>

					{/* Grid */}
					<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
						{photos.map((src, i) => (
							<div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
								<Image 
								src={src} 
								alt="photo" 
								fill
								className="object-cover"
								sizes="(max-width: 640px) 50vw, 33vw"
							/>
							</div>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
