import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';
import permissionService from '../services/permissionService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      console.log('[Auth Init] Starting auth initialization', {
        hasToken: !!token,
        hasRefreshToken: !!refreshToken
      });

      if (!token || !refreshToken) {
        console.log('[Auth Init] No tokens found, user not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        console.log('[Auth Init] Fetching user profile and permissions...');
        // Try to fetch user profile and permissions
        const [profileResponse, permissionsResponse] = await Promise.all([
          apiService.get('/auth/my-profile/'),
          apiService.get('/auth/my-permissions/')
        ]);

        const userData = profileResponse.data.data.user || profileResponse.data.data;
        // Backend returns { user, permissions } structure from /auth/my-permissions/
        const permissionsData = permissionsResponse.data.data;
        const userPermissions = Array.isArray(permissionsData)
          ? permissionsData
          : permissionsData?.permissions || [];

        console.log('[Auth Init] Auth validation successful', {
          userEmail: userData.email,
          permissionsCount: userPermissions.length,
          isSuperuser: userData.is_superuser,
          isStaff: userData.is_staff,
          primaryRole: userData.primary_role
        });

        console.log('[Auth Init] Setting user data:', userData);
        setUser(userData);
        setPermissions(userPermissions);
        permissionService.setPermissions(userPermissions);
        setIsAuthenticated(true);
        console.log('[Auth Init] User state should be set now');
      } catch (error) {
        console.error('[Auth Init] Auth initialization failed:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        // Clear invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      console.log('[Auth] Starting login with email:', email);

      // Use the basic login endpoint for now (secure endpoint has issues)
      const response = await apiService.post('/auth/login/', {
        email,
        password,
      });

      console.log('[Auth] Login response received:', response.status);

      const { data } = response.data;

      if (!data) {
        throw new Error('Invalid login response: no data field');
      }

      console.log('[Auth] Login data:', {
        hasMFA: !!data.mfa_required,
        hasTokens: !!data.tokens,
        hasAccessToken: !!data.tokens?.access,
        hasRefreshToken: !!data.tokens?.refresh,
        hasUserData: !!data.user
      });

      // Check if MFA is required
      if (data.mfa_required) {
        console.log('[Auth] MFA required');
        return {
          mfaRequired: true,
          sessionId: data.session_id,
          message: data.message
        };
      }

      // Validate we have tokens
      if (!data.tokens?.access || !data.tokens?.refresh) {
        throw new Error('Login response missing tokens (access or refresh)');
      }

      // Store tokens
      localStorage.setItem('accessToken', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
      console.log('[Auth] Tokens stored successfully');
      // SchoolContext's college list fetch only ever runs once, at app
      // boot, before any token exists (it's mounted above the router and
      // login is a client-side navigation, not a page reload). Without
      // this, the branch switcher keeps showing "School 1"/"School 2"
      // placeholders until the user manually refreshes the page.
      window.dispatchEvent(new CustomEvent('authTokenSet'));

      // Fetch user profile and permissions
      console.log('[Auth] Fetching user profile and permissions...');
      const [profileResponse, permissionsResponse] = await Promise.all([
        apiService.get('/auth/my-profile/'),
        apiService.get('/auth/my-permissions/')
      ]);

      console.log('[Auth] Profile and permissions fetched');

      const userData = profileResponse.data.data.user || profileResponse.data.data;
      // Backend returns { user, permissions } structure from /auth/my-permissions/
      const permissionsData = permissionsResponse.data.data;
      const userPermissions = Array.isArray(permissionsData)
        ? permissionsData
        : permissionsData?.permissions || [];

      console.log('[Auth] User data from profile:', {
        email: userData.email,
        isSuperuser: userData.is_superuser,
        isStaff: userData.is_staff,
        primaryRole: userData.primary_role,
        fullData: userData
      });

      setUser(userData);
      setPermissions(userPermissions);
      permissionService.setPermissions(userPermissions);
      setIsAuthenticated(true);

      console.log('[Auth] Login successful! User:', userData.email);
      return { success: true };
    } catch (error) {
      console.error('[Auth] Login failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        error: error
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if available
      await apiService.post('/auth/logout/');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local state and storage regardless of API call result
      setUser(null);
      setPermissions([]);
      permissionService.clearPermissions();
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const handleMFAVerification = async (sessionId, code) => {
    try {
      setIsLoading(true);

      const response = await apiService.post('/auth/mfa/verify/', {
        session_id: sessionId,
        code: code,
      });

      const { data } = response.data;

      // Store tokens
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Fetch user profile and permissions
      const [profileResponse, permissionsResponse] = await Promise.all([
        apiService.get('/auth/my-profile/'),
        apiService.get('/auth/my-permissions/')
      ]);

      const mfaUserData = profileResponse.data.data.user || profileResponse.data.data;
      const mfaPermissionsData = permissionsResponse.data.data;
      const mfaUserPermissions = Array.isArray(mfaPermissionsData)
        ? mfaPermissionsData
        : mfaPermissionsData?.permissions || [];

      setUser(mfaUserData);
      setPermissions(mfaUserPermissions);
      permissionService.setPermissions(mfaUserPermissions);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('MFA verification failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission) => {
    return permissionService.hasPermission(permission);
  };

  const hasAnyPermission = (permissions) => {
    return permissionService.hasAnyPermission(permissions);
  };

  const hasAllPermissions = (permissions) => {
    return permissionService.hasAllPermissions(permissions);
  };

  const value = {
    user,
    permissions,
    isAuthenticated,
    isLoading,
    login,
    logout,
    handleMFAVerification,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissionService,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
