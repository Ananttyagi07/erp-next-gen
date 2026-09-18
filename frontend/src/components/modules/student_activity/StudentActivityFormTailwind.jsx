/**
 * Student Activity Form Component
 * Handles adding new student activities
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

const CLASSES = [
  { id: 1, name: '--Select--' },
  { id: 2, name: '1st' },
  { id: 3, name: '2nd' },
  { id: 4, name: '3rd' },
  { id: 5, name: '4th' },
  { id: 6, name: '5th' }
];

const SECTIONS = [
  { id: 1, name: '--Select--' },
  { id: 2, name: 'A' },
  { id: 3, name: 'B' },
  { id: 4, name: 'C' },
  { id: 5, name: 'D' }
];

const STUDENTS = [
  { id: 1, name: '--Select--' },
  { id: 2, name: 'Student 1' },
  { id: 3, name: 'Student 2' },
  { id: 4, name: 'Student 3' }
];

const requiredFieldStyles = {
  InputLabelProps: {
    sx: {
      '& .MuiFormLabel-asterisk': {
        color: 'red !important'
      }
    }
  }
};

const StudentActivityFormTailwind = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    school: '',
    class: '',
    section: '',
    student: '',
    date: '',
    activity: ''
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
    if (!formData.school || !formData.class || !formData.section ||
        !formData.student || !formData.date) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Student activity added successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      school: '',
      class: '',
      section: '',
      student: '',
      date: '',
      activity: ''
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      class: '',
      section: '',
      student: '',
      date: '',
      activity: ''
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

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Row 1: School, Class, Section, Student */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel {...requiredFieldStyles.InputLabelProps}>School *</InputLabel>
              <Select
                name="school"
                value={formData.school}
                onChange={handleFormChange}
                label="School *"
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map((school) => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel {...requiredFieldStyles.InputLabelProps}>Class *</InputLabel>
              <Select
                name="class"
                value={formData.class}
                onChange={handleFormChange}
                label="Class *"
              >
                {CLASSES.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel {...requiredFieldStyles.InputLabelProps}>Section *</InputLabel>
              <Select
                name="section"
                value={formData.section}
                onChange={handleFormChange}
                label="Section *"
              >
                {SECTIONS.map((sec) => (
                  <MenuItem key={sec.id} value={sec.id}>{sec.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel {...requiredFieldStyles.InputLabelProps}>Student *</InputLabel>
              <Select
                name="student"
                value={formData.student}
                onChange={handleFormChange}
                label="Student *"
              >
                {STUDENTS.map((student) => (
                  <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Row 2: Date and Activity */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Date *"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              InputLabelProps={{
                shrink: true,
                ...requiredFieldStyles.InputLabelProps
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <TextField
              fullWidth
              size="small"
              label="Activity"
              name="activity"
              value={formData.activity}
              onChange={handleFormChange}
              placeholder="Enter activity details"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pt: 2 }}>
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
      </Box>
    </Box>
  );
};

export default StudentActivityFormTailwind;
