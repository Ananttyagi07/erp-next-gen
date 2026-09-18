/**
 * Academic & Live Classes API Service
 * Handles all API calls for academic and live classes modules
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===============================
// ACADEMIC ENDPOINTS
// ===============================

// Classes
export const classApi = {
  getAll: (params = {}) => apiClient.get('/academic/classes/', { params }),
  getById: (id) => apiClient.get(`/academic/classes/${id}/`),
  create: (data) => apiClient.post('/academic/classes/', data),
  update: (id, data) => apiClient.put(`/academic/classes/${id}/`, data),
  delete: (id) => apiClient.delete(`/academic/classes/${id}/`),
};

// Sections
export const sectionApi = {
  getAll: (params = {}) => apiClient.get('/academic/sections/', { params }),
  getById: (id) => apiClient.get(`/academic/sections/${id}/`),
  create: (data) => apiClient.post('/academic/sections/', data),
  update: (id, data) => apiClient.put(`/academic/sections/${id}/`, data),
  delete: (id) => apiClient.delete(`/academic/sections/${id}/`),
};

// Subjects
export const subjectApi = {
  getAll: (params = {}) => apiClient.get('/academic/subjects/', { params }),
  getById: (id) => apiClient.get(`/academic/subjects/${id}/`),
  create: (data) => apiClient.post('/academic/subjects/', data),
  update: (id, data) => apiClient.put(`/academic/subjects/${id}/`, data),
  delete: (id) => apiClient.delete(`/academic/subjects/${id}/`),
};

// Syllabi
export const syllabusApi = {
  getAll: (params = {}) => apiClient.get('/academic/syllabi/', { params }),
  getById: (id) => apiClient.get(`/academic/syllabi/${id}/`),
  create: (formData) => apiClient.post('/academic/syllabi/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => apiClient.put(`/academic/syllabi/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/academic/syllabi/${id}/`),
};

// Study Materials
export const materialApi = {
  getAll: (params = {}) => apiClient.get('/academic/study-materials/', { params }),
  getById: (id) => apiClient.get(`/academic/study-materials/${id}/`),
  create: (formData) => apiClient.post('/academic/study-materials/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => apiClient.put(`/academic/study-materials/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/academic/study-materials/${id}/`),
};

// ===============================
// LIVE CLASSES ENDPOINTS
// ===============================

// Live Class Types
export const liveClassTypeApi = {
  getAll: (params = {}) => apiClient.get('/live-classes/types/', { params }),
  getById: (id) => apiClient.get(`/live-classes/types/${id}/`),
  create: (data) => apiClient.post('/live-classes/types/', data),
  update: (id, data) => apiClient.put(`/live-classes/types/${id}/`, data),
  delete: (id) => apiClient.delete(`/live-classes/types/${id}/`),
};

// Live Classes
export const liveClassApi = {
  getAll: (params = {}) => apiClient.get('/live-classes/classes/', { params }),
  getById: (id) => apiClient.get(`/live-classes/classes/${id}/`),
  create: (data) => apiClient.post('/live-classes/classes/', data),
  update: (id, data) => apiClient.put(`/live-classes/classes/${id}/`, data),
  delete: (id) => apiClient.delete(`/live-classes/classes/${id}/`),
};

// Assignments
export const assignmentApi = {
  getAll: (params = {}) => apiClient.get('/live-classes/assignments/', { params }),
  getById: (id) => apiClient.get(`/live-classes/assignments/${id}/`),
  create: (formData) => apiClient.post('/live-classes/assignments/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => apiClient.put(`/live-classes/assignments/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/live-classes/assignments/${id}/`),
};

// Submissions
export const submissionApi = {
  getAll: (params = {}) => apiClient.get('/live-classes/submissions/', { params }),
  getById: (id) => apiClient.get(`/live-classes/submissions/${id}/`),
  create: (formData) => apiClient.post('/live-classes/submissions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => apiClient.put(`/live-classes/submissions/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/live-classes/submissions/${id}/`),
};

// ===============================
// HELPER FUNCTIONS
// ===============================

/**
 * Handle API errors consistently
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data?.detail || error.response.data?.message || 'An error occurred',
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      status: 0,
      message: 'No response from server. Please check your connection.',
      data: null,
    };
  } else {
    // Error in request setup
    return {
      status: -1,
      message: error.message || 'An error occurred',
      data: null,
    };
  }
};

/**
 * Convert FormData to multipart submission
 */
export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (typeof data[key] === 'boolean') {
        formData.append(key, data[key] ? 'true' : 'false');
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  return formData;
};

export default apiClient;
