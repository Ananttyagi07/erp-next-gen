# Permission System - Quick Reference

## Role Permissions at a Glance

| Feature | Superadmin | Admin | Teacher | Student | Staff |
|---------|:----------:|:-----:|:-------:|:-------:|:-----:|
| **Dashboard** | Full System | College Only | My Classes | My Stats | Finance |
| **Students** | C,R,U,D (All) | C,R,U,D (Own) | R (Own) | R (Self) | R (Own) |
| **Teachers** | C,R,U,D (All) | C,R,U,D (Own) | R (Self) | ✗ | ✗ |
| **Attendance** | C,R,U,D (All) | C,R,U,D (All) | C,R (Own) | R (Self) | ✗ |
| **Marks** | C,R,U,D (All) | C,R,U,D (All) | C,U (Own) | R (Self) | ✗ |
| **Exams** | C,R,U,D | C,R,U,D | R (Own) | R (Take) | ✗ |
| **Finance** | C,R,U,D | C,R,U,D | ✗ | R (Self) | C,R,U,D |
| **Inventory** | C,R,U,D | C,R,U,D | ✗ | ✗ | C,R,U,D |
| **HR/Payroll** | C,R,U,D | C,R,U,D | R (Self) | ✗ | R |
| **Settings** | C,R,U,D | R (Own) | ✗ | ✗ | ✗ |
| **Roles** | C,R,U,D | ✗ | ✗ | ✗ | ✗ |
| **Reports** | All | College Only | Own Classes | ✗ | Finance |

**Legend:** C=Create, R=Read, U=Update, D=Delete, ✗=No Access

---

## API Endpoints Quick Lookup

### Authentication
```
POST   /api/auth/login/              # Login
GET    /api/auth/my-permissions/     # Get user's permissions
GET    /api/auth/my-profile/         # Get user profile
POST   /api/auth/logout/             # Logout
```

### Roles & Permissions (Admin/Superadmin only)
```
GET    /api/roles/                   # List roles
POST   /api/roles/                   # Create role
PUT    /api/roles/{id}/permissions/  # Assign permissions
```

### Key Feature Endpoints
```
GET    /api/students/                # List students
POST   /api/students/                # Create student
GET    /api/attendance/student-attendance/  # Attendance records
PUT    /api/exam-management/marks/   # Enter marks
GET    /api/finance/payments/        # Finance records
```

---

## Permission Codenames by Module

### Core Academic (37 modules)
```
Student: view_student, add_student, edit_student, delete_student
Teacher: view_teacher, add_teacher, edit_teacher, delete_teacher
Classes: view_classes, add_classes, edit_classes, delete_classes
Subject: view_subject, add_subject, edit_subject, delete_subject
Attendance: view_student_attendance, add_student_attendance, edit_student_attendance, delete_student_attendance
Exam: view_exam_term, add_exam_term, edit_exam_term, delete_exam_term
Marks: view_exam_mark, add_exam_mark, edit_exam_mark, delete_exam_mark
```

### Finance & Inventory
```
Finance: view_payment, add_payment, edit_payment, delete_payment
Invoice: view_invoice, add_invoice, edit_invoice, delete_invoice
Inventory: view_item_product, add_item_product, edit_item_product, delete_item_product
Supplier: view_item_supplier, add_item_supplier, edit_item_supplier, delete_item_supplier
```

### HR & Leave
```
Employee: view_employee, add_employee, edit_employee, delete_employee
Leave: view_leave_application, add_leave_application, edit_leave_application, delete_leave_application
Payroll: view_payroll_payment, add_payroll_payment, edit_payroll_payment
```

---

## How To Check Permissions

### Backend (Python)
```python
# Check single permission
if request.user.has_permission('view_student'):
    # Show students list

# Get all permissions
permissions = request.user.get_permissions()
for perm in permissions:
    print(perm['codename'])  # e.g., 'view_student'
```

### Frontend (JavaScript)
```javascript
// Get permissions from API
const response = await fetch('/api/auth/my-permissions/', {
    headers: { 'Authorization': `Bearer ${token}` }
})
const permissions = response.data.permissions

// Check permission
function hasPermission(codename) {
    return permissions.some(p => p.codename === codename)
}

// Use in React
{hasPermission('add_student') && <AddStudentBtn />}
```

---

## Test Users & Their Permissions

### Superadmin
```
Email: superadmin@university.edu
Password: superadmin123
Permissions: ALL (148+ permissions)
College: None (system-wide access)
```

### College Admin
```
Email: admin@college1.edu
Password: admin123
Permissions: College management (100+ permissions)
College: College 1 only
Can: Manage students, teachers, exams, attendance, finance
Cannot: Manage payment gateways, system settings, other colleges
```

### Teacher
```
Email: teacher@college1.edu
Password: teacher123
Permissions: Teaching focused (40+ permissions)
College: College 1
Can: Mark attendance, enter marks, upload materials, create assignments
Cannot: Delete attendance, manage all students, manage finance
```

### Student
```
Email: student@college1.edu
Password: student123
Permissions: Student portal (20+ permissions)
College: College 1
Can: View own attendance, marks, take exams, submit assignments
Cannot: View other students' data, manage anything
```

### Staff
```
Email: staff@college1.edu
Password: staff123
Permissions: Finance/Inventory (50+ permissions)
College: College 1
Can: Manage finance, invoices, inventory, payroll
Cannot: Manage students, exams, academic data
```

---

## Permission Assignment Methods

### Method 1: Seed Command
```bash
python manage.py seed_permissions
```
Creates all 37 modules with 148+ permissions and assigns to default roles

### Method 2: API Endpoint
```bash
PUT /api/roles/{role_id}/permissions/
{
    "permission_ids": [1, 2, 3, 4, ...]
}
```

### Method 3: Django Admin
Go to `/admin/` and edit role permissions directly

---

## Column Mapping: Module vs Feature

```
module: "student"               -> Feature: "View Student", "Add Student", etc.
module: "attendance"            -> Feature: "View Attendance", "Mark Attendance", etc.
module: "exam_mark"             -> Feature: "View Marks", "Enter Marks", etc.
module: "payment"               -> Feature: "View Payment", "Collect Fee", etc.
module: "item_product"          -> Feature: "View Inventory", "Add Item", etc.
module: "leave_application"     -> Feature: "Apply Leave", "Approve Leave", etc.
```

---

## Cache Settings

- Permission cache timeout: 5 minutes
- Cache key pattern: `user_permissions_{user_id}`
- Cache is cleared when: Role/permission assigned, user logout
- Backend checks: `request.user.get_permissions()` (cached)

---

## Common Issues & Solutions

### Issue: User sees "Permission Denied"
**Solution:** Check role assignments in DB
```python
# In Django shell
user = User.objects.get(email='user@example.com')
print(user.role_assignments.filter(is_active=True))
```

### Issue: New permission not showing up
**Solution:** 
1. Run seed_permissions command
2. Clear user's permission cache
3. User logs out and logs back in

### Issue: Permission shows but API still blocks
**Solution:** Check permission_classes on ViewSet
```python
permission_classes = [IsAuthenticated, BaseModelPermission]
permission_module = 'student'  # Must be defined
```

---

## Files to Modify for Custom Permissions

1. **Add new module:**
   - Edit `backend/apps/roles/management/commands/seed_permissions.py`
   - Add to MODULES dict

2. **Assign to role:**
   - Use `/api/roles/{id}/permissions/` endpoint
   - Or edit in Django admin

3. **Protect endpoint:**
   - Add `permission_module = 'module_name'` to ViewSet
   - Use `@permission_classes = [IsAuthenticated, BaseModelPermission]`

---

## Debugging Permissions

### Check what permissions user has
```bash
curl -X GET http://localhost:8000/api/auth/my-permissions/ \
  -H "Authorization: Bearer {access_token}"
```

### Check role's permissions
```bash
curl -X GET http://localhost:8000/api/roles/{role_id}/permissions/ \
  -H "Authorization: Bearer {access_token}"
```

### List all permissions in system
```bash
curl -X GET http://localhost:8000/api/permissions/grouped/ \
  -H "Authorization: Bearer {access_token}"
```

---

## Summary

- **Backend:** Complete RBAC system with permission enforcement
- **Frontend:** Needs implementation for permission-based UI
- **Test Users:** 5 predefined roles with different permission levels
- **Features:** 37 modules with 148+ granular permissions
- **Security:** JWT + permission caching + audit logging

**Next Step:** Implement frontend permission checking using `/api/auth/my-permissions/` endpoint.

