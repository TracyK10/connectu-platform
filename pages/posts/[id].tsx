import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLayout from '../../components/layout/MainLayout';

export default function PostDetail() {
	const router = useRouter();
	const { id } = router.query;

	const post = {
		id,
		user: { name: 'Emma Smith', avatar: 'https://randomuser.me/api/portraits/women/72.jpg' },
		content: "Just finished reading 'The Silent Observer' by Amelia Hayes. What a gripping thriller!",
		image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1600&auto=format&fit=crop',
		timeAgo: '2h',
		likes: 234,
		comments: 56,
		shares: 12,
	};

	const comments = [
		{ id: '1', name: 'Liam Johnson', text: 'I\'ve heard great things about this book! Adding it to my reading list now.', time: '1h' },
		{ id: '2', name: 'Emma Smith', text: "You won't regret it, Liam! Let me know what you think when you're done.", time: '45m' },
		{ id: '3', name: 'Olivia Brown', text: 'I just finished it last week and agree! Such a good book.', time: '2h' },
	];

	return (
		<MainLayout title={`Post ${id} | ConnectU`}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto py-6 space-y-4">
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
						<div className="flex items-start gap-3">
							<div className="relative h-11 w-11 flex-shrink-0">
								<Image 
									src={post.user.avatar} 
									alt={post.user.name} 
									fill
									className="rounded-full object-cover"
									sizes="44px"
								/>
							</div>
							<div className="flex-1">
								<p className="text-sm font-semibold text-gray-900 dark:text-white">{post.user.name}</p>
								<p className="text-xs text-gray-500">{post.timeAgo}</p>
								<p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{post.content}</p>
								<div className="mt-3 overflow-hidden rounded-xl">
									<div className="relative w-full h-96">
									<Image 
										src={post.image} 
										alt="post" 
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 50vw"
										priority
									/>
								</div>
								</div>
								<div className="mt-3 grid grid-cols-3 text-sm text-gray-600">
									<button className="py-2 rounded-lg hover:bg-gray-100">❤ {post.likes}</button>
									<button className="py-2 rounded-lg hover:bg-gray-100">💬 {post.comments}</button>
									<button className="py-2 rounded-lg hover:bg-gray-100">↗ {post.shares}</button>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
						<ul className="divide-y divide-gray-200 dark:divide-slate-800">
							{comments.map((c) => (
								<li key={c.id} className="p-4">
									<p className="text-sm font-medium text-gray-900 dark:text-white">{c.name} <span className="ml-2 text-xs text-gray-400">{c.time}</span></p>
									<p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
								</li>
							))}
						</ul>
						<form className="p-3 border-t border-gray-200 dark:border-slate-800 flex items-center gap-2">
							<input className="flex-1 h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-full text-sm focus:outline-none" placeholder="Add a comment..." />
							<button className="h-11 px-4 rounded-full bg-primary-600 text-white text-sm font-medium">Comment</button>
						</form>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
