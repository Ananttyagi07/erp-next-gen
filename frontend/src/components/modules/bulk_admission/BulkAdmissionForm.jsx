/**
 * Bulk Admission Form Component
 * Handles bulk student admission via CSV upload
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
  Paper,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Attachment as PaperclipIcon,
} from '@mui/icons-material';

// Sample data constants
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const ACADEMIC_YEARS = [
  { id: 1, year: '--Select--' },
  { id: 2, year: '2023-2024' },
  { id: 3, year: '2024-2025' },
  { id: 4, year: '2025-2026' }
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

const BulkAdmissionForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    school: '',
    academicYear: '',
    class: '',
    section: '',
    csvFile: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        csvFile: file
      }));
      setFileName(file.name);
    }
  };

  const handleGenerateCSV = () => {
    // Generate sample CSV template
    const csvContent = `Name,Email,Phone,Gender,Academic Group,Blood Group,Username,Password
Student1,student1@example.com,9876543210,male,science,o_positive,student1,pass123
Student2,student2@example.com,9876543211,female,arts,a_positive,student2,pass123`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', 'bulk_admission_template.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.school || !formData.academicYear || !formData.class ||
        !formData.section || !formData.csvFile) {
      const errorMsg = 'Please fill in all required fields and select a CSV file';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Bulk admission data uploaded successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      school: '',
      academicYear: '',
      class: '',
      section: '',
      csvFile: null
    });
    setFileName('');

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      academicYear: '',
      class: '',
      section: '',
      csvFile: null
    });
    setFileName('');
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
        {/* Row 1: Dropdowns - School, Academic Year, Class, Section */}
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
              <InputLabel {...requiredFieldStyles.InputLabelProps}>Academic Year *</InputLabel>
              <Select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleFormChange}
                label="Academic Year *"
              >
                {ACADEMIC_YEARS.map((year) => (
                  <MenuItem key={year.id} value={year.id}>{year.year}</MenuItem>
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
        </Grid>

        {/* Row 2: CSV Actions */}
        <Grid container spacing={2} alignItems="flex-end">
          {/* Left: Generate CSV Button */}
          <Grid item xs={12} sm={12} md={6}>
            <Button
              variant="contained"
              onClick={handleGenerateCSV}
              startIcon={<DownloadIcon />}
              sx={{
                width: '100%',
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'capitalize',
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              Generate CSV
            </Button>
          </Grid>

          {/* Right: CSV File Upload */}
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>
                CSV File
              </Typography>
              <Paper
                component="label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  border: '1px solid #d0d0d0',
                  bgcolor: '#f9f9f9',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#f0f0f0', borderColor: '#999' }
                }}
              >
                <input
                  hidden
                  accept=".csv"
                  type="file"
                  onChange={handleFileChange}
                />
                <PaperclipIcon sx={{ fontSize: 20, color: '#666' }} />
                <Typography sx={{ fontSize: '0.85rem', color: '#333', flex: 1 }}>
                  {fileName || 'Upload CSV'}
                </Typography>
              </Paper>
            </Box>
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

        {/* Instruction Box */}
        <Alert severity="info" sx={{ bgcolor: '#fef3c7', border: '1px solid #fcd34d' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontWeight: 600, color: '#333' }}>
              Instruction:
            </Typography>
            <Box component="ol" sx={{
              m: 0,
              pl: 2.5,
              '& li': { mb: 0.75, color: '#555', fontSize: '0.9rem' }
            }}>
              <li>At first select the School, Academic Year, Class and Section</li>
              <li>Generate CSV file</li>
              <li>Open the downloaded CSV file and enter student information with unique username</li>
              <li>Gender: [ male, female ] *</li>
              <li>Academic Group: [ science, arts, commerce ]</li>
              <li>Blood Group: [ a_positive, a_negative, b_positive, b_negative, o_positive, o_negative, ab_positive, ab_negative ]</li>
              <li>Take the Student Type ID from <span style={{ color: '#0066cc', textDecoration: 'underline', cursor: 'pointer' }}>Student Type</span> list</li>
              <li>Take the Discount ID from here <span style={{ color: '#0066cc', textDecoration: 'underline', cursor: 'pointer' }}>Discount</span></li>
              <li>Save the edited CSV file</li>
              <li>Upload again CSV file you just edited and submit</li>
            </Box>
          </Box>
        </Alert>
      </Box>
    </Box>
  );
};

export default BulkAdmissionForm;
