import axiosInstance from './api';

const collegesService = {
  // Get all colleges
  getColleges: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/colleges/', { params });
      return response.data;
    } catch (error) {
      console.error('Get colleges error:', error);
      throw error;
    }
  },

  // Get single college
  getCollege: async (id) => {
    try {
      const response = await axiosInstance.get(`/colleges/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get college error:', error);
      throw error;
    }
  },

  // Create new college
  createCollege: async (formData) => {
    try {
      // Use FormData for file uploads
      if (formData.frontend_logo || formData.admin_logo) {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        });
        const response = await axiosInstance.post('/colleges/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await axiosInstance.post('/colleges/', formData);
        return response.data;
      }
    } catch (error) {
      console.error('Create college error:', error);
      throw error;
    }
  },

  // Update college
  updateCollege: async (id, formData) => {
    try {
      // Use FormData for file uploads
      if (formData.frontend_logo || formData.admin_logo) {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        });
        const response = await axiosInstance.put(`/colleges/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await axiosInstance.put(`/colleges/${id}/`, formData);
        return response.data;
      }
    } catch (error) {
      console.error('Update college error:', error);
      throw error;
    }
  },

  // Delete college (soft delete)
  deleteCollege: async (id) => {
    try {
      const response = await axiosInstance.delete(`/colleges/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete college error:', error);
      throw error;
    }
  },

  // Get subscription status
  getSubscriptionStatus: async (id) => {
    try {
      const response = await axiosInstance.get(`/colleges/${id}/subscription/`);
      return response.data;
    } catch (error) {
      // Return null if endpoint doesn't exist
      return null;
    }
  },
};

export default collegesService;
