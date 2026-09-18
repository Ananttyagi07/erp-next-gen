import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import teacherReducer from './slices/teacherSlice';
import courseReducer from './slices/courseSlice';
import financeReducer from './slices/financeSlice';
import attendanceReducer from './slices/attendanceSlice';
import academicReducer from './slices/academicSlice';
import userReducer from './slices/userSlice';
import templatesReducer from './slices/templatesSlice';

const persistConfig = {
  key: 'erp-root',
  storage,
  whitelist: ['auth']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    students: studentReducer,
    teachers: teacherReducer,
    courses: courseReducer,
    finance: financeReducer,
    attendance: attendanceReducer,
    academic: academicReducer,
    users: userReducer,
    templates: templatesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth.user']
      }
    })
});

export const persistor = persistStore(store);
