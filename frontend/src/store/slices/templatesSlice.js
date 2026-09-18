import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import templatesService from '../../services/templates';

// SMS Templates
export const fetchSMSTemplates = createAsyncThunk(
  'templates/fetchSMSTemplates',
  async (params, { rejectWithValue }) => {
    try {
      const response = await templatesService.getSMSTemplates(params);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch SMS templates');
    }
  }
);

export const createSMSTemplate = createAsyncThunk(
  'templates/createSMSTemplate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await templatesService.createSMSTemplate(data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create SMS template');
    }
  }
);

export const updateSMSTemplate = createAsyncThunk(
  'templates/updateSMSTemplate',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await templatesService.updateSMSTemplate(id, data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update SMS template');
    }
  }
);

export const deleteSMSTemplate = createAsyncThunk(
  'templates/deleteSMSTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await templatesService.deleteSMSTemplate(id);
      if (response.success) {
        return { id };
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete SMS template');
    }
  }
);

// Email Templates
export const fetchEmailTemplates = createAsyncThunk(
  'templates/fetchEmailTemplates',
  async (params, { rejectWithValue }) => {
    try {
      const response = await templatesService.getEmailTemplates(params);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch email templates');
    }
  }
);

export const createEmailTemplate = createAsyncThunk(
  'templates/createEmailTemplate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await templatesService.createEmailTemplate(data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create email template');
    }
  }
);

export const updateEmailTemplate = createAsyncThunk(
  'templates/updateEmailTemplate',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await templatesService.updateEmailTemplate(id, data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update email template');
    }
  }
);

export const deleteEmailTemplate = createAsyncThunk(
  'templates/deleteEmailTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await templatesService.deleteEmailTemplate(id);
      if (response.success) {
        return { id };
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete email template');
    }
  }
);

const initialState = {
  smsTemplates: [],
  emailTemplates: [],
  loading: false,
  error: null,
  smsTemplatesLoading: false,
  emailTemplatesLoading: false,
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // SMS Templates
    builder
      .addCase(fetchSMSTemplates.pending, (state) => {
        state.smsTemplatesLoading = true;
        state.error = null;
      })
      .addCase(fetchSMSTemplates.fulfilled, (state, action) => {
        state.smsTemplatesLoading = false;
        state.smsTemplates = action.payload;
      })
      .addCase(fetchSMSTemplates.rejected, (state, action) => {
        state.smsTemplatesLoading = false;
        state.error = action.payload;
      })
      .addCase(createSMSTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSMSTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.smsTemplates.push(action.payload);
      })
      .addCase(createSMSTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSMSTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSMSTemplate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.smsTemplates.findIndex(template => template.id === action.payload.id);
        if (index !== -1) {
          state.smsTemplates[index] = action.payload;
        }
      })
      .addCase(updateSMSTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSMSTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSMSTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.smsTemplates = state.smsTemplates.filter(template => template.id !== action.payload.id);
      })
      .addCase(deleteSMSTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Email Templates
    builder
      .addCase(fetchEmailTemplates.pending, (state) => {
        state.emailTemplatesLoading = true;
        state.error = null;
      })
      .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
        state.emailTemplatesLoading = false;
        state.emailTemplates = action.payload;
      })
      .addCase(fetchEmailTemplates.rejected, (state, action) => {
        state.emailTemplatesLoading = false;
        state.error = action.payload;
      })
      .addCase(createEmailTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmailTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.emailTemplates.push(action.payload);
      })
      .addCase(createEmailTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmailTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailTemplate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.emailTemplates.findIndex(template => template.id === action.payload.id);
        if (index !== -1) {
          state.emailTemplates[index] = action.payload;
        }
      })
      .addCase(updateEmailTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmailTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmailTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.emailTemplates = state.emailTemplates.filter(template => template.id !== action.payload.id);
      })
      .addCase(deleteEmailTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = templatesSlice.actions;
export default templatesSlice.reducer;
