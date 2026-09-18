# 🚀 Multi-School Quick Start Guide

## ⚡ What Changed?

Your frontend now **automatically sends the school ID** to the backend with every API request, and the backend routes the query to the correct database!

---

## 📍 Where to Find the School Selector?

**Location**: Header Toolbar (Top of every page)
```
┌──────────────────────────────────────────────────────┐
│ University Management  [School Dropdown ▼]  [User ▼] │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 How to Use It?

1. **Click** the school dropdown in the header
2. **Select** a school from the list
3. **Done!** All your data will now come from that school's database

That's it! No code changes needed - it just works!

---

## 📊 What Happens Behind the Scenes?

```
You Select School → API Header Updated → Backend Routes to DB → Data Fetched
     (UI)            (Automatic)        (Backend Logic)      (Your App)
```

**API Header Example**:
```
When you select "School 1":
  Every API call includes: X-School-Id: school1

When you select "School 2":
  Every API call includes: X-School-Id: school2
```

---

## ✅ Testing Checklist

- [ ] Can you see the school dropdown in the header?
- [ ] Can you click it and see school options?
- [ ] When you select a school, does it stay selected after page refresh?
- [ ] Do you see different data on Dashboard for different schools?
- [ ] Do you see different data on Students page for different schools?
- [ ] Do you see different data on Attendance page for different schools?

**How to Check if It's Working**:
1. Open Browser DevTools (F12)
2. Go to **Network** tab
3. Select a different school
4. Click any data page (e.g., Students)
5. Look at the request headers
6. You should see: `X-School-Id: school2` (or whichever school you selected)

---

## 🔧 For Developers

### Using School Context in Your Components

```jsx
import { useSchool } from '@/context/SchoolContext';

function MyComponent() {
  const { selectedSchool, schools, changeSchool } = useSchool();

  return (
    <div>
      Current School: {selectedSchool}
    </div>
  );
}
```

### Reacting to School Changes

```jsx
useEffect(() => {
  // This runs whenever school changes
  refreshData();
}, [selectedSchool]);
```

---

## 🐛 Troubleshooting

### "I don't see the school dropdown"
- Check if you're logged in
- Refresh the page
- Check browser console for errors (F12)

### "School doesn't change when I select it"
- Check if API is responding
- Open DevTools → Network tab
- Check if API returns schools correctly

### "Different school doesn't show different data"
- Check DevTools → Network tab
- Verify `X-School-Id` header is being sent
- Verify backend is receiving the header
- Check backend database routing logs

---

## 📚 Full Documentation

See `MULTI_SCHOOL_IMPLEMENTATION_GUIDE.md` for comprehensive documentation including:
- Architecture overview
- How to add more schools
- Security considerations
- Advanced usage patterns

---

## 🎓 Key Components

| Component | File | Purpose |
|-----------|------|---------|
| SchoolContext | `src/context/SchoolContext.jsx` | Global school state |
| SchoolSelector | `src/components/common/SchoolSelector.jsx` | Dropdown UI |
| API Service | `src/services/apiService.js` | Auto-injects header |
| App | `src/App.jsx` | Wraps app with provider |
| Header | `src/components/common/Header.jsx` | Shows selector |

---

## ✨ Summary

Your ERP now supports unlimited schools with:
- ✅ One-click school switching
- ✅ Automatic backend routing
- ✅ Isolated data per school
- ✅ Persistent selection
- ✅ Zero code changes for components

**That's all you need to know to get started!** 🎉

---

*For questions, see MULTI_SCHOOL_IMPLEMENTATION_GUIDE.md*
