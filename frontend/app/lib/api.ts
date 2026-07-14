const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('xora_token')
}

function setToken(token: string) {
  localStorage.setItem('xora_token', token)
}

function removeToken() {
  localStorage.removeItem('xora_token')
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Something went wrong')
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  login: (username: string, password: string) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (username: string, email: string, password: string) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  getMe: () => request('/api/auth/me'),

  createChat: (title = 'New Chat') =>
    request('/api/chats/', {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),

  getChats: () => request('/api/chats/'),

  getChat: (id: number) => request(`/api/chats/${id}`),

  sendMessage: (chatId: number, content: string) =>
    request(`/api/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  deleteChat: (id: number) =>
    request(`/api/chats/${id}`, { method: 'DELETE' }),
}

export { getToken, setToken, removeToken }
