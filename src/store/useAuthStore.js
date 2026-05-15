import { create } from 'zustand';

// --- MOCK ACCOUNTS (STAY SECURE AS FALLBACK) ---
const MOCK_USERS = [
  { id: 'u1', name: 'Super Admin', email: 'admin@lms.com', role: 'ADMIN', balance: 0 },
  { id: 'u2', name: 'Dr. Aris', email: 'guru@lms.com', role: 'INSTRUCTOR', balance: 1500000 },
  { id: 'u3', name: 'Top Student', email: 'siswa@lms.com', role: 'STUDENT', balance: 0 },
];

// YOUR RAILWAY BACKEND URL
const API_URL = 'https://crack-be-bagussam-production.up.railway.app/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('lms_user')) || null,
  error: '',

  login: async (email, password) => {
    set({ error: '' });
    
    // 1. PRIMARY ROUTE: Authenticate with Railway Backend API
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();

      if (res.ok) {
        // If DB authentication succeeds, store the Real JWT Token
        const token = data.token || data.data?.token;
        const user = data.user || data.data?.user;
        
        localStorage.setItem('lms_token', token);
        localStorage.setItem('lms_user', JSON.stringify(user));
        
        set({ user });
        return { success: true };
      }
    } catch (err) {
      console.warn("Backend unreachable. Switching to Mock Auth...");
    }

    // 2. FALLBACK ROUTE: If DB fails or account not found, use MOCK USERS
    const mockUser = MOCK_USERS.find(u => u.email === email);
    if (mockUser && password === 'password123') {
      localStorage.setItem('lms_user', JSON.stringify(mockUser));
      // Provide a dummy token for UI navigation only 
      // (Note: DB operations like 'Create Course' will still be blocked by Backend)
      localStorage.setItem('lms_token', 'dummy_token_mock_123'); 
      set({ user: mockUser });
      return { success: true };
    }

    set({ error: 'Invalid email or password. (Use password123 for Mock accounts)' });
    return { success: false };
  },

  register: async (formData) => {
    set({ error: '' });
    
    // Attempt to register to the Real Database (Railway)
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        return { success: true };
      }
    } catch (err) {
      console.warn("Failed to register to Backend API...");
    }

    // Fallback: Save to LocalStorage if Railway is offline (Simulation mode)
    const localUsers = JSON.parse(localStorage.getItem('lms_local_users')) || [];
    const newUser = { ...formData, id: 'u' + Date.now(), role: 'STUDENT' };
    localUsers.push(newUser);
    localStorage.setItem('lms_local_users', JSON.stringify(localUsers));
    
    return { success: true };
  },

  logout: () => {
    // Clear all session data
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
    set({ user: null });
  }
}));