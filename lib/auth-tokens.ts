// Centralized token helpers
export const TOKEN_KEYS = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export function getAccessToken(): string | null {
  try { return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEYS.access) : null; } catch { return null; }
}

export function getRefreshToken(): string | null {
  try { return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEYS.refresh) : null; } catch { return null; }
}

export function saveTokens(accessToken: string, refreshToken?: string) {
  try {
    if (typeof window === 'undefined') return;
    if (accessToken) localStorage.setItem(TOKEN_KEYS.access, accessToken);
    if (refreshToken) localStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
  } catch {}
}

export function clearTokens() {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEYS.access);
    localStorage.removeItem(TOKEN_KEYS.refresh);
  } catch {}
}
