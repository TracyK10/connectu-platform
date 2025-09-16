import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditProfile() {
	const { user, updateProfile } = useAuth();
	const router = useRouter();
	const [name, setName] = useState(user?.name || '');
	const [bio, setBio] = useState(user?.bio || '');
	const [location, setLocation] = useState(user?.location || '');
	const [website, setWebsite] = useState(user?.website || '');

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateProfile({ name, bio, location, website });
		router.push('/profile');
	};

	return (
		<MainLayout title="Edit Profile | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto py-12">
					<h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Edit profile</h1>
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-8">
						<div className="flex flex-col items-center">
							<img src={user?.avatar || 'https://randomuser.me/api/portraits/women/65.jpg'} className="h-24 w-24 rounded-full" alt="avatar" />
							<h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{user?.name || 'Your Name'}</h2>
							<p className="text-sm text-gray-500">@{user?.email?.split('@')[0] || 'you'}</p>
						</div>

						<form onSubmit={onSubmit} className="mt-10 space-y-6 max-w-xl mx-auto">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
								<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
								<input value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
								<input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
								<input value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>

							<div className="flex items-center justify-end gap-3 pt-4">
								<button type="button" onClick={() => router.back()} className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200">Cancel</button>
								<button type="submit" className="h-10 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium">Save</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
