import { useState } from 'react';
import apiService from '../services/apiService';

// Custom hook for direct API calls (similar to what LanguageManagement expects)
export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = async (url, method = 'GET', data = null) => {
    setLoading(true);
    try {
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await apiService.get(url);
          break;
        case 'POST':
          response = await apiService.post(url, data);
          break;
        case 'PUT':
          response = await apiService.put(url, data);
          break;
        case 'PATCH':
          response = await apiService.patch(url, data);
          break;
        case 'DELETE':
          response = await apiService.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading };
};
