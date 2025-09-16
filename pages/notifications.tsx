import MainLayout from '../components/layout/MainLayout';

export default function Notifications() {
	const items = [
		{ id: '1', text: 'Emma liked your post', time: '2h' },
		{ id: '2', text: 'Noah started following you', time: '5h' },
		{ id: '3', text: 'Ava mentioned you in a comment', time: '1d' },
	];

	return (
		<MainLayout title="Notifications | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto py-6">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h1>
					<ul className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 divide-y divide-gray-200 dark:divide-slate-800">
						{items.map((n) => (
							<li key={n.id} className="px-4 py-4 flex items-center justify-between">
								<p className="text-sm text-gray-800 dark:text-gray-200">{n.text}</p>
								<span className="text-xs text-gray-400">{n.time}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</MainLayout>
	);
}
