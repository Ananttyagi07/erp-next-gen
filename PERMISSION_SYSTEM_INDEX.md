# ERP Permission System - Complete Documentation Index

This index guides you through all permission system documentation and code.

## Documentation Files (Generated)

### 1. PERMISSION_SYSTEM_COMPLETE_ANALYSIS.md (24 KB)
**Most Comprehensive Document - Start Here**

Covers:
- Executive summary of entire permission system
- Complete database schema with all 5 tables
- 37 modules with 148+ permission definitions
- 5 default system roles with detailed feature matrices
- Complete test user definitions with capabilities
- All API endpoints documented
- Permission fetching and caching mechanism
- Frontend implementation guidance
- Security features implemented
- Migration instructions

**When to read:** If you need complete understanding of how permissions work

---

### 2. PERMISSION_QUICK_REFERENCE.md (8 KB)
**Quick Lookup - Most Used Document**

Covers:
- Role vs Feature permission matrix (quick table)
- API endpoints quick lookup
- Permission codenames organized by module
- Test user credentials and capabilities
- Permission checking code examples (Python & JavaScript)
- Common issues and solutions
- Debugging commands
- Cache settings
- File modification guide

**When to read:** When you need quick answers about specific permissions

---

### 3. KEY_PERMISSION_FILES.md (11 KB)
**Developer Reference - Code File Locations**

Covers:
- All 10+ key source code files with locations
- Database migration file locations
- Configuration file locations
- Security & audit file locations
- How permission flows through the system
- Permission codename naming patterns
- How to extend the system
- Testing procedures
- Permission system status checklist

**When to read:** When you need to modify code or extend the system

---

## Key Source Code Files

### Core Models
**File:** `backend/apps/roles/models.py`
- Permission model (granular permissions)
- Role model (user roles)
- RolePermission model (role-permission mapping)

**File:** `backend/apps/users/models.py`
- User model with permission methods
- get_permissions(): Get cached permissions
- has_permission(codename): Check single permission
- UserRoleAssignment (user-role mapping)

### Permission Enforcement
**File:** `backend/apps/core/permissions_enterprise.py`
- BaseModelPermission: Auto-maps ViewSet actions to permissions
- IsSuperadmin, IsAdmin, IsTeacher, IsStudent: Role-based checks
- AuditLoggingMixin: Logs all operations
- Decorators: require_permission(), require_role()

### API Views
**File:** `backend/apps/authentication/views.py`
- LoginView: /api/auth/login/
- MyPermissionsView: /api/auth/my-permissions/ (Get user's permissions)
- MyProfileView: /api/auth/my-profile/
- LogoutView, RefreshTokenView, VerifyTokenView

**File:** `backend/apps/roles/views.py`
- RoleViewSet: CRUD operations on roles
- PermissionViewSet: List and manage permissions

### Initialization
**File:** `backend/apps/roles/management/commands/seed_permissions.py`
- Creates all 37 modules
- Creates all 148+ permissions
- Creates 5 default system roles
- Run: `python manage.py seed_permissions`

---

## Permission System Architecture

```
Database Layer:
  users (User) 
    ↓
  user_role_assignments (User-Role mapping)
    ↓
  user_roles (Role)
    ↓
  role_permissions (Role-Permission mapping)
    ↓
  permissions (Permission definitions)

API Layer:
  /api/auth/login/ → Generates JWT token
    ↓
  /api/auth/my-permissions/ → Returns 148+ permissions
    ↓
  Frontend stores in localStorage/state
    ↓
  /api/students/ → BaseModelPermission checks: request.user.has_permission('view_student')
    ↓
  ViewSet returns filtered queryset
```

---

## The 5 Default System Roles

### 1. Superadmin
- Permissions: ALL 148+ permissions
- Access: System-wide, all colleges
- Use case: System owner/developer
- Features: Complete ERP control

### 2. Admin
- Permissions: 100+ permissions (college-related)
- Access: Own college only
- Use case: College administrator
- Features: Manage students, teachers, exams, finance
- Blocked: System settings, payment gateways, other colleges

### 3. Teacher
- Permissions: 40+ permissions (teaching-focused)
- Access: Own classes and subjects
- Use case: Faculty member
- Features: Mark attendance, enter marks, upload materials
- Blocked: Delete operations, manage all students, finance

### 4. Student
- Permissions: 20+ permissions (read-only mostly)
- Access: Own data only
- Use case: Student portal access
- Features: View grades, take exams, submit assignments
- Blocked: View other students, manage anything

### 5. Staff (Accountant)
- Permissions: 50+ permissions (finance/inventory)
- Access: Finance and inventory only
- Use case: Support staff
- Features: Manage fees, invoices, inventory, payroll
- Blocked: Academic data, user management

---

## 37 Modules with Permissions

Each module has 4 permission types:
- view_{module} (READ)
- add_{module} (CREATE)
- edit_{module} (UPDATE)
- delete_{module} (DELETE)

### Core Academic Modules
1. Student (5 permissions)
2. Teacher (4 permissions)
3. Classes (4 permissions)
4. Subject (4 permissions)
5. Section (4 permissions)
6. Attendance - Student (5 permissions)
7. Attendance - Teacher (4 permissions)
8. Exam (5 permissions)
9. Exam Mark (11 permissions)
10. Result (4 permissions)
11. Certificate (2 permissions)
12. Material (4 permissions)
13. Assignment (4 permissions)
14. Submission (4 permissions)
15. Live Class (4 permissions)
16. Lesson Plan (5 permissions)

### Administrative Modules
17. Administrator (13 permissions)
18. User Management (3 permissions)
19. Role Permission (4 permissions)
20. Settings (6 permissions)

### Financial Modules
21. Accounting (11 permissions)
22. Payment (4 permissions)
23. Invoice (4 permissions)
24. Payroll (3 permissions)

### Inventory Modules
25. Inventory (7 permissions)
26. Asset Management (6 permissions)

### HR Modules
27. Human Resource (2 permissions)
28. Employee Attendance (4 permissions)
29. Leave Management (6 permissions)

### Facility Modules
30. Library (4 permissions)
31. Transport (3 permissions)
32. Hostel (3 permissions)

### Communication Modules
33. Messaging (3 permissions)
34. Announcement (3 permissions)
35. Complain (2 permissions)

### Other Modules
36. Event (1 permission)
37. Report (1 permission)

Plus: Subscription, Online Exam, ID Card, etc.

---

## Quick Start for Different Roles

### If you're building frontend:
1. Read: PERMISSION_QUICK_REFERENCE.md
2. Look at: `/api/auth/my-permissions/` endpoint
3. Implement: Permission service + UI guards

### If you're adding new features:
1. Read: KEY_PERMISSION_FILES.md
2. Edit: backend/apps/roles/management/commands/seed_permissions.py
3. Run: python manage.py seed_permissions
4. Add: permission_module = 'your_module' to ViewSet
5. Protect: @permission_classes = [IsAuthenticated, BaseModelPermission]

### If you're managing permissions:
1. Read: PERMISSION_QUICK_REFERENCE.md
2. Use: /api/roles/{id}/permissions/ endpoint
3. Test: /api/auth/my-permissions/ (verify user has permissions)

### If you're debugging permission issues:
1. Read: PERMISSION_QUICK_REFERENCE.md → Common Issues section
2. Check: Django shell - user.get_permissions()
3. Debug: /api/auth/my-permissions/ endpoint
4. Verify: User's role assignments in database

---

## Test Users You Can Use

All test users are in College 1 (except Superadmin):

```
Superadmin (System Owner)
Email: superadmin@university.edu
Role: Superadmin
Access: ALL features, ALL colleges
Permissions: 148+ (ALL)

Admin (College Administrator)  
Email: admin@college1.edu
Role: Admin
Access: College 1 only
Permissions: ~100

Teacher
Email: teacher@college1.edu
Role: Teacher
Access: Own classes only
Permissions: ~40

Student
Email: student@college1.edu
Role: Student
Access: Own data only
Permissions: ~20

Staff (Accountant)
Email: staff@college1.edu
Role: Staff
Access: Finance/Inventory
Permissions: ~50
```

All passwords: Use default (check seed script or Django admin)

---

## Implementation Checklist

### Backend (COMPLETE)
- [x] Permission models (Role, Permission, RolePermission)
- [x] User model with permission methods
- [x] 37 modules with 148+ permissions defined
- [x] 5 default system roles created
- [x] Permission seeding command
- [x] BaseModelPermission auto-mapper
- [x] JWT authentication
- [x] Permission caching (5-min timeout)
- [x] Audit logging
- [x] /api/auth/my-permissions/ endpoint
- [x] /api/roles/ management endpoints
- [x] College isolation per role

### Frontend (NOT STARTED)
- [ ] Permission service
- [ ] hasPermission() utility function
- [ ] Sidebar menu generation from permissions
- [ ] Component permission guards
- [ ] Role-specific dashboard layouts
- [ ] Feature visibility toggles
- [ ] Unauthorized access handling

---

## API Endpoints for Permissions

### Authentication
```
POST   /api/auth/login/              # Login (returns redirect_url)
GET    /api/auth/my-permissions/     # Get current user's permissions
GET    /api/auth/my-profile/         # Get user profile
POST   /api/auth/logout/             # Logout
```

### Role Management (Admin/Superadmin only)
```
GET    /api/roles/                          # List all roles
POST   /api/roles/                          # Create new role
GET    /api/roles/{id}/                     # Get role details
PUT    /api/roles/{id}/                     # Update role
DELETE /api/roles/{id}/                     # Delete role
GET    /api/roles/{id}/permissions/         # Get role's permissions
PUT    /api/roles/{id}/permissions/         # Assign permissions
POST   /api/roles/{id}/permissions/bulk/    # Bulk assign
```

### Permission Management (Admin/Superadmin only)
```
GET    /api/permissions/                    # List all permissions
GET    /api/permissions/{id}/               # Get permission details
GET    /api/permissions/grouped/            # Grouped by module
GET    /api/permissions/modules/            # List of all modules
```

---

## How to Test Permissions

### Via curl (with JWT token)
```bash
# Get your permissions
curl -X GET http://localhost:8000/api/auth/my-permissions/ \
  -H "Authorization: Bearer {your_access_token}"

# Get role's permissions
curl -X GET http://localhost:8000/api/roles/1/permissions/ \
  -H "Authorization: Bearer {your_access_token}"

# Try to access protected endpoint
curl -X GET http://localhost:8000/api/students/ \
  -H "Authorization: Bearer {student_token}"
# Should fail if student doesn't have view_student permission
```

### Via Django Shell
```python
from django.contrib.auth import get_user_model
from apps.roles.models import Role

User = get_user_model()

# Check user permissions
user = User.objects.get(email='admin@college1.edu')
print(user.get_permissions())
print(user.has_permission('view_student'))

# Check role permissions
role = Role.objects.get(name='Admin')
print(role.permissions.all())
```

---

## File Locations Summary

**Models:**
- `/backend/apps/roles/models.py` - Role, Permission, RolePermission
- `/backend/apps/users/models.py` - User, UserRoleAssignment

**Views & Serializers:**
- `/backend/apps/roles/views.py` - RoleViewSet, PermissionViewSet
- `/backend/apps/authentication/views.py` - LoginView, MyPermissionsView
- `/backend/apps/roles/serializers.py` - Serializers

**Permission Enforcement:**
- `/backend/apps/core/permissions_enterprise.py` - BaseModelPermission, role classes

**Initialization:**
- `/backend/apps/roles/management/commands/seed_permissions.py` - Seed permissions

**URLs:**
- `/backend/apps/roles/urls.py` - Role API routes
- `/backend/apps/authentication/urls.py` - Auth routes
- `/backend/config/urls.py` - Main URL config

**Documentation:**
- `/PERMISSION_SYSTEM_COMPLETE_ANALYSIS.md` - Full documentation
- `/PERMISSION_QUICK_REFERENCE.md` - Quick lookup
- `/KEY_PERMISSION_FILES.md` - File reference
- `/ROLE_BASED_ARCHITECTURE.md` - Architecture overview
- `/ATTENDANCE_ROLE_EXAMPLE.md` - Detailed example

---

## Summary

The ERP has a **complete, production-ready permission system** with:

- 148+ granular permissions
- 37 modules covering all features
- 5 default system roles
- College-based isolation
- JWT authentication
- Permission caching
- Audit logging
- Full backend implementation

What remains is implementing the **frontend permission-based UI rendering**.

Use these documents as reference when:
1. Building frontend permission checks
2. Adding new features and permissions
3. Debugging permission issues
4. Extending the system
5. Testing with different user roles

---

**Start with:** `PERMISSION_QUICK_REFERENCE.md` for quick answers
**Dive deeper:** `PERMISSION_SYSTEM_COMPLETE_ANALYSIS.md` for full understanding
**Implement changes:** `KEY_PERMISSION_FILES.md` for code locations

Good luck! The backend is ready for your frontend implementation.

