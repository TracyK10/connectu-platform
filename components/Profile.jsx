import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { getAccessToken } from '../lib/auth-tokens';

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

export default function Profile() {
	const token = getAccessToken();
	const { data, loading, error } = useQuery(ME_QUERY, {
		fetchPolicy: 'network-only',
		skip: !token,
		ssr: false,
	});

	if (!token) return <div className="p-4 text-sm text-gray-500">Please log in to view profile.</div>;
	if (loading) return <div className="p-4 text-sm text-gray-500">Loading profile…</div>;
	if (error) return <div className="p-4 text-sm text-red-600">Not authenticated or failed to load profile</div>;

	const me = data?.me;
	if (!me) return <div className="p-4 text-sm text-gray-500">No profile</div>;

	return (
		<div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4">
			<h3 className="text-base font-semibold text-gray-900 dark:text-white">{me.username}</h3>
			<p className="text-sm text-gray-700 dark:text-gray-300">{me.email}</p>
			<div className="text-xs text-gray-500 mt-2">Active: {String(me.isActive)} · Joined: {new Date(me.dateJoined).toLocaleDateString()}</div>
		</div>
	);
}
