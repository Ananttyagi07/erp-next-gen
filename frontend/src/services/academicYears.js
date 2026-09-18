import axiosInstance from './api';

const academicYearsService = {
  // Get all academic years with pagination and filtering
  getAcademicYears: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/admin-settings/academic-years/', { params });
      return response.data;
    } catch (error) {
      console.error('Get academic years error:', error);
      throw error;
    }
  },

  // Get single academic year
  getAcademicYear: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin-settings/academic-years/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get academic year error:', error);
      throw error;
    }
  },

  // Create new academic year
  createAcademicYear: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin-settings/academic-years/', formData);
      return response.data;
    } catch (error) {
      console.error('Create academic year error:', error);
      throw error;
    }
  },

  // Update academic year
  updateAcademicYear: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/admin-settings/academic-years/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.error('Update academic year error:', error);
      throw error;
    }
  },

  // Delete academic year (soft delete)
  deleteAcademicYear: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin-settings/academic-years/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete academic year error:', error);
      throw error;
    }
  },
};

export default academicYearsService;
