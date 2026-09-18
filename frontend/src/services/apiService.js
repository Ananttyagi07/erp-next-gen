import axios from 'axios';

// Create axios instance with base configuration
// Use environment variable if available, otherwise default to localhost:8000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
console.log('[APIService] Initialized with baseURL:', API_URL);

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token and school selection to headers
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const schoolId = localStorage.getItem('selectedSchool');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add school selection header for multi-database routing (only if school is selected)
    if (schoolId) {
      config.headers['X-School-Id'] = schoolId;
    }

    console.debug('[API Request]', config.method?.toUpperCase(), {
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      hasToken: !!token,
      tokenLength: token?.length || 0,
      school: schoolId
    });
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh and errors
apiService.interceptors.response.use(
  (response) => {
    console.debug('[API Response]', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    const { response, config } = error;

    console.error('[API Response Error]', {
      status: response?.status,
      statusText: response?.statusText,
      url: config?.url,
      data: response?.data,
      message: error.message
    });

    // Handle 401 Unauthorized - token might be invalid
    if (response?.status === 401) {
      console.warn('[Auth Error] Token may be invalid, clearing auth state');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiService;
