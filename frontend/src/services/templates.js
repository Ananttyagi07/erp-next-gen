import axiosInstance from './api';

const templatesService = {
  // SMS Templates
  getSMSTemplates: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/templates/sms-templates/', { params });
      return response.data;
    } catch (error) {
      console.error('Get SMS templates error:', error);
      throw error;
    }
  },

  createSMSTemplate: async (data) => {
    try {
      const response = await axiosInstance.post('/templates/sms-templates/', data);
      return response.data;
    } catch (error) {
      console.error('Create SMS template error:', error);
      throw error;
    }
  },

  updateSMSTemplate: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/templates/sms-templates/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Update SMS template error:', error);
      throw error;
    }
  },

  deleteSMSTemplate: async (id) => {
    try {
      const response = await axiosInstance.delete(`/templates/sms-templates/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete SMS template error:', error);
      throw error;
    }
  },

  // Email Templates
  getEmailTemplates: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/templates/email-templates/', { params });
      return response.data;
    } catch (error) {
      console.error('Get email templates error:', error);
      throw error;
    }
  },

  createEmailTemplate: async (data) => {
    try {
      const response = await axiosInstance.post('/templates/email-templates/', data);
      return response.data;
    } catch (error) {
      console.error('Create email template error:', error);
      throw error;
    }
  },

  updateEmailTemplate: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/templates/email-templates/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Update email template error:', error);
      throw error;
    }
  },

  deleteEmailTemplate: async (id) => {
    try {
      const response = await axiosInstance.delete(`/templates/email-templates/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete email template error:', error);
      throw error;
    }
  },
};

export default templatesService;
