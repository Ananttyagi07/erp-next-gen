# Frontend Troubleshooting Guide

## Issue: Dashboard Not Visible After Login

### What Was Fixed

1. **Enhanced Error Handling**: Added detailed error messages that explain connection issues
2. **Comprehensive Logging**: Added console logs at every step of the auth flow
3. **Better API Error Handling**: API service now logs all requests and responses
4. **Token Validation**: Improved validation of token responses from backend
5. **Auto-redirect on 401**: Automatically clears tokens and redirects to login if token is invalid

---

## How to Debug Login Issues

### Step 1: Open Browser DevTools
1. Press `F12` (or `Right-click → Inspect`)
2. Go to the **Console** tab
3. Keep console open while logging in

### Step 2: Look for These Log Messages

**Success Flow:**
```
[Auth Init] Starting auth initialization
[Auth] Starting login with email: super.admin@erp.com
[API Request] POST /auth/login/
[Auth] Login response received: 200
[Auth] Tokens stored successfully
[Auth] Fetching user profile and permissions...
[API Response] 200 /auth/my-profile/
[Auth] Login successful! User: super.admin@erp.com
```

### Step 3: Common Errors & Solutions

#### Error: "Unable to connect to server"
- **Cause**: Backend is not running
- **Fix**:
  ```bash
  cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend
  source venv/bin/activate
  python manage.py runserver 0.0.0.0:8006
  ```

#### Error: "Server error: 401"
- **Cause**: Invalid credentials or backend token issue
- **Fix**:
  1. Check username/password are correct
  2. Try demo credentials: `super.admin@erp.com` / `superadmin123`
  3. Check if backend session is valid

#### Error: "Login response missing tokens"
- **Cause**: Backend returning response without tokens
- **Fix**: Check backend login endpoint returns `access` and `refresh` tokens

#### Error: "Server error: 400"
- **Cause**: Invalid email format or missing fields
- **Fix**: Check email is valid format, password is not empty

---

## Checking the Network Tab

1. Open DevTools → **Network** tab
2. Log in
3. Click on the `login/` request
4. Check:
   - **Status**: Should be 200 (success)
   - **Response**: Should have `access` and `refresh` tokens
   - **Headers**: Should show proper CORS headers

### Expected Login Response:
```json
{
  "data": {
    "access": "eyJ0eXAiOiJKV1QiLC...",
    "refresh": "eyJ0eXAiOiJKV1QiLC...",
    "user": {
      "id": 1,
      "email": "super.admin@erp.com",
      "first_name": "Super",
      "last_name": "Admin"
    }
  }
}
```

---

## Checking localStorage

In DevTools **Console**, run:
```javascript
// Check if tokens are stored
console.log({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken')
});
```

Both should have values after successful login.

---

## Backend Verification

### Check Backend is Running
```bash
curl -X OPTIONS http://localhost:8006/api/auth/login/ -v
```

Should return `HTTP/1.1 200 OK`

### Check Login Endpoint
```bash
curl -X POST http://localhost:8006/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"super.admin@erp.com","password":"superadmin123"}'
```

Should return JSON with tokens.

---

## Next Steps

If login still fails:
1. Check all console logs
2. Check Network tab for actual error responses
3. Run backend verification commands above
4. Ensure backend is on port 8006
5. Check backend has correct user in database

For more help, check browser console logs with `[Auth]`, `[API]`, or `[Login Form]` prefixes.
