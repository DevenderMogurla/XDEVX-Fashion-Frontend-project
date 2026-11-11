const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}

export const api = {
  products: (category) => request(`/api/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  register: (form) => request('/api/register', { method: 'POST', body: JSON.stringify(form) }),
  login: (credentials) => request('/api/login', { method: 'POST', body: JSON.stringify(credentials) }),
  createProduct: (product) => request('/api/products', { method: 'POST', body: JSON.stringify(product) }),
};
