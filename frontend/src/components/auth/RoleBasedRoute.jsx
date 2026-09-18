import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';

const RoleBasedRoute = ({ children, requiredPermissions = [], requireAll = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Debug logging
  console.log('[RoleBasedRoute] Checking permissions:', {
    requiredPermissions,
    userObject: user,
    userIsSuperuser: user?.is_superuser,
    userIsStaff: user?.is_staff,
    userId: user?.id,
    userEmail: user?.email,
    isAuthenticated
  });

  // If user is superuser, allow access to everything
  if (user?.is_superuser) {
    console.log('[RoleBasedRoute] User is superuser, granting access');
    return children;
  }

  // If no permissions required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    console.log('[RoleBasedRoute] No permissions required, granting access');
    return children;
  }

  // Check permissions based on requireAll flag
  const hasAccess = requireAll
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  console.log('[RoleBasedRoute] Permission check result:', { hasAccess });

  if (!hasAccess) {
    // Redirect to dashboard if user doesn't have required permissions
    console.log('[RoleBasedRoute] Access denied, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleBasedRoute;
