import axiosInstance from './api';

const emailSettingsService = {
  // Get all email settings with pagination and filtering
  getEmailSettings: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/admin-settings/email-settings/', { params });
      return response.data;
    } catch (error) {
      console.error('Get email settings error:', error);
      throw error;
    }
  },

  // Get single email setting
  getEmailSetting: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin-settings/email-settings/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get email setting error:', error);
      throw error;
    }
  },

  // Create new email setting
  createEmailSetting: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin-settings/email-settings/', formData);
      return response.data;
    } catch (error) {
      console.error('Create email setting error:', error);
      throw error;
    }
  },

  // Update email setting
  updateEmailSetting: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/admin-settings/email-settings/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Update email setting error:', error);
      throw error;
    }
  },

  // Delete email setting (soft delete)
  deleteEmailSetting: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin-settings/email-settings/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete email setting error:', error);
      throw error;
    }
  },
};

export default emailSettingsService;
