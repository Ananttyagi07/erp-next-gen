import { useApiQuery, useApiMutation, useApiUpdate, useApiDelete, usePaginatedQuery } from './useApi';

// Teachers API hooks
export const useTeachers = (params = {}) => {
  return usePaginatedQuery(
    ['teachers'],
    '/teachers/teachers/',
    params,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

export const useTeacher = (id) => {
  return useApiQuery(
    ['teacher', id],
    `/teachers/teachers/${id}/`,
    {
      enabled: !!id,
    }
  );
};

export const useCreateTeacher = () => {
  return useApiMutation('/teachers/teachers/', {
    invalidateQueries: [['teachers']],
    onSuccess: (data) => {
      console.log('Teacher created successfully:', data);
    },
  });
};

export const useUpdateTeacher = () => {
  return useApiUpdate('/teachers/teachers/', {
    invalidateQueries: [['teachers'], ['teacher']],
    onSuccess: (data) => {
      console.log('Teacher updated successfully:', data);
    },
  });
};

export const useDeleteTeacher = () => {
  return useApiDelete('/teachers/teachers/', {
    invalidateQueries: [['teachers']],
    onSuccess: () => {
      console.log('Teacher deleted successfully');
    },
  });
};
