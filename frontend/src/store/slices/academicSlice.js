import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api';

export const fetchClasses = createAsyncThunk(
  'academic/fetchClasses',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/academic/classes/', {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchSections = createAsyncThunk(
  'academic/fetchSections',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/academic/sections/', {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createClass = createAsyncThunk(
  'academic/createClass',
  async (classData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/academic/classes/', classData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  classes: [],
  sections: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 }
};

const academicSlice = createSlice({
  name: 'academic',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.results || action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sections = action.payload.results || action.payload;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      });
  }
});

export const { clearError } = academicSlice.actions;
export default academicSlice.reducer;
