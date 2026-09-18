import axiosInstance from './api';

const languageService = {
  // Get all languages with pagination and filtering
  getLanguages: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/admin-settings/languages/', { params });
      return response.data;
    } catch (error) {
      console.error('Get languages error:', error);
      throw error;
    }
  },

  // Get single language with details and labels
  getLanguage: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin-settings/languages/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get language error:', error);
      throw error;
    }
  },

  // Create new language
  createLanguage: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin-settings/languages/', formData);
      return response.data;
    } catch (error) {
      console.error('Create language error:', error);
      throw error;
    }
  },

  // Update language
  updateLanguage: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/admin-settings/languages/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Update language error:', error);
      throw error;
    }
  },

  // Partial update language
  patchLanguage: async (id, formData) => {
    try {
      const response = await axiosInstance.patch(`/admin-settings/languages/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Patch language error:', error);
      throw error;
    }
  },

  // Delete language
  deleteLanguage: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin-settings/languages/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete language error:', error);
      throw error;
    }
  },

  // Get all language labels
  getLanguageLabels: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/admin-settings/language-labels/', { params });
      return response.data;
    } catch (error) {
      console.error('Get language labels error:', error);
      throw error;
    }
  },

  // Get single language label
  getLanguageLabel: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin-settings/language-labels/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get language label error:', error);
      throw error;
    }
  },

  // Create new language label
  createLanguageLabel: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin-settings/language-labels/', formData);
      return response.data;
    } catch (error) {
      console.error('Create language label error:', error);
      throw error;
    }
  },

  // Update language label
  updateLanguageLabel: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/admin-settings/language-labels/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Update language label error:', error);
      throw error;
    }
  },

  // Partial update language label
  patchLanguageLabel: async (id, formData) => {
    try {
      const response = await axiosInstance.patch(`/admin-settings/language-labels/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Patch language label error:', error);
      throw error;
    }
  },

  // Delete language label
  deleteLanguageLabel: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin-settings/language-labels/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete language label error:', error);
      throw error;
    }
  },

  // Get labels for a specific language
  getLanguageLabelsForLanguage: async (languageId, params = {}) => {
    try {
      const allParams = { ...params, language_id: languageId };
      const response = await axiosInstance.get('/admin-settings/language-labels/', { params: allParams });
      return response.data;
    } catch (error) {
      console.error('Get labels for language error:', error);
      throw error;
    }
  },

  // Bulk create language labels
  bulkCreateLanguageLabels: async (labels) => {
    try {
      const promises = labels.map(label =>
        axiosInstance.post('/admin-settings/language-labels/', label)
      );
      const responses = await Promise.all(promises);
      return responses.map(r => r.data);
    } catch (error) {
      console.error('Bulk create labels error:', error);
      throw error;
    }
  },

  // Get active languages only
  getActiveLanguages: async (params = {}) => {
    try {
      const allParams = { ...params, is_active: true };
      const response = await axiosInstance.get('/admin-settings/languages/', { params: allParams });
      return response.data;
    } catch (error) {
      console.error('Get active languages error:', error);
      throw error;
    }
  },

  // Get default languages only
  getDefaultLanguages: async (params = {}) => {
    try {
      const allParams = { ...params, is_default: true };
      const response = await axiosInstance.get('/admin-settings/languages/', { params: allParams });
      return response.data;
    } catch (error) {
      console.error('Get default languages error:', error);
      throw error;
    }
  },

  // Get custom languages only
  getCustomLanguages: async (params = {}) => {
    try {
      const allParams = { ...params, is_custom: true };
      const response = await axiosInstance.get('/admin-settings/languages/', { params: allParams });
      return response.data;
    } catch (error) {
      console.error('Get custom languages error:', error);
      throw error;
    }
  },
};

export default languageService;
