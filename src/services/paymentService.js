const BASE_URL = 'http://localhost:5000/api/transactions';

const getHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('lms_token')}`,
  'Content-Type': 'application/json',
});

export const paymentService = {
  initiateEnrollment: async (courseId) => {
    const response = await fetch('http://localhost:5000/api/enrollments', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ courseId }),
    });
    return response.json();
  },

  getPendingPayments: async () => {
    const response = await fetch(`${BASE_URL}/pending`, { headers: getHeaders() });
    return response.json();
  },

  uploadProof: async (formData) => {
    // Note: Don't set Content-Type for FormData, browser will do it automatically
    const response = await fetch(`${BASE_URL}/upload-proof`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('lms_token')}` },
      body: formData,
    });
    return response.json();
  },

  verifyPayment: async (txId, status) => {
    const response = await fetch(`${BASE_URL}/verify/${txId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  }
};