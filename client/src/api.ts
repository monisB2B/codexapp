const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(API_URL + path, { ...options, headers });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export default {
  get: (p: string) => request(p),
  post: (p: string, body: any) => request(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p: string, body: any) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (p: string) => request(p, { method: 'DELETE' }),
};
