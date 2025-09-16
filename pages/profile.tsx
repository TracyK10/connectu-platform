import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Profile() {
	const { user } = useAuth();
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
						<img src={user?.avatar || 'https://randomuser.me/api/portraits/women/65.jpg'} className="h-24 w-24 rounded-full mx-auto" alt="avatar" />
						<h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{user?.name || 'Your Name'}</h1>
						<p className="text-sm text-gray-600 dark:text-gray-400">{user?.bio || 'Add a short bio in Edit Profile'}</p>
						<p className="mt-1 text-sm text-gray-500">{user?.location || 'Somewhere'} · <a href={user?.website || '#'} className="text-primary-600 hover:text-primary-700">{user?.website || 'your.site'}</a></p>
						<Link href="/edit-profile" className="inline-block mt-4 h-10 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200">Edit Profile</Link>
					</div>

					{/* Tabs */}
					<div className="mt-6 border-b border-gray-200 dark:border-slate-800 flex gap-6 text-sm">
						<button className="py-2 px-1 border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium">Posts</button>
						<button className="py-2 px-1 text-gray-500">Likes</button>
					</div>

					{/* Grid */}
					<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
						{photos.map((src, i) => (
							<div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
								<img src={src} alt="photo" className="w-full h-full object-cover" />
							</div>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
