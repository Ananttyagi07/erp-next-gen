/**
 * Student Attendance Form Component - Material-UI Version
 * Filter and search form for student attendance
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
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

const requiredFieldStyles = {
  InputLabelProps: {
    sx: {
      '& .MuiFormLabel-asterisk': {
        color: 'red !important'
      }
    }
  }
};

const StudentAttendanceFormTailwind = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    school: '',
    class: '',
    section: '',
    date: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFind = () => {
    if (onSearch) {
      onSearch(formData);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="flex-end">
        {/* School Dropdown */}
        <Grid item xs={12} sm={6} md={2.4}>
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

        {/* Class Dropdown */}
        <Grid item xs={12} sm={6} md={2.4}>
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

        {/* Section Dropdown */}
        <Grid item xs={12} sm={6} md={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel>Section</InputLabel>
            <Select
              name="section"
              value={formData.section}
              onChange={handleFormChange}
              label="Section"
            >
              {SECTIONS.map((sec) => (
                <MenuItem key={sec.id} value={sec.id}>{sec.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Date Input */}
        <Grid item xs={12} sm={6} md={2.4}>
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

        {/* Find Button */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleFind}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'capitalize',
              py: 1,
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Find
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentAttendanceFormTailwind;
