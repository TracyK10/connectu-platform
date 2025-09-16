import MainLayout from '../components/layout/MainLayout';

interface ConversationItem {
	id: string;
	name: string;
	message: string;
	time: string;
	avatar: string;
}

export default function Messages() {
	const conversations: ConversationItem[] = [
		{ id: '1', name: 'Sophia Clark', message: 'Hey, how are you?', time: '10m', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
		{ id: '2', name: 'Liam Carter', message: 'See you later!', time: '25m', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
		{ id: '3', name: 'Ava Bennett', message: "I'm on my way", time: '30m', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
		{ id: '4', name: 'Noah Foster', message: 'Sounds good!', time: '45m', avatar: 'https://randomuser.me/api/portraits/men/31.jpg' },
		{ id: '5', name: 'Isabella Hayes', message: "I'll be there in 10", time: '1h', avatar: 'https://randomuser.me/api/portraits/women/70.jpg' },
		{ id: '6', name: 'Jackson Reed', message: "Let's meet at the usual spot", time: '2h', avatar: 'https://randomuser.me/api/portraits/men/27.jpg' },
		{ id: '7', name: 'Mia Coleman', message: "I'm running a bit late", time: '3h', avatar: 'https://randomuser.me/api/portraits/women/60.jpg' },
		{ id: '8', name: 'Lucas Harper', message: "I'm here", time: '4h', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
	];

	return (
		<MainLayout title="Messages | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto py-6">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Messages</h1>
					</div>

					<div className="mb-6">
						<input
							type="text"
							placeholder="Search"
							className="w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 border border-transparent focus:border-primary-500"
						/>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
						{conversations.map((c) => (
							<li key={c.id} className="flex items-center justify-between px-4 py-4">
								<div className="flex items-center gap-3">
									<img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">{c.message}</p>
									</div>
								</div>
								<span className="text-xs text-gray-400">{c.time}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</MainLayout>
	);
}
