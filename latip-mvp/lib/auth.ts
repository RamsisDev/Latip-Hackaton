export interface User {
  id: string
  username: string
  email?: string
  tokens: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock user storage (in real app, this would be handled by backend)
const STORAGE_KEY = "latip_user"

export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    // Mock login - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email: `${username}@example.com`,
      tokens: 5, // Start with 5 tokens
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  },

  register: async (username: string, password: string, email?: string): Promise<User> => {
    // Mock registration - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email: email || `${username}@example.com`,
      tokens: 5, // Start with 5 tokens
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  },

  connectWallet: async (walletAddress: string): Promise<User> => {
    // Mock wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const user: User = {
      id: walletAddress,
      username: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      tokens: 5,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  },

  updateTokens: (newTokenCount: number) => {
    const user = authService.getCurrentUser()
    if (user) {
      user.tokens = newTokenCount
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  },
}

// API placeholders for future backend integration
/*
export const apiService = {
  login: async (username: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  },

  register: async (username: string, password: string, email: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    });
    return response.json();
  },

  searchTrademark: async (name: string, country: string, description: string) => {
    const response = await fetch('/api/trademark/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, country, description })
    });
    return response.json();
  }
};
*/
