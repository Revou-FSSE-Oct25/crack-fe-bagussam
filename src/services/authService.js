const BASE_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (formData) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response.json();
  },

  logout: () => {
    localStorage.removeItem('lms_token');
    localStorage.removeItem('lms_user');
  }
};