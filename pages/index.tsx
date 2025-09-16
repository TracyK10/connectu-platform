import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// SSR cannot access localStorage; rely on a cookie flag if present later.
	// For now, always send to /home; client layout will re-route to /login if needed.
	return {
		redirect: {
			destination: '/home',
			permanent: false,
		},
	};
};

export default function Index() {
	return null;
}
