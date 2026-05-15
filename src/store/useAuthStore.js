import { create } from 'zustand';

// --- MOCK ACCOUNTS (DUMMY DATA) ---
const MOCK_USERS = [
  { id: 'u1', name: 'Super Admin', email: 'admin@lms.com', role: 'ADMIN', balance: 0 },
  { id: 'u2', name: 'Dr. Aris', email: 'guru@lms.com', role: 'INSTRUCTOR', balance: 1500000 },
  { id: 'u3', name: 'Top Student', email: 'siswa@lms.com', role: 'STUDENT', balance: 0 },
];

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('lms_user')) || null,
  error: '',

  login: async (email, password) => {
    set({ error: '' });
    
    // 1. Check Mock Accounts (Default Password: password123)
    const mockUser = MOCK_USERS.find(u => u.email === email);
    if (mockUser && (password === 'password123' || password === mockUser.mockPassword)) {
      localStorage.setItem('lms_user', JSON.stringify(mockUser));
      set({ user: mockUser });
      return { success: true };
    }

    // 2. Check Newly Registered Accounts (Stored in LocalStorage)
    const localUsers = JSON.parse(localStorage.getItem('lms_local_users')) || [];
    const localUser = localUsers.find(u => u.email === email);
    if (localUser && localUser.password === password) {
      const uData = { id: localUser.id, name: localUser.fullname, email: localUser.email, role: localUser.role || 'STUDENT', balance: 0 };
      localStorage.setItem('lms_user', JSON.stringify(uData));
      set({ user: uData });
      return { success: true };
    }

    // 3. If Login Fails
    set({ error: 'Invalid email or password. Use password123 for dummy accounts.' });
    return { success: false };
  },

  register: async (formData) => {
    // Save new account registration to LocalStorage (Database Simulation)
    const localUsers = JSON.parse(localStorage.getItem('lms_local_users')) || [];
    const newUser = { ...formData, id: 'u' + Date.now(), role: 'STUDENT' };
    
    localUsers.push(newUser);
    localStorage.setItem('lms_local_users', JSON.stringify(localUsers));
    
    return { success: true };
  },

  logout: () => {
    // Clear session data on logout
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
    set({ user: null });
  }
}));