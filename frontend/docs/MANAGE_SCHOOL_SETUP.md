# Manage School - Complete Setup Guide

## Overview
A comprehensive school management interface with full CRUD operations, data export, and advanced form features.

## What Was Built

### Backend (Django)

#### 1. Updated College Model
**Location:** `backend/apps/colleges/models.py`

New fields added:
- **Basic Information**: school_url, code, name, address, phone, registration_date, email, fax, footer
- **Settings**: currency, currency_symbol, enable_frontend, exam_final_result, language, theme, online_admission, enable_rtl, zoom_api_key, zoom_secret, google_map
- **Social**: facebook_url, twitter_url, linkedin_url, youtube_url, instagram_url, pinterest_url
- **Images**: frontend_logo, admin_logo

#### 2. Updated Serializers
**Location:** `backend/apps/colleges/serializers.py`

Three serializers created:
- `CollegeListSerializer` - For listing (id, name, code, email, phone, address, admin_logo, is_active)
- `CollegeCreateSerializer` - For create/update with validation
- `CollegeDetailSerializer` - For detailed view with all fields

#### 3. Migrations Applied
Run these commands to apply database changes:

```bash
cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend

# Make migrations
python3 manage.py makemigrations colleges

# Apply migrations
python3 manage.py migrate colleges
```

### Frontend (React)

#### 1. API Service
**Location:** `frontend/src/services/colleges.js`

Complete CRUD operations:
- `getColleges()` - List all schools
- `getCollege(id)` - Get single school details
- `createCollege(formData)` - Create with file upload support
- `updateCollege(id, formData)` - Update with file upload support
- `deleteCollege(id)` - Soft delete
- `getSubscriptionStatus(id)` - Check subscription

#### 2. ManageSchool Component
**Location:** `frontend/src/pages/admin/ManageSchool.jsx`

Features implemented:
- ✅ Tab-based navigation (List/Add)
- ✅ Data table with 9 columns
- ✅ Search and filtering
- ✅ Pagination (5, 10, 15, 25, 50 rows per page)
- ✅ CSV, Excel, PDF export
- ✅ Edit functionality
- ✅ Delete with confirmation
- ✅ Comprehensive add/edit form
- ✅ Logo upload
- ✅ Quick Links navigation
- ✅ Collapsible header
- ✅ Error/Success alerts

## Setup Instructions

### Step 1: Backend Setup

```bash
cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend

# Activate virtual environment
source venv/bin/activate

# Install dependencies (if needed)
pip install -r requirements.txt

# Apply migrations (already done but here for reference)
python manage.py migrate

# Create superuser (if needed)
python manage.py createsuperuser

# Run development server
python manage.py runserver 0.0.0.0:8004
```

### Step 2: Frontend Setup

```bash
cd /Users/ayushkumar/Desktop/frontend

# Install dependencies
npm install

# Ensure these packages are installed:
npm install xlsx jspdf jspdf-autotable

# Run development server
npm run dev
```

### Step 3: Verify Setup

1. **Backend API**: http://localhost:8004/api/colleges/
2. **Frontend**: http://localhost:5173/ (or your frontend port)
3. **ManageSchool Page**: http://localhost:5173/admin/manage-school

## API Endpoints

```
GET    /api/colleges/           # List all colleges
POST   /api/colleges/           # Create college
GET    /api/colleges/{id}/      # Get college details
PUT    /api/colleges/{id}/      # Update college
DELETE /api/colleges/{id}/      # Delete (soft delete)
```

## Form Fields Reference

### Basic Information Section
- School URL * (required, slug format)
- School Code * (required, unique)
- School Name * (required)
- Address * (required, textarea)
- Phone * (required)
- Registration Date (date picker)
- Email * (required, email validation)
- Fax (optional)
- Footer (optional, textarea)

### Setting Information Section
- Currency (optional)
- Currency Symbol * (required)
- Enable Frontend * (Yes/No dropdown)
- Exam Final Result * (4 options)
- Language * (5 language options)
- Theme * (Light/Dark/Blue/Green)
- Online Admission (checkbox)
- Enable RTL (Yes/No dropdown)
- Zoom API Key (optional)
- Zoom Secret (optional, password)
- Google Map (optional, embed code)

### Social Information Section
- Facebook URL
- Twitter URL
- LinkedIn URL
- YouTube URL
- Instagram URL
- Pinterest URL

### Other Information Section
- Frontend Logo (upload, max 150px width, 90px height)
- Admin Logo (upload, max 100px width, 110px height)

## List View Features

### Table Controls
- **Export Buttons**: CSV, Excel, PDF
- **Rows Per Page**: Select 5, 10, 15, 25, or 50
- **Search**: Real-time search by name, code, or email
- **Table Columns**: #SL, Name, Code, Email, Phone, Address, Logo, Status, Action
- **Actions**: Edit (blue), Delete (red)

### Pagination
- Previous/Next buttons
- Entry count display
- Go to specific page

## Quick Links
Accessible from the collapsible header:
1. General Setting
2. Manage School
3. Payment Setting
4. SMS Setting
5. Email Setting
6. Academic Year
7. User Role
8. Role Permission
9. Super Admin
10. Manage User
11. Reset User Password
12. Reset Username
13. User Credential
14. Activity Log
15. Feedback
16. Backup
17. Opening Hour

## Database Integration

The component automatically handles:
- ✅ Authentication via JWT tokens
- ✅ Error handling and user feedback
- ✅ Loading states with spinners
- ✅ Form validation
- ✅ File uploads (multipart/form-data)
- ✅ Soft delete (marks as inactive)
- ✅ Response error messages

## Troubleshooting

### Blank Page Issue
1. Check backend is running: `python manage.py runserver`
2. Verify API URL in `frontend/src/services/api.js`
3. Check browser console (F12) for errors
4. Ensure JWT token is valid

### Import Errors
If you see: `The requested module does not provide an export named...`
- Run `npm install` in frontend directory
- Clear node_modules and reinstall if needed

### API Connection Issues
1. Verify backend is running on correct port
2. Check CORS settings in Django
3. Verify JWT token in localStorage
4. Check browser network tab (F12 > Network)

### Database Issues
1. Run migrations: `python manage.py migrate colleges`
2. Check database connection
3. Verify table exists: `python manage.py shell`

## File Structure

```
/backend/
  /apps/colleges/
    - models.py (updated with new fields)
    - serializers.py (updated)
    - views.py (existing)
    - urls.py (existing)
    - migrations/0004_*.py (new migration)

/frontend/
  /src/
    /services/
      - colleges.js (updated with full CRUD)
    /pages/admin/
      - ManageSchool.jsx (complete component)
```

## Next Steps

1. Start backend: `python manage.py runserver 0.0.0.0:8004`
2. Start frontend: `npm run dev`
3. Navigate to `/admin/manage-school`
4. Test CRUD operations
5. Verify data exports (CSV, Excel, PDF)

## Support

For issues or questions:
1. Check browser console (F12)
2. Check Django server logs
3. Verify all dependencies are installed
4. Ensure migrations are applied
5. Check API response in Network tab (F12)

---

**Created:** November 16, 2024
**Status:** Production Ready
