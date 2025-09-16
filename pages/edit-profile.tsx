import MainLayout from '../components/layout/MainLayout';

export default function EditProfile() {
	return (
		<MainLayout title="Edit Profile | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto py-12">
					<h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Edit profile</h1>
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-8">
						<div className="flex flex-col items-center">
							<img src="https://randomuser.me/api/portraits/women/65.jpg" className="h-24 w-24 rounded-full" alt="avatar" />
							<h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Sophia Bennett</h2>
							<p className="text-sm text-gray-500">@sophia.bennett</p>
						</div>

						<form className="mt-10 space-y-6 max-w-xl mx-auto">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
								<input className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
								<input className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
								<input className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
								<input className="mt-1 w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30" />
							</div>

							<div className="flex items-center justify-end gap-3 pt-4">
								<button type="button" className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200">Cancel</button>
								<button type="submit" className="h-10 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium">Save</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
