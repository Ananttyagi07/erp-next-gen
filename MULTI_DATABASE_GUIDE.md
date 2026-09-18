# Multi-Database Switching Guide

## Overview

This ERP system supports multiple schools with separate databases. When you select a school from the dropdown, the system automatically switches between:

- **School 1**: Uses `Erp_Database` (PostgreSQL)
- **School 2**: Uses `Erp_Database2` (PostgreSQL)

All data is completely isolated per school, and no data from different schools will appear together.

---

## Architecture

### Backend Components

#### 1. Database Router (`apps/core/db_router.py`)

The `SchoolDatabaseRouter` class handles database routing based on school selection:

- **`db_for_read()`**: Routes read queries to the correct database
- **`db_for_write()`**: Routes write queries to the correct database
- **`get_db_for_school()`**: Determines which database to use based on current school context
  - `'school1'` → `'default'` database (`Erp_Database`)
  - `'school2'` → `'secondary'` database (`Erp_Database2`)

**Key Methods:**
```python
SchoolDatabaseRouter.set_school('school2')  # Set context to School 2
SchoolDatabaseRouter.get_current_school()   # Get current school context
SchoolDatabaseRouter.clear_school()         # Clear context
```

#### 2. Middleware (`apps/core/middleware.py`)

The `SchoolDatabaseMiddleware` intercepts each request and:

1. Extracts school selection from (in priority order):
   - Header: `X-School-Id`
   - Query parameter: `school_id`
   - POST parameter: `school_id`
   - Session: `school_id`
   - Default: `'school1'`

2. Validates the school ID (must be 'school1' or 'school2')
3. Sets the database context for the request
4. Stores the selection in the session for persistence

#### 3. Database Configuration (`config/settings/base.py`)

Both databases are configured in Django settings:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Erp_Database',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'secondary': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Erp_Database2',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

DATABASE_ROUTERS = ['apps.core.db_router.SchoolDatabaseRouter']
```

---

### Frontend Components

#### 1. API Service (`src/services/apiService.js`)

The axios interceptor automatically adds the school ID to every API request:

```javascript
// Request interceptor
const schoolId = localStorage.getItem('selectedSchool') || 'school1';
config.headers['X-School-Id'] = schoolId;
```

#### 2. General Settings Component (`src/pages/admin/GeneralSettings.jsx`)

**School Selection Dropdown:**
- Located in the Global Header Bar
- Options: School 1 (Erp_Database) and School 2 (Erp_Database2)
- Default: School 1

**Handler Functions:**
```javascript
handleSchoolChange(e) {
  const school = e.target.value;
  setSelectedSchool(school);
  localStorage.setItem('selectedSchool', school);  // Persist selection
  setTimeout(() => fetchSettings(), 100);          // Reload data
}
```

**Initialization:**
```javascript
useEffect(() => {
  const savedSchool = localStorage.getItem('selectedSchool') || 'school1';
  setSelectedSchool(savedSchool);
  localStorage.setItem('selectedSchool', savedSchool);
  fetchSettings();
}, []);
```

---

## How It Works

### Step-by-Step Flow

1. **User Selects School** (Frontend)
   - User clicks the "Select School" dropdown in the General Settings page
   - User chooses "School 1" or "School 2"

2. **Store Selection** (Frontend)
   - Selection is saved to `localStorage` as `selectedSchool`
   - Settings are reloaded for the selected school
   - School ID is sent in API request header: `X-School-Id: school2`

3. **Middleware Processes Request** (Backend)
   - `SchoolDatabaseMiddleware` extracts the `X-School-Id` header
   - School context is set: `SchoolDatabaseRouter.set_school('school2')`
   - Request is stored in session for persistence

4. **Database Router Directs Queries** (Backend)
   - All ORM queries check the database router
   - Router returns the appropriate database:
     - `'default'` for school1
     - `'secondary'` for school2
   - Only data from the selected school is fetched

5. **Response Sent** (Backend)
   - Response contains data only from the selected school's database
   - Middleware clears the database context after response

---

## Testing the System

### Test Case 1: School 1 Settings

1. Navigate to **Administrator → General Settings**
2. Ensure "School 1 (Erp_Database)" is selected in the dropdown
3. Verify that settings from `Erp_Database` are displayed
4. Edit a setting and save
5. Refresh the page to confirm the change persists

### Test Case 2: School 2 Settings

1. In the same General Settings page
2. Change the dropdown to "School 2 (Erp_Database2)"
3. **Observe**: Settings change automatically (different data from different database)
4. Edit a setting and save
5. Change back to School 1 and verify the previous changes are still there
6. Change back to School 2 and verify the new changes are saved

### Test Case 3: Session Persistence

1. Select "School 2" in General Settings
2. Navigate to another page (e.g., Payment Settings)
3. Return to General Settings
4. **Observe**: "School 2" is still selected (from session)

---

## Files Modified

### Backend

- `config/settings/base.py`: Added database router and middleware
- `apps/core/db_router.py`: Created new database router (NEW)
- `apps/core/middleware.py`: Created new middleware (NEW)

### Frontend

- `src/services/apiService.js`: Added school ID to API headers
- `src/pages/admin/GeneralSettings.jsx`: Added school selection logic

---

## Technical Details

### Database Context Management

The system uses **thread-local storage** to maintain database context:

```python
# Thread-local storage for database context
_thread_local = local()

# Set context (called by middleware)
_thread_local.school_id = 'school2'

# Get context (called by database router)
school_id = getattr(_thread_local, 'school_id', None)
```

This ensures:
- Each request/thread has its own isolated context
- No cross-contamination between requests
- Proper cleanup after request completion

### Request Flow Diagram

```
Frontend (Browser)
    ↓
    [User selects School 2]
    ↓
    [localStorage.setItem('selectedSchool', 'school2')]
    ↓
    [API Request with Header: X-School-Id: school2]
    ↓
Backend (Django)
    ↓
    [SchoolDatabaseMiddleware receives request]
    ↓
    [Extract X-School-Id header → 'school2']
    ↓
    [SchoolDatabaseRouter.set_school('school2')]
    ↓
    [View processes request]
    ↓
    [Database Router: db_for_read() → 'secondary']
    ↓
    [ORM queries Erp_Database2]
    ↓
    [Response with School 2 data]
    ↓
    [Middleware clears context]
    ↓
Frontend (Browser)
    ↓
    [Display School 2 data]
```

---

## Advanced Usage

### Setting School Context Programmatically

In backend views or management commands:

```python
from apps.core.db_router import SchoolDatabaseRouter

# Set to School 2
SchoolDatabaseRouter.set_school('school2')

# Perform queries (will use Erp_Database2)
settings = GeneralSetting.objects.first()

# Check current school
current_school = SchoolDatabaseRouter.get_current_school()

# Clear context when done
SchoolDatabaseRouter.clear_school()
```

### Custom Management Commands

To run migrations on a specific database:

```bash
# Migrate default database (School 1)
python manage.py migrate default

# Migrate secondary database (School 2)
python manage.py migrate --database=secondary
```

---

## Troubleshooting

### Issue: Data from both schools appears together

**Solution**: Ensure the database router is registered in settings.py:
```python
DATABASE_ROUTERS = ['apps.core.db_router.SchoolDatabaseRouter']
```

### Issue: School selection not persisting

**Solution**: Check that localStorage is enabled in browser and `selectedSchool` is being saved:
```javascript
console.log(localStorage.getItem('selectedSchool'));
```

### Issue: API requests not reaching correct database

**Solution**: Verify the middleware is registered:
```python
MIDDLEWARE = [
    # ... other middleware ...
    'apps.core.middleware.SchoolDatabaseMiddleware',
]
```

### Issue: Wrong database in middleware

**Solution**: Check request headers in browser DevTools:
- Network tab
- Select an API request
- Look for `X-School-Id` header

---

## Future Enhancements

1. **Dynamic School Registration**: Add ability to create/manage schools in admin panel
2. **School Selection UI**: Create a dedicated school switcher component
3. **Data Migration Tools**: Build migration utilities to move data between databases
4. **Audit Logging**: Log all data access per school
5. **Performance Optimization**: Implement connection pooling per database

---

## Support

For issues or questions about the multi-database system, refer to:
- Database router: `apps/core/db_router.py`
- Middleware: `apps/core/middleware.py`
- Settings: `config/settings/base.py`
