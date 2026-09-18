/**
 * Class Routine Form Component
 * Handles adding/editing class routines
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
  { id: 1, name: 'MCA' },
  { id: 2, name: 'BSC' },
  { id: 3, name: 'BCA' }
];

const SECTIONS = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
];

const SUBJECTS = [
  { id: 1, name: 'Data Structure' },
  { id: 2, name: 'Web Development' },
  { id: 3, name: 'Database' }
];

const DAYS = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' }
];

const ClassRoutineForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    class: '',
    section: '',
    day: '',
    startTime: '',
    endTime: '',
    subject: '',
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
    if (!formData.schoolName || !formData.class || !formData.section ||
        !formData.day || !formData.startTime || !formData.endTime || !formData.subject) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Class routine created successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      schoolName: '',
      class: '',
      section: '',
      day: '',
      startTime: '',
      endTime: '',
      subject: '',
      note: ''
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      class: '',
      section: '',
      day: '',
      startTime: '',
      endTime: '',
      subject: '',
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
        <Grid container spacing={3}>
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

          {/* Class */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Class <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>--Select Class--</InputLabel>
                <Select
                  name="class"
                  value={formData.class}
                  onChange={handleFormChange}
                  label="--Select Class--"
                >
                  <MenuItem value="">--Select Class--</MenuItem>
                  {CLASSES.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Section <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>--Select Section--</InputLabel>
                <Select
                  name="section"
                  value={formData.section}
                  onChange={handleFormChange}
                  label="--Select Section--"
                >
                  <MenuItem value="">--Select Section--</MenuItem>
                  {SECTIONS.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Day */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Day <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>--Select Day--</InputLabel>
                <Select
                  name="day"
                  value={formData.day}
                  onChange={handleFormChange}
                  label="--Select Day--"
                >
                  <MenuItem value="">--Select Day--</MenuItem>
                  {DAYS.map((day) => (
                    <MenuItem key={day.id} value={day.id}>
                      {day.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Start Time */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Start Time <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Grid>

          {/* End Time */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                End Time <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Grid>

          {/* Subject */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                Subject <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>--Select Subject--</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  label="--Select Subject--"
                >
                  <MenuItem value="">--Select Subject--</MenuItem>
                  {SUBJECTS.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                multiline
                rows={3}
                placeholder="Enter note (optional)"
                name="note"
                value={formData.note}
                onChange={handleFormChange}
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

          {/* Instruction Box */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ backgroundColor: '#fef9e7', border: '1px solid #f0e68c', color: '#333' }}>
              Must be good combination (between room, time, teacher, day & subject) for routine.
            </Alert>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ClassRoutineForm;
