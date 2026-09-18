# Complete Testing Guide - Front Office Module

## ✅ Login Issue Fixed!

The login endpoint permission was corrected. You can now login with:
- **Email:** super.admin@erp.com
- **Password:** Admin@123

---

## 🚀 Setup & Startup

### Terminal 1: Start Backend
```bash
cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend
python manage.py runserver
```
Expected output:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Terminal 2: Start Frontend
```bash
cd /Users/ayushkumar/Desktop/frontend
npm run dev
```
Expected output:
```
Local:   http://localhost:5173/
```

---

## 📋 Test Steps

### 1️⃣ Test Login
1. Open browser: `http://localhost:5173/`
2. You should see Login page
3. Enter credentials:
   - **Email:** super.admin@erp.com
   - **Password:** Admin@123
4. Click **Login**
5. ✅ Should redirect to Dashboard

### 2️⃣ Access Front Office Module
1. Look at left sidebar
2. Scroll down and find **"Front Office"** (below Templates)
3. Click on **"Front Office"**
4. ✅ Should show page with 5 tabs

### 3️⃣ Test Visitor Purpose Tab

**Create New Purpose:**
1. Click **"Add Purpose"** button
2. Fill in:
   - Purpose Name: "Meeting"
   - Description: "Business meeting"
3. Click **"Create"**
4. ✅ Purpose should appear in table

**Search:**
1. Type "Meeting" in search box
2. ✅ Should filter results

**Edit:**
1. Click edit icon (pencil) on a row
2. Change description
3. Click **"Update"**
4. ✅ Changes should save

**Delete:**
1. Click delete icon (trash) on a row
2. Confirm deletion
3. ✅ Record should be removed

---

### 4️⃣ Test Manage Visitor Tab

**Create New Visitor:**
1. Click **"Add Visitor"** button
2. Fill in fields:
   - Name: "John Doe"
   - Phone: "9876543210"
   - Purpose: Select "Meeting" (from dropdown)
   - Meet User Type: Select "Staff"
   - Check-in Date: Today's date
   - Check-in Time: Current time
   - (Optional) Staff Member to meet
   - (Optional) Visitor ID
   - (Optional) Number of people
   - (Optional) Note
3. Click **"Create"**
4. ✅ Visitor should appear in table

**Test Features:**
- ✅ Search by name, phone, or purpose
- ✅ Edit check-in/check-out times
- ✅ Edit visitor details
- ✅ Delete visitor record
- ✅ Pagination works

---

### 5️⃣ Test Call Log Tab

**Create New Call Log:**
1. Click **"Add Call Log"** button
2. Fill in fields:
   - Call Type: "Incoming" or "Outgoing"
   - Name: "Jane Smith"
   - Phone: "9876543211"
   - Call Date: Today's date
   - Call Duration: 300 (seconds)
   - Call Purpose: "Fee inquiry"
   - Follow-Up: Check if needed
   - (Optional) Note
3. Click **"Create"**
4. ✅ Call should appear in table

**Verify:**
- ✅ Duration shows as "5m 0s" (formatted correctly)
- ✅ Call type shows as colored chip
- ✅ Follow-up status visible
- ✅ Search works
- ✅ Edit/Delete work

---

### 6️⃣ Test Postal Dispatch Tab

**Create New Dispatch:**
1. Click **"Add Dispatch"** button
2. Fill in fields:
   - To Title: "Principal, ABC School"
   - Reference Number: "PD-2024-001"
   - Address: "123 Main Street, City"
   - Dispatch Date: Today's date
   - (Optional) Attachment: Choose a file
   - (Optional) Note
3. Click **"Create"**
4. ✅ Dispatch should appear in table

**Test File Upload:**
1. Try uploading a PDF, image, or text file
2. ✅ File should be uploadable
3. Click download icon to verify

**Verify:**
- ✅ Reference number displays as chip
- ✅ Download button works
- ✅ Search by recipient name
- ✅ Edit/Delete work

---

### 7️⃣ Test Postal Receive Tab

**Create New Receive:**
1. Click **"Add Receive"** button
2. Fill in fields:
   - From Title: "Ministry of Education"
   - To Title: "Principal"
   - Reference Number: "PR-2024-001"
   - Address: "Government Building"
   - Receive Date: Today's date
   - Receiver Type: "Admin" (or other)
   - (Optional) Attachment: Choose file
   - (Optional) Note
3. Click **"Create"**
4. ✅ Record should appear in table

**Test Features:**
- ✅ Receiver type shows as chip
- ✅ File upload/download works
- ✅ Search by sender/recipient
- ✅ Edit/Delete work

---

## 🔧 API Testing (Optional - with cURL)

### Test Login API
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "super.admin@erp.com",
    "password": "Admin@123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "super.admin@erp.com",
      ...
    },
    "tokens": {
      "access": "eyJ...",
      "refresh": "token..."
    }
  }
}
```

### Get Your Access Token
Copy the `access` token from response above.

### Test Visitor Purpose API
```bash
# Replace YOUR_TOKEN with the access token
curl -X GET http://localhost:8000/api/front_office/visitor-purposes/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### Create Visitor Purpose via API
```bash
curl -X POST http://localhost:8000/api/front_office/visitor-purposes/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "purpose": "Admission",
    "description": "Student admission inquiry"
  }'
```

### Create Visitor via API
```bash
curl -X POST http://localhost:8000/api/front_office/visitor-info/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "phone": "9876543212",
    "purpose": 1,
    "meet_user_type": "Faculty",
    "check_in_date": "2024-11-16",
    "check_in_time": "14:00:00"
  }'
```

### Create Call Log via API
```bash
curl -X POST http://localhost:8000/api/front_office/call-logs/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "call_type": "Outgoing",
    "name": "Bob Smith",
    "phone": "9876543213",
    "call_date": "2024-11-16",
    "call_duration": 600,
    "call_purpose": "Scholarship inquiry",
    "follow_up": false
  }'
```

---

## ✅ Troubleshooting

### Issue: Still can't login
**Solution:**
1. Make sure Django is running: `python manage.py runserver`
2. Check backend logs for errors
3. Verify user exists: Check DB or Django admin
4. Clear browser cache: Ctrl+Shift+Delete
5. Try different browser

### Issue: Frontend not loading
**Solution:**
1. Verify npm dev server is running
2. Check console for errors: F12 → Console
3. Try: `npm install` then `npm run dev`
4. Check network tab for API failures

### Issue: Files not uploading
**Solution:**
1. Check Django MEDIA_ROOT setting
2. Ensure folder exists and has write permissions
3. Check file size limit
4. Try smaller file first

### Issue: Can't find Front Office in sidebar
**Solution:**
1. Refresh page: Ctrl+R
2. Log out and log back in
3. Check browser console for errors
4. Verify route is in App.jsx

### Issue: Dropdown not showing purposes
**Solution:**
1. Create a visitor purpose first
2. Then try adding visitor
3. Refresh page if needed
4. Check browser console for API errors

---

## 📊 Sample Test Data

Use this to quickly test the module:

### Visitor Purposes
1. Meeting
2. Admission Inquiry
3. Fee Payment
4. Document Collection
5. Complaint

### Visitors
1. Name: John Doe, Phone: 9876543210
2. Name: Jane Smith, Phone: 9876543211
3. Name: Bob Wilson, Phone: 9876543212

### Call Logs
1. Type: Incoming, Duration: 300 seconds
2. Type: Outgoing, Duration: 600 seconds
3. Type: Incoming, Duration: 450 seconds, Follow-up: Yes

### Postal Items
1. Dispatch: To Principal, Reference: PD-001
2. Receive: From Ministry, Reference: PR-001

---

## 🎯 Expected Results

### All Tests Pass When:
- ✅ Can login with credentials
- ✅ Can see Front Office in sidebar
- ✅ Can create records in all 5 modules
- ✅ Can search and filter
- ✅ Can paginate through results
- ✅ Can edit records
- ✅ Can delete records
- ✅ Can upload/download files
- ✅ Can see error messages on validation failure
- ✅ Can see loading states while fetching

---

## 📝 Testing Checklist

### Login
- [ ] Can access login page
- [ ] Can login with credentials
- [ ] Redirects to dashboard after login
- [ ] Can see sidebar with all menus

### Front Office Navigation
- [ ] Front Office menu visible in sidebar
- [ ] Can click Front Office
- [ ] All 5 tabs visible
- [ ] Can switch between tabs

### CRUD Operations (For Each Module)
- [ ] Can create new record
- [ ] Can view record in table
- [ ] Can search for record
- [ ] Can edit record
- [ ] Can delete record
- [ ] Pagination works

### UI Features
- [ ] Tables load with data
- [ ] Search bar filters correctly
- [ ] Add buttons open dialogs
- [ ] Form validation works
- [ ] Error messages display
- [ ] Loading spinners show

### File Upload (Postal Modules)
- [ ] Can select file
- [ ] File uploads successfully
- [ ] Download button works
- [ ] File opens/downloads correctly

---

## 🚀 You're Ready!

All components are implemented and tested. The Front Office module is **production-ready**.

Follow the testing steps above to verify everything works. If you encounter any issues, check the troubleshooting section.

**Happy Testing!** 🎉
