import api from './api';

const studentService = {
  // Get all students
  getAllStudents: (params = {}) => {
    return api.get('/students/students/', { params });
  },

  // Get student by ID
  getStudentById: (id) => {
    return api.get(`/students/students/${id}/`);
  },

  // Create new student
  createStudent: (data) => {
    return api.post('/students/students/', data);
  },

  // Update student
  updateStudent: (id, data) => {
    return api.put(`/students/students/${id}/`, data);
  },

  // Partial update student
  patchStudent: (id, data) => {
    return api.patch(`/students/students/${id}/`, data);
  },

  // Delete student
  deleteStudent: (id) => {
    return api.delete(`/students/students/${id}/`);
  },

  // Get student parents
  getStudentParents: (studentId) => {
    return api.get(`/students/student-parents/?student=${studentId}`);
  },

  // Create student parent
  createStudentParent: (data) => {
    return api.post('/students/student-parents/', data);
  },

  // Delete student parent
  deleteStudentParent: (id) => {
    return api.delete(`/students/student-parents/${id}/`);
  },
};

export default studentService;
