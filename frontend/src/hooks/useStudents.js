import { useApiQuery, useApiMutation, useApiUpdate, useApiDelete, usePaginatedQuery } from './useApi';

// Students API hooks
export const useStudents = (params = {}) => {
  return usePaginatedQuery(
    ['students'],
    '/students/students/',
    params,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

export const useStudent = (id) => {
  return useApiQuery(
    ['student', id],
    `/students/students/${id}/`,
    {
      enabled: !!id,
    }
  );
};

export const useCreateStudent = () => {
  return useApiMutation('/students/students/', {
    invalidateQueries: [['students']],
    onSuccess: (data) => {
      console.log('Student created successfully:', data);
    },
  });
};

export const useUpdateStudent = () => {
  return useApiUpdate('/students/students/', {
    invalidateQueries: [['students'], ['student']],
    onSuccess: (data) => {
      console.log('Student updated successfully:', data);
    },
  });
};

export const useDeleteStudent = () => {
  return useApiDelete('/students/students/', {
    invalidateQueries: [['students']],
    onSuccess: () => {
      console.log('Student deleted successfully');
    },
  });
};
