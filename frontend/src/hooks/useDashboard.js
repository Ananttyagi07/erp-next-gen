import { useApiQuery } from './useApi';

// Dashboard API hooks - with retry disabled to fail fast if endpoints don't exist
export const useDashboardStats = () => {
  return useApiQuery(
    ['dashboard', 'stats'],
    '/dashboard/stats/',
    {
      staleTime: 1000 * 60 * 2,
      refetchInterval: 1000 * 60 * 5,
      retry: false,
      enabled: true,
    }
  );
};

export const useEnrollmentData = () => {
  return useApiQuery(
    ['dashboard', 'enrollment'],
    '/dashboard/enrollment-trend/',
    {
      staleTime: 1000 * 60 * 10,
      retry: false,
      enabled: true,
    }
  );
};

export const useRevenueData = () => {
  return useApiQuery(
    ['dashboard', 'revenue'],
    '/dashboard/revenue-trend/',
    {
      staleTime: 1000 * 60 * 10,
      retry: false,
      enabled: true,
    }
  );
};

export const useRecentActivities = () => {
  return useApiQuery(
    ['dashboard', 'activities'],
    '/dashboard/recent-activities/',
    {
      staleTime: 1000 * 60 * 1,
      refetchInterval: 1000 * 60 * 2,
      retry: false,
      enabled: true,
    }
  );
};
