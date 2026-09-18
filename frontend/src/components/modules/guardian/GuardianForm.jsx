/**
 * Guardian Form Component
 * Handles adding/editing guardians
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
  Upload as UploadIcon,
} from '@mui/icons-material';

// Sample data constants
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const RELIGIONS = [
  { id: 1, name: 'Hindu' },
  { id: 2, name: 'Muslim' },
  { id: 3, name: 'Christian' },
  { id: 4, name: 'Sikh' },
  { id: 5, name: 'Buddhist' }
];

const GuardianForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    phone: '',
    profession: '',
    religion: '',
    presentAddress: '',
    permanentAddress: '',
    nationalId: '',
    email: '',
    username: '',
    password: '',
    otherInfo: '',
    photo: null
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

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.schoolName || !formData.name || !formData.phone ||
        !formData.profession || !formData.email || !formData.username || !formData.password) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Guardian created successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      schoolName: '',
      name: '',
      phone: '',
      profession: '',
      religion: '',
      presentAddress: '',
      permanentAddress: '',
      nationalId: '',
      email: '',
      username: '',
      password: '',
      otherInfo: '',
      photo: null
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      name: '',
      phone: '',
      profession: '',
      religion: '',
      presentAddress: '',
      permanentAddress: '',
      nationalId: '',
      email: '',
      username: '',
      password: '',
      otherInfo: '',
      photo: null
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

          {/* Section 1: Basic Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', border: 'none', boxShadow: 'none' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Basic Information:
              </Typography>
            </Paper>
          </Grid>

          {/* Row 1: Name, Phone, Profession, Religion */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Name <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter name"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Phone <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Enter phone"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Profession <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="profession"
                    value={formData.profession}
                    onChange={handleFormChange}
                    placeholder="Enter profession"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Religion
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Religion--</InputLabel>
                    <Select
                      name="religion"
                      value={formData.religion}
                      onChange={handleFormChange}
                      label="--Select Religion--"
                    >
                      <MenuItem value="">--Select Religion--</MenuItem>
                      {RELIGIONS.map((religion) => (
                        <MenuItem key={religion.id} value={religion.id}>
                          {religion.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Present Address, Permanent Address */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Present Address
                  </Typography>
                  <TextField
                    fullWidth
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleFormChange}
                    placeholder="Enter present address"
                    multiline
                    rows={3}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Permanent Address
                  </Typography>
                  <TextField
                    fullWidth
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleFormChange}
                    placeholder="Enter permanent address"
                    multiline
                    rows={3}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 2: Academic Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', border: 'none', boxShadow: 'none' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Academic Information:
              </Typography>
            </Paper>
          </Grid>

          {/* Row 1: National ID, Email, Username, Password */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    National ID
                  </Typography>
                  <TextField
                    fullWidth
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleFormChange}
                    placeholder="Enter national ID"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Email <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter email"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Username <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    placeholder="Enter username"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Password <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Enter password"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 3: Other Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5', border: 'none', boxShadow: 'none' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Other Information:
              </Typography>
            </Paper>
          </Grid>

          {/* Row 1: Other Info and Photo Upload */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Other Info */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Other Info
                  </Typography>
                  <TextField
                    fullWidth
                    name="otherInfo"
                    value={formData.otherInfo}
                    onChange={handleFormChange}
                    placeholder="Enter other information"
                    multiline
                    rows={4}
                    size="small"
                  />
                </Box>
              </Grid>

              {/* Photo Upload */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Photo
                  </Typography>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: '2px dashed #ccc',
                      borderRadius: 1,
                      backgroundColor: '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#999',
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handlePhotoChange}
                    />
                    <UploadIcon sx={{ fontSize: 32, color: '#999', mb: 1 }} />
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#666' }}>
                      Upload
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#0066cc', mt: 1 }}>
                      Dimension:- Max-W: 120px, Max-H: 130px
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#0066cc' }}>
                      Image file format: .jpg, .jpeg, .png or .gif
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
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

export default GuardianForm;
