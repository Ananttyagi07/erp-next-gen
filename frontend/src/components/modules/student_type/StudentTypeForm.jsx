/**
 * Student Type Form Component
 * Handles adding/editing student types
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

// Sample data constants
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const StudentTypeForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    studentType: '',
    note: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.schoolName || !formData.studentType) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Student Type created successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      schoolName: '',
      studentType: '',
      note: ''
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      studentType: '',
      note: ''
    });
    setError('');
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* School Name */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                School Name <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>--Select School--</InputLabel>
                <Select
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleFormChange}
                  label="--Select School--"
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  {SCHOOLS.map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Student Type */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Student Type <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="studentType"
                value={formData.studentType}
                onChange={handleFormChange}
                placeholder="Student Type"
                size="small"
              />
            </Box>
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Note
              </Typography>
              <TextField
                fullWidth
                name="note"
                value={formData.note}
                onChange={handleFormChange}
                placeholder="Note"
                multiline
                rows={4}
                size="small"
              />
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  px: 4,
                  textTransform: 'capitalize',
                  borderColor: '#d0d0d0',
                  color: '#333'
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'capitalize',
                  '&:hover': { backgroundColor: '#333' }
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StudentTypeForm;
