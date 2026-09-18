# ERP Permission System - Complete Analysis

## Executive Summary

The ERP system has a **comprehensive Role-Based Access Control (RBAC) system** with:
- 5 default system roles
- 37+ modules with granular permissions
- 4 permission types per feature (View, Add, Edit, Delete)
- 148+ permission codenames defined
- Permission caching and audit logging
- Role-based API endpoint access control

---

## 1. Permission Assignment in Database

### Database Schema

```
users (User Table)
├── id
├── email
├── username
├── is_superuser (Boolean: True = Superadmin)
├── college_id (College isolation)
└── ...other fields

user_role_assignments (Junction Table)
├── user_id (FK: users)
├── role_id (FK: user_roles)
├── college_id (FK: colleges)
├── assigned_at (DateTime)
├── is_active (Boolean)

user_roles (Role Table)
├── id
├── name (Superadmin, Admin, Teacher, Student, Staff)
├── description
├── is_default (Boolean: default system roles)
├── is_system_role (Boolean)
├── college_id (NULL for global, set for college-specific)
├── created_at
├── permissions (M2M through role_permissions)

permissions (Permission Table)
├── id
├── name (e.g., "View Student")
├── codename (e.g., "view_student")
├── description
├── module (e.g., "student", "attendance", "finance")
├── created_at

role_permissions (Junction Table)
├── role_id (FK: user_roles)
├── permission_id (FK: permissions)
├── created_at
```

### How Permissions Are Assigned

**Method 1: Via Django Management Command**
- File: `backend/apps/roles/management/commands/seed_permissions.py`
- Creates all 37 modules with their permissions
- Defines restrictions per feature (only_admin, only_superadmin, except_superadmin)

**Method 2: Via API Endpoint**
```
PUT /api/roles/{id}/permissions/
{
    "permission_ids": [1, 2, 3, 4, ...]
}
```

**Method 3: Bulk Assignment**
```
POST /api/roles/{id}/permissions/bulk/
{
    "permissions": {
        "student": [1, 2, 3, 4],
        "attendance": [5, 6, 7, 8]
    }
}
```

---

## 2. Features/API Endpoints Protected by Permissions

### Permission Checking Implementation

**Location:** `backend/apps/core/permissions_enterprise.py`

```python
class BaseModelPermission(permissions.BasePermission):
    """
    Automatically maps ViewSet actions to permissions
    
    Mapping:
    - list() / retrieve() -> view_{module}
    - create() -> add_{module}
    - update() / partial_update() -> edit_{module}
    - destroy() -> delete_{module}
    """
```

### Protected ViewSets

All ViewSets use permission decorators:

```python
@permission_classes = [IsAuthenticated, BaseModelPermission]
```

**Example: StudentAttendanceViewSet**
```
GET    /api/attendance/student-attendance/      -> Requires: view_student_attendance
POST   /api/attendance/student-attendance/      -> Requires: add_student_attendance
PUT    /api/attendance/student-attendance/{id}/ -> Requires: edit_student_attendance
DELETE /api/attendance/student-attendance/{id}/ -> Requires: delete_student_attendance
```

### Role-Based Permission Classes

```python
IsSuperadmin()      # Only users with Superadmin role
IsAdmin()           # Superadmin or Admin users
IsTeacher()         # Only Teacher role
IsStudent()         # Only Student role
IsOwnerOrAdmin()    # Owner of object or Admin user
```

### 37 Protected Modules

1. **Setting** (6 features) - Only Admin/Superadmin
2. **Theme** (1 feature)
3. **Language** (1 feature)
4. **Administrator** (13 features) - Most restricted
5. **Human Resource** (2 features)
6. **Teacher** (4 features)
7. **Academic Activity** (10 features)
8. **Guardian** (2 features)
9. **Student** (5 features)
10. **Attendance** (5 features)
11. **Exam** (5 features)
12. **Exam Mark** (11 features)
13. **Library** (4 features)
14. **Transport** (3 features)
15. **Hostel** (3 features)
16. **Messaging** (3 features)
17. **Announcement** (3 features)
18. **Event** (1 feature)
19. **Front Office** (6 features)
20. **Accounting** (11 features)
21. **Report** (1 feature)
22. **Certificate** (2 features)
23. **Media Gallery** (2 features)
24. **Frontend** (3 features)
25. **Payroll** (3 features)
26. **Complain** (2 features)
27. **User Complain** (1 feature) - Except Superadmin
28. **User Leave** (1 feature) - Except Superadmin
29. **Leave Management** (6 features)
30. **ID Card & Admit Card** (9 features)
31. **Miscellaneous** (3 features)
32. **Scholarship** (3 features)
33. **Asset Management** (6 features)
34. **Inventory** (7 features)
35. **Lessonplan** (5 features)
36. **Online Exam** (4 features)
37. **Subscription** (5 features) - Only Superadmin

---

## 3. Frontend Permission Handling

### Current Status

**Frontend permission checking:** NOT YET IMPLEMENTED (Frontend code not present)

The backend provides:
- `/api/auth/my-permissions/` - Returns user's complete permissions list
- `/api/auth/my-profile/` - Returns user profile with role info
- `/api/auth/verify-token/` - Validates current token

### How Frontend SHOULD Use Permissions

**From `/api/auth/my-permissions/` Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "email": "admin@university.edu",
            "role": "Superadmin",
            "college_id": 1
        },
        "permissions": [
            {
                "id": 1,
                "name": "View Student",
                "codename": "view_student",
                "module": "student"
            },
            {
                "id": 2,
                "name": "Add Student",
                "codename": "add_student",
                "module": "student"
            },
            ...148+ permissions
        ]
    }
}
```

### Frontend Implementation Pattern (Recommended)

```javascript
// 1. Store permissions after login
const permissions = data.permissions;
localStorage.setItem('permissions', JSON.stringify(permissions));

// 2. Check permission before rendering
function hasPermission(codename) {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.some(p => p.codename === codename);
}

// 3. Conditional UI rendering
{hasPermission('view_student') && <StudentList />}
{hasPermission('add_student') && <AddStudentButton />}

// 4. Module-level checks
function getModulePermissions(module) {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.filter(p => p.module === module);
}
```

---

## 4. User Permissions Fetching & Usage

### Backend Implementation

**File:** `backend/apps/users/models.py`

```python
class User(AbstractBaseUser):
    def get_permissions(self):
        """Get all permissions from all active roles"""
        cache_key = f'user_permissions_{self.id}'
        permissions = cache.get(cache_key)
        
        if permissions is None:
            role_ids = self.role_assignments.filter(is_active=True).values_list('role_id', flat=True)
            permissions = Permission.objects.filter(
                permission_roles__role_id__in=role_ids
            ).distinct().values('id', 'name', 'module')
            
            permissions = list(permissions)
            cache.set(cache_key, permissions, timeout=300)  # 5 min cache
        
        return permissions

    def has_permission(self, permission_codename):
        """Check if user has specific permission"""
        permissions = self.get_permissions()
        return any(p['codename'] == permission_codename for p in permissions)
```

### When Permissions Are Fetched

1. **During Login:**
   - `/api/auth/login/` returns user with redirect_url
   - User calls `/api/auth/my-permissions/` to get full list
   - Frontend caches permissions for decision-making

2. **During Permission Check:**
   - Backend checks via `request.user.has_permission(codename)`
   - Uses 5-minute cache for performance
   - Cache cleared on permission/role assignment change

3. **Role Change:**
   - When role is assigned/modified, cache is cleared automatically
   - Next API call will fetch fresh permissions

### API Endpoint for Permissions

**GET /api/auth/my-permissions/**

```
Response 200 OK:
{
    "success": true,
    "data": {
        "user": {...user details...},
        "permissions": [
            {"id": 1, "name": "...", "codename": "...", "module": "..."},
            ...
        ]
    }
}

Authentication: JWT Token (Bearer {access_token})
```

---

## 5. Roles & Visible Features Matrix

### 5 Default System Roles

#### 1. Superadmin (System Owner)

**Permissions:** ALL 148+ permissions

**Visible Features:**
- All system administration
- All college management
- All academic features
- All HR/payroll
- All inventory/assets
- All reporting and analytics
- System settings (email, SMS, payment gateways)
- Role and permission management
- User credential management
- Subscription management

**Menu Structure:**
```
Dashboard
├── System Analytics
├── All Colleges Management
├── All Users Management
├── Roles & Permissions
├── System Settings
│   ├── Email/SMS Gateways
│   ├── Payment Configuration
│   ├── Email Templates
│   └── System Parameters
├── Administrator
│   ├── Manage Super Admin
│   ├── Manage Colleges
│   └── Audit Logs
└── [All other modules]
```

#### 2. Admin (College Administrator)

**Permissions:** ~80-100 permissions

**Visible Features:**
- College dashboard only
- Manage teachers (CRUD)
- Manage students (CRUD)
- Manage staff/employees
- Manage classes & sections
- Manage subjects
- View college reports only
- Approve/reject online admissions
- Promote students
- Generate certificates
- Manage exam schedules
- Manage inventory

**Restricted:**
- Cannot see other colleges' data
- Cannot manage payment gateways
- Cannot access system-wide settings
- Cannot create other colleges

**Menu Structure:**
```
Dashboard (College-specific metrics)
├── Students Management
│   ├── View Students (view_student)
│   ├── Add Student (add_student)
│   ├── Bulk Import (bulk_import)
│   └── Online Admission (online_admission)
├── Teachers Management
│   ├── View Teachers (view_teacher)
│   ├── Add Teacher (add_teacher)
│   └── Assignments
├── Classes & Sections
│   ├── Classes (classes)
│   ├── Sections (section)
│   └── Class Routine (class_routine)
├── Academics
│   ├── Subjects (subject)
│   ├── Syllabus (syllabus)
│   └── Exams (exam_term, exam_schedule)
├── Attendance
│   ├── View All Attendance (view_student_attendance)
│   ├── Mark Attendance (add_student_attendance)
│   └── Absence Reporting
├── Marks & Results
│   ├── Enter Marks (edit_exam_mark)
│   ├── View Results (view_result)
│   └── Certificates (certificate)
├── Inventory
│   ├── Items (item_product)
│   ├── Stock (item_warehouse)
│   └── Purchases (item_purchase)
├── Reports (College-only)
│   ├── Attendance Report
│   ├── Academic Report
│   └── Fee Report
└── Settings (College-specific only)
```

#### 3. Teacher

**Permissions:** ~40-50 permissions

**Visible Features:**
- Teacher dashboard (my classes, today's schedule)
- View assigned classes & sections only
- Mark attendance for own classes only
- Enter exam marks for own subjects only
- Upload/manage study materials
- Create/manage assignments for own subjects
- View student list (assigned classes only)
- View own attendance
- Apply for leave
- View salary slips (if HR integrated)

**Restricted:**
- Can only mark attendance for classes they teach
- Can only enter marks for their subjects
- Cannot see other teachers' data
- Cannot manage students (view only)
- Cannot delete attendance
- Cannot manage classes

**Menu Structure:**
```
Dashboard (My Classes & Schedule)
├── My Classes
│   ├── Today's Classes
│   ├── Class Schedule (view_class_routine)
│   └── Assigned Sections
├── Attendance
│   ├── Mark Attendance (add_student_attendance - own classes)
│   ├── View My Attendance (view_teacher_attendance)
│   └── Class Attendance Reports
├── Marks & Results
│   ├── Enter Exam Marks (edit_exam_mark - own subjects)
│   ├── View Mark Sheet (view_mark_sheet)
│   └── Mark Reports
├── Academic Content
│   ├── Upload Materials (material)
│   ├── Create Assignments (assignment)
│   ├── Submission Review (submission)
│   └── Live Classes (live_class)
├── Leave Management
│   ├── Apply Leave (user_leave)
│   └── My Leave History
└── Ratings
    └── View Teacher Ratings (rating)
```

#### 4. Student

**Permissions:** ~20-30 permissions (mostly read-only)

**Visible Features:**
- Student dashboard (upcoming exams, attendance %)
- View own profile only
- View own attendance percentage
- View own marks & results
- Download result cards
- Download admit cards
- Take online exams (answer_exam)
- Submit assignments
- View study materials
- View class schedule
- Apply for leave
- View fee payment status
- Download certificates
- View notices/announcements

**Restricted:**
- Can only see THEIR OWN data
- Cannot see other students' marks
- Cannot view other students' attendance
- Read-only for most features
- Can only submit (exams, assignments)

**Menu Structure:**
```
Dashboard (My Stats)
├── My Profile (view_student - own)
├── My Academics
│   ├── My Classes
│   ├── My Schedule (view_class_routine)
│   └── Assigned Teachers
├── Attendance
│   ├── My Attendance (view_student_attendance - own)
│   └── Attendance Percentage
├── Exam & Marks
│   ├── Upcoming Exams (take_exam)
│   ├── My Results (view_result - own)
│   ├── Download Result Card (result_card)
│   └── Download Admit Card (admit_card)
├── Assignments
│   ├── Available Assignments (submission)
│   └── My Submissions
├── Study Materials
│   └── View Study Materials (material)
├── Fees
│   ├── My Fee Status (view_payment - own)
│   └── Payment History
├── Certificates
│   └── Download Certificate (certificate)
├── Leave
│   ├── Apply Leave (user_leave)
│   └── Leave Status
└── Announcements
    └── View Notices (notice)
```

#### 5. Staff (Accountant/Support)

**Permissions:** ~50-60 permissions

**Visible Features:**
- Staff/Accountant dashboard
- Manage fee collection
- Generate fee invoices
- View payment history
- Manage expenses
- Generate financial reports
- Manage inventory (if assigned)
- Manage suppliers & purchases
- Generate salary reports
- View employee attendance

**Restricted:**
- Cannot manage academic data (exams, marks)
- Cannot manage user accounts
- Cannot manage classes/sections
- Cannot view student marks
- Finance & inventory focused only

**Menu Structure:**
```
Dashboard (Pending Actions)
├── Fee Management
│   ├── Fee Collection (payment)
│   ├── Invoice Generation (invoice)
│   ├── Payment History (view_payment)
│   └── Due Fee Notifications
├── Accounting
│   ├── Expenses (expenditure)
│   ├── Income (income)
│   ├── Discount Management (discount)
│   └── Financial Reports
├── Inventory
│   ├── Item Management (item_product)
│   ├── Warehouse Stock (item_warehouse)
│   ├── Purchases (item_purchase)
│   ├── Sales (item_sale)
│   └── Suppliers (item_supplier)
├── Payroll
│   ├── Salary Grades (salary_grade)
│   ├── Payroll (payroll_payment)
│   └── Salary Reports
├── HR
│   ├── Employee Attendance (employee_attendance)
│   └── Leave Management
└── Reports
    ├── Financial Report
    ├── Inventory Report
    └── Payroll Report
```

---

## 6. Test User Permissions Summary

### Superadmin User
```
Email: superadmin@university.edu
Role: Superadmin
College: NULL (system-wide)
Permissions: ALL 148+ permissions
Features: Complete ERP access
```

### Admin User
```
Email: admin@college1.edu
Role: Admin
College: College 1
Permissions: ~100 permissions (all college-related)

Module Access:
- Student (view, add, edit, delete) ✓
- Teacher (view, add, edit, delete) ✓
- Attendance (view, add, edit) ✓
- Exam (view, add, edit) ✓
- Marks (view, add, edit) ✓
- Finance (view, add, edit) ✓
- Inventory (view, add, edit) ✓
- Leave (view, add, edit) ✓
- HR (view, add, edit) ✓
+ All other academic modules

Blocked Modules:
- Roles (view, add, edit) ✗
- Payment Gateway ✗
- SMS/Email Settings ✗
- User Credential ✗
- Superadmin ✗
```

### Teacher User
```
Email: teacher@college1.edu
Role: Teacher
College: College 1
Permissions: ~40 permissions (teaching-focused)

Module Access:
- Teacher (view own) ✓
- Classes (view assigned only) ✓
- Subject (view own) ✓
- Attendance (mark own classes, view own) ✓
- Exam Mark (edit own subjects) ✓
- Material (add, view) ✓
- Assignment (add, view) ✓
- Live Class (create, teach) ✓
- Teacher Lecture (view) ✓

Blocked Modules:
- Student (manage) ✗
- Attendance (delete, view all) ✗
- Marks (view all) ✗
- Fee ✗
- Inventory ✗
- Admin functions ✗
```

### Student User
```
Email: student@college1.edu
Role: Student
College: College 1
Permissions: ~20 permissions (student portal)

Module Access:
- Student (view own only) ✓
- Attendance (view own only) ✓
- Result (view own only) ✓
- Exam (take online exams) ✓
- Assignment (submit) ✓
- Material (view) ✓
- Certificate (download) ✓
- Leave (apply own) ✓

Blocked Modules:
- Teacher ✗
- Class Management ✗
- Mark Entry ✗
- Fee Management ✗
- All Admin functions ✗
```

### Staff User
```
Email: staff@college1.edu
Role: Staff
College: College 1
Permissions: ~50 permissions (finance/inventory focused)

Module Access:
- Finance (view, add, edit) ✓
- Payment (view, add, edit) ✓
- Invoice (view, add, edit) ✓
- Inventory (view, add, edit, delete) ✓
- Supplier (view, add, edit) ✓
- Payroll (view) ✓
- Employee Attendance (view) ✓
- Leave Management (view) ✓

Blocked Modules:
- Student ✗
- Teacher ✗
- Exam Marks ✗
- Class Management ✗
- All Admin functions ✗
```

---

## 7. Current Frontend Implementation Status

### What's Built (Backend)

✓ JWT authentication with access/refresh tokens
✓ Permission fetching endpoint (`/api/auth/my-permissions/`)
✓ Role information in login response
✓ Permission caching system
✓ Audit logging for permission checks
✓ Role-based permission classes
✓ Automatic permission mapping to ViewSet actions

### What's NOT Built (Frontend)

✗ React/Vue components for permission-based UI
✗ Sidebar/menu generation based on permissions
✗ Permission checking in frontend components
✗ Feature visibility toggles
✗ Layout templates for different roles
✗ Dashboard components for each role
✗ Navigation guards

### How Frontend Should Implement

**1. After Login:**
```javascript
// Store permissions
const response = await fetch('/api/auth/login', {...})
const { user, tokens, permissions } = response.data
localStorage.setItem('permissions', JSON.stringify(permissions))
localStorage.setItem('access_token', tokens.access)
```

**2. Generate Menu:**
```javascript
const menu = [
    {
        label: 'Students',
        icon: 'users',
        visible: hasPermission('view_student'),
        children: [
            {
                label: 'View Students',
                visible: hasPermission('view_student'),
                action: 'student.list'
            },
            {
                label: 'Add Student',
                visible: hasPermission('add_student'),
                action: 'student.create'
            }
        ]
    },
    // ... more menu items
]
```

**3. Protect Components:**
```jsx
function StudentList() {
    if (!hasPermission('view_student')) {
        return <NoPermission />
    }
    return <StudentListComponent />
}
```

---

## 8. Backend API Endpoints for Permissions

### Authentication Endpoints

```
POST   /api/auth/login/                  # Login, returns redirect_url
POST   /api/auth/logout/                 # Logout
POST   /api/auth/refresh/                # Refresh access token
GET    /api/auth/my-permissions/         # Current user's permissions
GET    /api/auth/my-profile/             # Current user's profile
POST   /api/auth/verify-token/           # Verify token validity
```

### Role Management Endpoints

```
GET    /api/roles/                       # List all roles (Admin/Superadmin only)
POST   /api/roles/                       # Create role (Admin/Superadmin only)
GET    /api/roles/{id}/                  # Get role details (Admin/Superadmin only)
PUT    /api/roles/{id}/                  # Update role (Admin/Superadmin only)
DELETE /api/roles/{id}/                  # Delete role (Admin/Superadmin only)

GET    /api/roles/{id}/permissions/      # Get role's permissions
PUT    /api/roles/{id}/permissions/      # Assign permissions to role
POST   /api/roles/{id}/permissions/bulk/ # Bulk assign permissions
```

### Permission Endpoints

```
GET    /api/permissions/                 # List all permissions (Admin/Superadmin)
GET    /api/permissions/{id}/            # Get permission details
GET    /api/permissions/grouped/         # Get permissions grouped by module
GET    /api/permissions/modules/         # Get list of all modules
```

### User Management Endpoints

```
GET    /api/users/                       # List users (Admin/Superadmin only)
POST   /api/users/                       # Create user (Admin/Superadmin only)
GET    /api/users/{id}/                  # Get user details
PUT    /api/users/{id}/                  # Update user
DELETE /api/users/{id}/                  # Delete user

POST   /api/users/{id}/assign-role/      # Assign role to user (Admin/Superadmin)
POST   /api/users/{id}/remove-role/      # Remove role from user
GET    /api/users/{id}/roles/            # Get user's roles
```

---

## 9. Key Files Reference

| File | Purpose |
|------|---------|
| `backend/apps/roles/models.py` | Role, Permission, RolePermission models |
| `backend/apps/roles/views.py` | Role & Permission CRUD ViewSets |
| `backend/apps/roles/permissions.py` | IsSuperadminOrAdmin, CanManagePermissions |
| `backend/apps/core/permissions_enterprise.py` | BaseModelPermission, IsSuperadmin, IsAdmin, IsTeacher, IsStudent |
| `backend/apps/users/models.py` | User model with permission methods |
| `backend/apps/authentication/views.py` | Login, Logout, MyPermissionsView, MyProfileView |
| `backend/apps/roles/management/commands/seed_permissions.py` | Initialize all 37 modules & 148+ permissions |

---

## 10. Security Features Implemented

✓ JWT tokens (access + refresh)
✓ Token blacklisting on logout
✓ Token rotation on refresh
✓ Permission caching (5 min timeout)
✓ Audit logging for all permission checks
✓ Role-based access control
✓ College isolation per role
✓ Superuser bypass for emergency access
✓ Permission validation on all endpoints
✓ Cache clearing on permission changes

---

## 11. Next Steps for Frontend

1. **Create permission service:**
   - Store permissions in state management
   - Provide hasPermission() utility function

2. **Create sidebar/menu component:**
   - Generate menu based on user's permissions
   - Show/hide menu items conditionally

3. **Create layout templates for each role:**
   - Superadmin dashboard
   - Admin dashboard
   - Teacher dashboard
   - Student dashboard
   - Staff dashboard

4. **Add permission guards:**
   - Redirect unauthorized users
   - Show permission denied message
   - Log permission check attempts

5. **Implement feature modules:**
   - Conditionally load components based on permissions
   - Disable unavailable actions
   - Show "No Permission" pages

