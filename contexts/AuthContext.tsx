import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface AuthUser {
	id: string;
	name: string;
	email: string;
}

interface AuthContextValue {
	user: AuthUser | null;
	initialized: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const STORAGE_KEY = 'connectu_auth_user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		try {
			const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
			if (raw) setUser(JSON.parse(raw));
		} catch {}
		setInitialized(true);
	}, []);

	const persist = (u: AuthUser | null) => {
		try {
			if (!u) {
				window.localStorage.removeItem(STORAGE_KEY);
			} else {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
			}
		} catch {}
	};

	const login = async (email: string, _password: string) => {
		// Demo login: accept any creds and create a user
		const u: AuthUser = { id: `u-${Date.now()}`, name: email.split('@')[0] || 'User', email };
		setUser(u);
		persist(u);
	};

	const signup = async (name: string, email: string, _password: string) => {
		const u: AuthUser = { id: `u-${Date.now()}`, name: name || email.split('@')[0] || 'User', email };
		setUser(u);
		persist(u);
	};

	const logout = () => {
		setUser(null);
		persist(null);
	};

	const value = useMemo<AuthContextValue>(() => ({ user, initialized, login, signup, logout }), [user, initialized]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
