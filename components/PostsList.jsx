import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { getAccessToken } from '../lib/auth-tokens';

const POSTS_QUERY = gql`
	query PostsList {
		posts {
			id
			title
			content
			likeCount
			commentCount
			author { username }
		}
	}
`;

export default function PostsList() {
	const token = getAccessToken();
	const { data, loading, error } = useQuery(POSTS_QUERY, { fetchPolicy: 'cache-and-network', skip: !token });

	if (!token) return <div className="p-4 text-sm text-gray-500">Please log in to view posts.</div>;
	if (loading) return <div className="p-4 text-sm text-gray-500">Loading posts…</div>;
	if (error) return <div className="p-4 text-sm text-red-600">Failed to load posts</div>;

	const posts = data?.posts ?? [];

	return (
		<div className="space-y-3">
			{posts.map((p) => (
				<div key={p.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4">
					<h3 className="text-base font-semibold text-gray-900 dark:text-white">{p.title}</h3>
					<p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{p.content}</p>
					<div className="text-xs text-gray-500 mt-2">by {p.author?.username ?? 'unknown'} · ❤ {p.likeCount} · 💬 {p.commentCount}</div>
				</div>
			))}
		</div>
	);
}
