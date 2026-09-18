/**
 * Permission Service
 * Handles permission checking for role-based access control
 */

class PermissionService {
  constructor() {
    this.permissions = [];
  }

  /**
   * Set user permissions
   * @param {Array|Object} permissions - Array of permission strings or permission object
   */
  setPermissions(permissions) {
    if (Array.isArray(permissions)) {
      this.permissions = permissions;
    } else if (typeof permissions === 'object' && permissions !== null) {
      // If it's an object with a permissions property
      this.permissions = permissions.permissions || [];
    } else {
      this.permissions = [];
    }
    console.log('[PermissionService] Permissions set:', this.permissions.length);
  }

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission codename to check
   * @returns {boolean} True if user has permission
   */
  hasPermission(permission) {
    const has = this.permissions.includes(permission);
    console.debug(`[PermissionService] Checking permission "${permission}": ${has}`);
    return has;
  }

  /**
   * Check if user has ANY of the given permissions
   * @param {Array} permissions - Array of permission codenames
   * @returns {boolean} True if user has at least one permission
   */
  hasAnyPermission(permissions) {
    if (!Array.isArray(permissions)) {
      return false;
    }
    return permissions.some(p => this.hasPermission(p));
  }

  /**
   * Check if user has ALL of the given permissions
   * @param {Array} permissions - Array of permission codenames
   * @returns {boolean} True if user has all permissions
   */
  hasAllPermissions(permissions) {
    if (!Array.isArray(permissions)) {
      return false;
    }
    return permissions.every(p => this.hasPermission(p));
  }

  /**
   * Get all user permissions
   * @returns {Array} Array of permission codenames
   */
  getPermissions() {
    return this.permissions;
  }

  /**
   * Clear all permissions
   */
  clearPermissions() {
    this.permissions = [];
    console.log('[PermissionService] Permissions cleared');
  }

  /**
   * Check if user is a superuser (has all permissions)
   * @returns {boolean}
   */
  isSuperuser() {
    return this.permissions.length > 140; // Backend has 148+ permissions
  }

  /**
   * Get feature access for a module
   * @param {string} module - Module name (e.g., 'students', 'teachers')
   * @returns {Object} Object with CRUD operations
   */
  getModuleAccess(module) {
    return {
      canView: this.hasPermission(`view_${module}`),
      canCreate: this.hasPermission(`add_${module}`),
      canEdit: this.hasPermission(`change_${module}`),
      canDelete: this.hasPermission(`delete_${module}`),
    };
  }

  /**
   * Get visible menu items based on permissions
   * @param {Array} allMenuItems - All available menu items
   * @returns {Array} Filtered menu items user can access
   */
  getVisibleMenuItems(allMenuItems) {
    return allMenuItems.filter(item => {
      // If no permission required, always show
      if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
        return true;
      }

      // Check if user has required permissions
      if (item.requireAll) {
        return this.hasAllPermissions(item.requiredPermissions);
      } else {
        return this.hasAnyPermission(item.requiredPermissions);
      }
    });
  }
}

// Export singleton instance
export default new PermissionService();
