import { useAuth } from '../context/AuthContext';

export const usePermissions = () => {
  const { permissions, user } = useAuth();
  // Superusers implicitly have every permission — the backend doesn't
  // enumerate RolePermission rows for them, so treat is_superuser as a
  // blanket bypass here too (mirrors Sidebar.jsx's hasAccess()).
  const isSuperuser = Boolean(user?.is_superuser);

  // Extract permission names from the permissions array of objects
  // Backend returns: [{ id: 1, name: 'view_user', module: 'user_management' }, ...]
  const getPermissionNames = () => {
    if (!Array.isArray(permissions)) {
      console.warn('[usePermissions] Permissions is not an array:', permissions);
      return [];
    }

    return permissions.map(perm => {
      // Handle both string permissions and object permissions
      return typeof perm === 'string' ? perm : perm.name;
    });
  };

  const permissionNames = getPermissionNames();

  const hasPermission = (permissionCodename) => {
    if (isSuperuser) return true;
    return permissionNames.includes(permissionCodename);
  };

  const hasAnyPermission = (permissionCodenames) => {
    if (isSuperuser) return true;
    if (!Array.isArray(permissionCodenames)) {
      return false;
    }
    return permissionCodenames.some(codename => permissionNames.includes(codename));
  };

  const hasAllPermissions = (permissionCodenames) => {
    if (isSuperuser) return true;
    if (!Array.isArray(permissionCodenames)) {
      return false;
    }
    return permissionCodenames.every(codename => permissionNames.includes(codename));
  };

  return {
    permissions,
    permissionNames,
    isSuperuser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
