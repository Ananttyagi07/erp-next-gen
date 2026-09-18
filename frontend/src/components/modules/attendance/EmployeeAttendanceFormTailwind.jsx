/**
 * Employee Attendance Form Component - Material-UI Version
 * Filter and search form for employee attendance
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

const requiredFieldStyles = {
  InputLabelProps: {
    sx: {
      '& .MuiFormLabel-asterisk': {
        color: 'red !important'
      }
    }
  }
};

const EmployeeAttendanceFormTailwind = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    school: '',
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
        <Grid item xs={12} sm={6} md={4}>
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

        {/* Date Input */}
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
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

export default EmployeeAttendanceFormTailwind;
