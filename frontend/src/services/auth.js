import axiosInstance from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login/', {
        email,
        password
      });
      // Backend returns: { success, message, data: { user, tokens: { access, refresh }, redirect_url } }
      // Return the nested data object for Redux to consume
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout/');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on backend, we'll clear local storage
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/my-profile/');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  getPermissions: async () => {
    try {
      const response = await axiosInstance.get('/auth/my-permissions/');
      return response.data;
    } catch (error) {
      console.error('Get permissions error:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post('/auth/refresh/', {
        refresh: refreshToken
      });
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

export default authService;
