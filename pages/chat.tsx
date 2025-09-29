import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';

interface MessageItem {
	id: string;
	from: 'me' | 'other';
	name?: string;
	avatar?: string;
	text: string;
}

export default function Chat() {
	const messages: MessageItem[] = [
		{ id: '1', from: 'other', name: 'Olivia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', text: "Hey, how's it going?" },
		{ id: '2', from: 'me', text: 'Not bad, just finished a workout. You?' },
		{ id: '3', from: 'other', name: 'Olivia', text: 'Just chilling at home. Thinking of ordering some food. Any recommendations?' },
		{ id: '4', from: 'me', text: 'Hmm, what are you in the mood for?' },
		{ id: '5', from: 'other', name: 'Olivia', text: 'Maybe some Italian? Or Thai?' },
		{ id: '6', from: 'me', text: "Italian sounds good. There's a place called Bella Italia that's pretty good. Have you tried it?" },
		{ id: '7', from: 'other', name: 'Olivia', text: "Oh yeah, I've heard of it. Let's do that!" },
		{ id: '8', from: 'me', text: "Great! I'll order. What do you want?" },
		{ id: '9', from: 'other', name: 'Olivia', text: "I'll have the pasta carbonara, please." },
		{ id: '10', from: 'me', text: 'Got it. Ordering now.' },
	];

	return (
		<MainLayout title="Chat | ConnectU">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto py-6">
					<h1 className="sr-only">Chat</h1>
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 h-[70vh] flex flex-col">
						<div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center gap-3">
							<div className="relative h-9 w-9 flex-shrink-0">
							<Image 
								src="https://randomuser.me/api/portraits/women/65.jpg" 
								alt="Olivia" 
								fill
								className="rounded-full object-cover"
								sizes="36px"
							/>
						</div>
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">Olivia</p>
								<p className="text-xs text-gray-500">Today</p>
							</div>
						</div>
						<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
							{messages.map((m) => (
								<div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
									<div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${m.from === 'me' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'}`}>
										{m.text}
									</div>
								</div>
							))}
						</div>
						<form className="p-3 border-t border-gray-200 dark:border-slate-800 flex items-center gap-2">
							<input className="flex-1 h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 border border-transparent focus:border-primary-500" placeholder="Message Olivia" />
							<button type="submit" className="h-11 px-4 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Send</button>
						</form>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
