# Front Office Module - Setup & Implementation Guide

## Overview
The Front Office module is a comprehensive system for managing visitor check-ins, call logs, and postal operations. It includes 5 main sub-modules:

1. **Visitor Purpose** - Define and manage visitor purposes
2. **Manage Visitor** - Track visitor check-in/out records
3. **Call Log** - Log incoming and outgoing calls
4. **Postal Dispatch** - Track outgoing postal items
5. **Postal Receive** - Track incoming postal items

---

## Backend Setup

### 1. Database Models

All models are located in: `backend/apps/front_office/models.py`

#### Models Overview:
- **VisitorPurpose** - Purposes for visitor visits (e.g., "Interview", "Meeting", "Admission Inquiry")
- **Visitor** - Visitor records with check-in/out tracking
- **CallLog** - Call records (incoming/outgoing) with duration tracking
- **PostalDispatch** - Outgoing postal items with attachment support
- **PostalReceive** - Incoming postal items with attachment support

### 2. Run Database Migrations

```bash
cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend

# Create migrations
python manage.py makemigrations front_office

# Apply migrations
python manage.py migrate front_office
```

### 3. API Endpoints

All endpoints follow RESTful conventions and are prefixed with `/api/front_office/`

#### Visitor Purpose Endpoints
```
GET    /api/front_office/visitor-purposes/          - List all purposes
POST   /api/front_office/visitor-purposes/          - Create new purpose
GET    /api/front_office/visitor-purposes/{id}/     - Get purpose details
PUT    /api/front_office/visitor-purposes/{id}/     - Update purpose
DELETE /api/front_office/visitor-purposes/{id}/     - Delete purpose
```

#### Visitor Endpoints
```
GET    /api/front_office/visitor-info/             - List all visitors
POST   /api/front_office/visitor-info/             - Create new visitor
GET    /api/front_office/visitor-info/{id}/        - Get visitor details
PUT    /api/front_office/visitor-info/{id}/        - Update visitor
DELETE /api/front_office/visitor-info/{id}/        - Delete visitor
```

#### Call Log Endpoints
```
GET    /api/front_office/call-logs/                - List all call logs
POST   /api/front_office/call-logs/                - Create new call log
GET    /api/front_office/call-logs/{id}/           - Get call log details
PUT    /api/front_office/call-logs/{id}/           - Update call log
DELETE /api/front_office/call-logs/{id}/           - Delete call log
```

#### Postal Dispatch Endpoints
```
GET    /api/front_office/postal-dispatches/        - List all dispatches
POST   /api/front_office/postal-dispatches/        - Create new dispatch
GET    /api/front_office/postal-dispatches/{id}/   - Get dispatch details
PUT    /api/front_office/postal-dispatches/{id}/   - Update dispatch
DELETE /api/front_office/postal-dispatches/{id}/   - Delete dispatch
```

#### Postal Receive Endpoints
```
GET    /api/front_office/postal-receives/          - List all receives
POST   /api/front_office/postal-receives/          - Create new receive
GET    /api/front_office/postal-receives/{id}/     - Get receive details
PUT    /api/front_office/postal-receives/{id}/     - Update receive
DELETE /api/front_office/postal-receives/{id}/     - Delete receive
```

### 4. Model Fields

#### VisitorPurpose
```python
- id: Integer (Primary Key)
- college: ForeignKey (College, CollegeIsolatedModel)
- purpose: CharField (max_length=255)
- description: TextField (optional)
- created_at: DateTime
- updated_at: DateTime
- is_deleted: Boolean (SoftDeleteModel)
```

#### Visitor
```python
- id: Integer (Primary Key)
- college: ForeignKey (College, CollegeIsolatedModel)
- purpose: ForeignKey (VisitorPurpose)
- name: CharField (max_length=255)
- phone: CharField (max_length=20)
- visitor_id: CharField (max_length=50, optional - National ID/Passport)
- meet_staff_id: ForeignKey (User, optional)
- meet_user_type: CharField (choices: Staff, Student, Faculty, Principal, Other)
- number_of_people: Integer (default=1)
- check_in_date: DateField
- check_in_time: TimeField
- check_out_date: DateField (optional)
- check_out_time: TimeField (optional)
- note: TextField (optional)
- photo: ImageField (optional)
- attachment: FileField (optional)
- created_at: DateTime
- updated_at: DateTime
- is_deleted: Boolean (SoftDeleteModel)
```

#### CallLog
```python
- id: Integer (Primary Key)
- college: ForeignKey (College, CollegeIsolatedModel)
- call_type: CharField (choices: Incoming, Outgoing)
- name: CharField (max_length=255)
- phone: CharField (max_length=20)
- call_date: DateField
- call_duration: IntegerField (in seconds)
- call_purpose: CharField (max_length=255, optional)
- follow_up: BooleanField (default=False)
- note: TextField (optional)
- created_at: DateTime
- updated_at: DateTime
- is_deleted: Boolean (SoftDeleteModel)
```

#### PostalDispatch
```python
- id: Integer (Primary Key)
- college: ForeignKey (College, CollegeIsolatedModel)
- to_title: CharField (max_length=255)
- reference_number: CharField (max_length=100)
- address: TextField
- dispatch_date: DateField
- note: TextField (optional)
- attachment: FileField (optional)
- created_at: DateTime
- updated_at: DateTime
- is_deleted: Boolean (SoftDeleteModel)
```

#### PostalReceive
```python
- id: Integer (Primary Key)
- college: ForeignKey (College, CollegeIsolatedModel)
- from_title: CharField (max_length=255)
- to_title: CharField (max_length=255)
- reference_number: CharField (max_length=100)
- address: TextField
- receive_date: DateField
- receiver_type: CharField (choices: Admin, Guardian, Student, Teacher, Staff)
- note: TextField (optional)
- attachment: FileField (optional)
- created_at: DateTime
- updated_at: DateTime
- is_deleted: Boolean (SoftDeleteModel)
```

---

## Frontend Setup

### 1. Main Page Component

**File:** `frontend/src/pages/FrontOffice.jsx`

This is the main container component that manages 5 tabs:
- Tab 0: Visitor Purpose
- Tab 1: Manage Visitor
- Tab 2: Call Log
- Tab 3: Postal Dispatch
- Tab 4: Postal Receive

### 2. Sub-Components

All sub-components are located in: `frontend/src/components/modules/frontOffice/`

#### ManageVisitorPurpose.jsx
- List all visitor purposes with search
- Create, edit, and delete purposes
- Pagination support (10 rows per page)
- Error handling and feedback

#### ManageVisitor.jsx
- List all visitor records with search
- Create, edit, and delete visitor records
- Filters: Name, Phone, Purpose
- Dropdowns for: Purpose, Meet User Type, Meet Staff Member
- Date and time pickers for check-in/out
- Pagination support

#### ManageCallLog.jsx
- List all call logs with search
- Create, edit, and delete call logs
- Call type: Incoming/Outgoing (with color-coded chips)
- Duration formatting (minutes and seconds)
- Follow-up tracking
- Pagination support

#### ManagePostalDispatch.jsx
- List all outgoing postal items
- Create, edit, and delete dispatch records
- File attachment support
- Download attachment functionality
- Reference number tracking
- Pagination support

#### ManagePostalReceive.jsx
- List all incoming postal items
- Create, edit, and delete receive records
- File attachment support
- Receiver type selection
- Download attachment functionality
- Reference number tracking
- Pagination support

### 3. Routing

**File:** `frontend/src/App.jsx`

Route Configuration:
```javascript
<Route
  path="/front-office"
  element={
    <ProtectedRoute>
      <Layout>
        <FrontOffice />
      </Layout>
    </ProtectedRoute>
  }
/>
```

### 4. Sidebar Navigation

**File:** `frontend/src/components/common/Sidebar.jsx`

Menu Structure:
```
Front Office
  ├── Visitor Purpose
  ├── Manage Visitor
  ├── Call Log
  ├── Postal Dispatch
  └── Postal Receive
```

All submenu items point to `/front-office` which displays the main page with tabs.

---

## API Request Examples

### Create a Visitor Purpose
```bash
curl -X POST http://localhost:8000/api/front_office/visitor-purposes/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "purpose": "Meeting",
    "description": "Regular business meeting"
  }'
```

### Create a Visitor Record
```bash
curl -X POST http://localhost:8000/api/front_office/visitor-info/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "purpose": 1,
    "meet_user_type": "Staff",
    "meet_staff_id": 5,
    "number_of_people": 1,
    "check_in_date": "2024-11-16",
    "check_in_time": "14:30:00",
    "note": "Admission inquiry"
  }'
```

### Create a Call Log
```bash
curl -X POST http://localhost:8000/api/front_office/call-logs/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "call_type": "Incoming",
    "name": "Jane Smith",
    "phone": "9876543211",
    "call_date": "2024-11-16",
    "call_duration": 300,
    "call_purpose": "Fee inquiry",
    "follow_up": true,
    "note": "Customer interested in scholarship"
  }'
```

### Create a Postal Dispatch (with file)
```bash
curl -X POST http://localhost:8000/api/front_office/postal-dispatches/ \
  -H "Authorization: Bearer <token>" \
  -F "to_title=Principal, ABC School" \
  -F "reference_number=PD-2024-001" \
  -F "address=123 Main Street, City" \
  -F "dispatch_date=2024-11-16" \
  -F "attachment=@/path/to/file.pdf"
```

### Create a Postal Receive (with file)
```bash
curl -X POST http://localhost:8000/api/front_office/postal-receives/ \
  -H "Authorization: Bearer <token>" \
  -F "from_title=Ministry of Education" \
  -F "to_title=Principal" \
  -F "reference_number=PR-2024-001" \
  -F "address=Government Building, City" \
  -F "receive_date=2024-11-16" \
  -F "receiver_type=Admin" \
  -F "attachment=@/path/to/file.pdf"
```

---

## Features

### General Features (All Modules)
✅ Authentication/Authorization - Secure access for authenticated users
✅ School/College Selection - Data filtered by college (multi-tenancy)
✅ Global Search - Filter data by name, phone, purpose, reference, etc.
✅ Pagination - Show X rows per page with Next/Previous navigation
✅ Sortable Columns - Click column headers to sort (via API)
✅ CRUD Operations - Create, Read, Update, Delete records
✅ Error Handling - User-friendly error messages
✅ Loading States - Visual feedback during data fetch
✅ Responsive Design - Works on desktop and tablet screens

### Specific Features

#### Visitor Purpose Module
- ✅ List all visitor purposes
- ✅ Add new purpose with description
- ✅ Edit existing purposes
- ✅ Delete purposes with confirmation
- ✅ Search by purpose name or description

#### Visitor Module
- ✅ Check-in/check-out tracking
- ✅ Multiple meet user types (Staff, Student, Faculty, Principal, Other)
- ✅ Link to staff members
- ✅ Track number of people
- ✅ Optional photo and attachment uploads
- ✅ Visitor ID (National ID, Passport, etc.)

#### Call Log Module
- ✅ Incoming/Outgoing call tracking
- ✅ Call duration in seconds (with formatted display)
- ✅ Follow-up flag
- ✅ Call purpose tracking
- ✅ Chronological sorting by date

#### Postal Dispatch Module
- ✅ Recipient and address tracking
- ✅ Reference number generation
- ✅ File attachment support
- ✅ Dispatch date tracking
- ✅ Notes field for additional info

#### Postal Receive Module
- ✅ Sender and recipient tracking
- ✅ Receiver type classification
- ✅ Reference number tracking
- ✅ File attachment support
- ✅ Receive date tracking
- ✅ Notes field for additional info

---

## Testing Checklist

### Backend Testing
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create test data via Django admin or API
- [ ] Test all CRUD endpoints with authentication token
- [ ] Test filtering and search parameters
- [ ] Test pagination with different page sizes
- [ ] Test file upload for postal items
- [ ] Test soft delete functionality
- [ ] Verify college isolation (data filtered by college)

### Frontend Testing
- [ ] Navigate to Front Office page
- [ ] Test Visitor Purpose tab
  - [ ] Add new purpose
  - [ ] Edit existing purpose
  - [ ] Delete purpose
  - [ ] Search by purpose name
- [ ] Test Manage Visitor tab
  - [ ] Add new visitor with all fields
  - [ ] Edit visitor record
  - [ ] Delete visitor
  - [ ] Search by name, phone, purpose
- [ ] Test Call Log tab
  - [ ] Create incoming call
  - [ ] Create outgoing call
  - [ ] Mark for follow-up
  - [ ] Verify duration formatting
- [ ] Test Postal Dispatch tab
  - [ ] Create dispatch with file
  - [ ] Download attachment
  - [ ] Search by recipient
- [ ] Test Postal Receive tab
  - [ ] Create receive with file
  - [ ] Download attachment
  - [ ] Filter by receiver type
- [ ] Test pagination on all tabs
- [ ] Test error handling (empty fields, network errors)
- [ ] Test responsive design on mobile

---

## Database Schema Diagram

```
┌─────────────────────────┐
│    VisitorPurpose       │
├─────────────────────────┤
│ id (PK)                 │
│ college_id (FK)         │
│ purpose                 │
│ description             │
│ created_at, updated_at  │
│ is_deleted              │
└──────────┬──────────────┘
           │
           │ (1:N)
           │
┌──────────▼──────────────┐
│      Visitor            │
├─────────────────────────┤
│ id (PK)                 │
│ college_id (FK)         │
│ purpose_id (FK) ────────┘
│ meet_staff_id (FK to User)
│ name, phone             │
│ visitor_id              │
│ meet_user_type          │
│ number_of_people        │
│ check_in_date/time      │
│ check_out_date/time     │
│ photo, attachment       │
│ note                    │
│ created_at, updated_at  │
│ is_deleted              │
└─────────────────────────┘

┌─────────────────────────┐
│      CallLog            │
├─────────────────────────┤
│ id (PK)                 │
│ college_id (FK)         │
│ call_type               │
│ name, phone             │
│ call_date               │
│ call_duration           │
│ call_purpose            │
│ follow_up               │
│ note                    │
│ created_at, updated_at  │
│ is_deleted              │
└─────────────────────────┘

┌─────────────────────────┐
│   PostalDispatch        │
├─────────────────────────┤
│ id (PK)                 │
│ college_id (FK)         │
│ to_title                │
│ reference_number        │
│ address                 │
│ dispatch_date           │
│ attachment              │
│ note                    │
│ created_at, updated_at  │
│ is_deleted              │
└─────────────────────────┘

┌─────────────────────────┐
│    PostalReceive        │
├─────────────────────────┤
│ id (PK)                 │
│ college_id (FK)         │
│ from_title              │
│ to_title                │
│ reference_number        │
│ address                 │
│ receive_date            │
│ receiver_type           │
│ attachment              │
│ note                    │
│ created_at, updated_at  │
│ is_deleted              │
└─────────────────────────┘
```

---

## Environment Variables

No additional environment variables required. The module uses existing Django and API configuration.

---

## Troubleshooting

### Issue: API returns 404 for front_office endpoints
**Solution:** Ensure the front_office app is added to `INSTALLED_APPS` in Django settings and migrations are applied.

### Issue: College filter not working
**Solution:** Ensure the user has a college assigned. Check the User model's college field is populated.

### Issue: File upload fails
**Solution:** Check MEDIA_ROOT and MEDIA_URL are configured in Django settings. Ensure proper permissions on upload directories.

### Issue: Frontend shows "No data found"
**Solution:** Verify authentication token is valid. Check browser console for API errors. Ensure backend is running on correct port.

---

## File Structure Summary

### Backend
```
backend/apps/front_office/
├── __init__.py
├── admin.py
├── apps.py
├── models.py          (5 models)
├── serializers.py     (10 serializers)
├── views.py           (5 viewsets)
├── urls.py
└── migrations/
    └── __init__.py
```

### Frontend
```
frontend/src/
├── pages/
│   └── FrontOffice.jsx
├── components/modules/frontOffice/
│   ├── ManageVisitorPurpose.jsx
│   ├── ManageVisitor.jsx
│   ├── ManageCallLog.jsx
│   ├── ManagePostalDispatch.jsx
│   └── ManagePostalReceive.jsx
└── components/common/
    └── Sidebar.jsx    (updated with Front Office menu)
```

---

## Next Steps

1. **Database Migration:**
   ```bash
   cd backend
   python manage.py makemigrations front_office
   python manage.py migrate front_office
   ```

2. **Test API Endpoints:**
   - Use Postman or cURL to test all endpoints
   - Verify authentication works
   - Test CRUD operations

3. **Frontend Testing:**
   - Navigate to `/front-office` in the application
   - Test all tabs and features
   - Verify error handling

4. **Production Deployment:**
   - Update staticfiles
   - Set up file storage (S3 or local storage)
   - Configure proper permissions
   - Set up backup procedures

---

## Support

For issues or questions regarding the Front Office module, check:
1. Backend logs: `backend/logs/`
2. Browser console for frontend errors
3. Django admin interface for data verification
4. API documentation endpoint: `/api/`

---

**Version:** 1.0
**Last Updated:** November 16, 2024
