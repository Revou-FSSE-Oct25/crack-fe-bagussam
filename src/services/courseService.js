const BASE_URL = 'http://localhost:5000/api/courses';

const getHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('lms_token')}`,
  'Content-Type': 'application/json',
});

export const courseService = {
  getAllCourses: async () => {
    const response = await fetch(BASE_URL, { headers: getHeaders() });
    return response.json();
  },

  getCourseDetails: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { headers: getHeaders() });
    return response.json();
  },

  createCourse: async (courseData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(courseData),
    });
    return response.json();
  },

  updateCourse: async (id, courseData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(courseData),
    });
    return response.json();
  },

  deleteCourse: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },

  // --- MODULES ---
  addModule: async (courseId, moduleData) => {
    const response = await fetch(`${BASE_URL}/${courseId}/modules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(moduleData),
    });
    return response.json();
  },

  updateModule: async (moduleId, moduleData) => {
    const response = await fetch(`${BASE_URL}/modules/${moduleId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(moduleData),
    });
    return response.json();
  },

  deleteModule: async (moduleId) => {
    const response = await fetch(`${BASE_URL}/modules/${moduleId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },

  // --- ATTENDANCE & PROGRESS ---
  markAttendance: async (moduleId) => {
    const response = await fetch(`${BASE_URL}/attendance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ moduleId }),
    });
    return response.json();
  },

  completeModule: async (enrollmentId, moduleId) => {
    const response = await fetch(`${BASE_URL}/complete-module`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ enrollmentId, moduleId }),
    });
    return response.json();
  }
};