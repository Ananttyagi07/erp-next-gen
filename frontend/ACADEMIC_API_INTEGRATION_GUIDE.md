# Academic Module - Backend API Integration Guide

This guide shows how to connect the 8 Academic components to the backend API endpoints.

## API Service Setup

A complete API service file has been created at: `src/services/academicApi.js`

This file provides all necessary API functions for:
- Classes
- Sections
- Subjects
- Syllabi (Syllabus)
- Study Materials
- Live Classes
- Assignments
- Submissions

## Integration Pattern

Each component should follow this pattern:

### 1. Import the API Service
```javascript
import { classApi, handleApiError } from '../../../services/academicApi';
```

### 2. Add useEffect Hook for Data Fetching
```javascript
useEffect(() => {
  fetchData();
}, [selectedSchool, sessionYear]);

const fetchData = async () => {
  setLoading(true);
  try {
    const params = {
      college_id: userCollege?.id, // If needed for filtering
      school_class: selectedSchool, // Optional filters
    };
    const response = await classApi.getAll(params);
    setClasses(response.data.results || response.data);
    setLoading(false);
  } catch (error) {
    const err = handleApiError(error);
    setError(err.message);
    setLoading(false);
  }
};
```

### 3. Handle Create/Update Operations
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      name: formData.className,
      numeric_name: formData.numericName,
      class_teacher: formData.classTeacher,
      note: formData.note,
      college: userCollege?.id, // Add college ID if needed
    };

    if (editingId) {
      await classApi.update(editingId, payload);
      setSuccess('Class updated successfully');
    } else {
      await classApi.create(payload);
      setSuccess('Class created successfully');
    }

    // Clear form and refresh data
    setFormData({ className: '', numericName: '', classTeacher: '', note: '' });
    setEditingId(null);
    fetchData();
    setTimeout(() => setSuccess(''), 3000);
  } catch (error) {
    const err = handleApiError(error);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 4. Handle Delete Operations
```javascript
const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this item?')) {
    try {
      await classApi.delete(id);
      setSuccess('Item deleted successfully');
      fetchData();
    } catch (error) {
      const err = handleApiError(error);
      setError(err.message);
    }
  }
};
```

## Backend API Endpoints

### Academic Endpoints
- `GET/POST /api/academic/classes/`
- `GET/PUT/DELETE /api/academic/classes/{id}/`
- `GET/POST /api/academic/sections/`
- `GET/PUT/DELETE /api/academic/sections/{id}/`
- `GET/POST /api/academic/subjects/`
- `GET/PUT/DELETE /api/academic/subjects/{id}/`
- `GET/POST /api/academic/syllabi/`
- `GET/PUT/DELETE /api/academic/syllabi/{id}/`
- `GET/POST /api/academic/study-materials/`
- `GET/PUT/DELETE /api/academic/study-materials/{id}/`

### Live Classes Endpoints
- `GET/POST /api/live-classes/types/`
- `GET/PUT/DELETE /api/live-classes/types/{id}/`
- `GET/POST /api/live-classes/classes/`
- `GET/PUT/DELETE /api/live-classes/classes/{id}/`
- `GET/POST /api/live-classes/assignments/`
- `GET/PUT/DELETE /api/live-classes/assignments/{id}/`
- `GET/POST /api/live-classes/submissions/`
- `GET/PUT/DELETE /api/live-classes/submissions/{id}/`

## Component-Specific Integration Notes

### ManageClass
- **API**: `classApi`
- **Fields to Map**:
  - `schoolName` → `college`
  - `className` → `name`
  - `numericName` → `numeric_name`
  - `classTeacher` → `class_teacher`
  - `note` → `note`

### ManageSection
- **API**: `sectionApi`
- **Fields to Map**:
  - `schoolName` → `college`
  - `section` → `name`
  - `class` → `school_class`
  - `teacher` → `section_teacher`
  - `note` → `note`

### ManageSubject
- **API**: `subjectApi`
- **Fields to Map**:
  - `schoolName` → `college`
  - `name` → `name`
  - `subjectCode` → `subject_code`
  - `author` → `author`
  - `type` → `subject_type`
  - `class` → `school_class`
  - `teacher` → `teacher`
  - `note` → `note`

### ManageSyllabus
- **API**: `syllabusApi`
- **Note**: Uses FormData for file upload
- **Fields to Map**:
  - `schoolName` → `college`
  - `title` → `title`
  - `class` → `school_class`
  - `subject` → `subject`
  - `file` → `syllabus_file`
  - `sessionYear` → `session_year`
  - `note` → `note`

### ManageMaterial
- **API**: `materialApi`
- **Note**: Uses FormData for file upload
- **Fields to Map**:
  - `schoolName` → `college`
  - `title` → `title`
  - `class` → `school_class`
  - `subject` → `subject`
  - `file` → `material_file`
  - `description` → `description`

### ManageLiveClass
- **API**: `liveClassApi` and `liveClassTypeApi`
- **Fields to Map**:
  - `schoolName` → `college`
  - `class` → `school_class`
  - `section` → `section`
  - `subject` → `subject`
  - `teacher` → `teacher`
  - `liveClassType` → `live_class_type`
  - `classDate` → `class_date`
  - `startTime` → `start_time`
  - `endTime` → `end_time`
  - `note` → `note`
  - `sendNotification` → `send_notification`

### ManageAssignment
- **API**: `assignmentApi`
- **Note**: Uses FormData for file upload
- **Fields to Map**:
  - `schoolName` → `college`
  - `title` → `title`
  - `class` → `school_class`
  - `section` → `section`
  - `subject` → `subject`
  - `assignmentDate` → `assignment_date`
  - `submissionDate` → `submission_date`
  - `file` → `attachment`
  - `smsNotification` → `sms_notification`
  - `emailNotification` → `email_notification`
  - `note` → `note`

### ManageSubmission
- **API**: `submissionApi`
- **Note**: Uses FormData for file upload
- **Fields to Map**:
  - `schoolName` → `college`
  - `class` → `school_class`
  - `section` → `section`
  - `student` → `student`
  - `assignment` → `assignment`
  - `file` → `submission_file`
  - `note` → `note`

## File Upload Handling

For components with file uploads (Syllabus, Material, Assignment, Submission):

```javascript
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate file format
    const allowedFormats = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      setError('Invalid file format');
      return;
    }
    setUploadedFile(file);
    setFormData(prev => ({ ...prev, file: file }));
  }
};

// In submit handler, use FormData:
const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('school_class', formData.class);
  formDataToSend.append('subject', formData.subject);
  if (formData.file instanceof File) {
    formDataToSend.append('syllabus_file', formData.file);
  }
  formDataToSend.append('note', formData.note);

  try {
    if (editingId) {
      await syllabusApi.update(editingId, formDataToSend);
    } else {
      await syllabusApi.create(formDataToSend);
    }
    setSuccess('Saved successfully');
  } catch (error) {
    setError(handleApiError(error).message);
  }
};
```

## Error Handling

Use the `handleApiError` helper function for consistent error handling:

```javascript
catch (error) {
  const { status, message } = handleApiError(error);
  if (status === 404) {
    setError('Item not found');
  } else if (status === 400) {
    setError('Invalid data provided');
  } else if (status === 401) {
    setError('Please log in to continue');
  } else {
    setError(message);
  }
}
```

## Loading and Error States

Add proper loading and error state management:

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

// Show loading indicator
{loading && <CircularProgress />}

// Show error alert
{error && (
  <Alert severity="error" onClose={() => setError('')}>
    {error}
  </Alert>
)}

// Show success alert
{success && (
  <Alert severity="success" onClose={() => setSuccess('')}>
    {success}
  </Alert>
)}
```

## Authentication

The API service automatically adds the Bearer token from localStorage to all requests. Make sure the token is stored after login:

```javascript
// After successful login
localStorage.setItem('access_token', response.data.access);
```

## Testing the Integration

1. Start the backend server:
   ```bash
   cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend
   source venv/bin/activate
   python manage.py runserver 0.0.0.0:8000
   ```

2. Create migrations for the new Submission model:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. Create admin users and test data in the Django admin panel

4. Test API endpoints using Postman or curl to ensure they return proper data

5. Gradually integrate components one by one to ensure proper data flow

## Next Steps

1. Update each component to import and use the API service
2. Remove sample/mock data from components
3. Add loading skeletons for better UX
4. Implement pagination for large datasets
5. Add search and filter functionality
6. Test all CRUD operations
7. Add proper error handling and validation
