import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/apiService';

// Generic API hooks for common CRUD operations

// GET hook
export const useApiQuery = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () => apiService.get(url),
    ...options,
  });
};

// POST hook
export const useApiMutation = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.post(url, data),
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

// PUT hook
export const useApiUpdate = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.put(`${url}${id ? `/${id}` : ''}`, data),
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

// DELETE hook
export const useApiDelete = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.delete(`${url}/${id}`),
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

// Custom hook for paginated data
export const usePaginatedQuery = (key, url, params = {}, options = {}) => {
  return useQuery({
    queryKey: [...key, params],
    queryFn: () => apiService.get(url, { params }),
    ...options,
  });
};
