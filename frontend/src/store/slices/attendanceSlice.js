import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api';

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async ({ page = 1, limit = 10, date = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/attendance/', {
        params: { page, limit, date }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/attendance/mark/', attendanceData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAttendanceReport = createAsyncThunk(
  'attendance/getReport',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/attendance/report/${studentId}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  attendance: [],
  report: null,
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 }
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload.results || action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance.push(action.payload);
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAttendanceReport.fulfilled, (state, action) => {
        state.report = action.payload;
      });
  }
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
