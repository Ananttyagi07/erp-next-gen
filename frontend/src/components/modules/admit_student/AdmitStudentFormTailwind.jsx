/**
 * Admit Student Form Component - Material-UI Version
 * Handles admission applications with comprehensive information
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

// Sample data constants
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const CLASSES = [
  { id: 1, name: '1st' },
  { id: 2, name: '2nd' },
  { id: 3, name: '3rd' },
  { id: 4, name: '4th' },
  { id: 5, name: '5th' }
];

const SECTIONS = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' }
];

const GENDERS = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' }
];

const BLOOD_GROUPS = [
  { id: 1, name: 'O+' },
  { id: 2, name: 'O-' },
  { id: 3, name: 'A+' },
  { id: 4, name: 'A-' },
  { id: 5, name: 'B+' },
  { id: 6, name: 'B-' },
  { id: 7, name: 'AB+' },
  { id: 8, name: 'AB-' }
];

const RELIGIONS = [
  { id: 1, name: 'Hindu' },
  { id: 2, name: 'Muslim' },
  { id: 3, name: 'Christian' },
  { id: 4, name: 'Sikh' },
  { id: 5, name: 'Buddhist' }
];

const STUDENT_TYPES = [
  { id: 1, name: 'Undergraduate' },
  { id: 2, name: 'Postgraduate' },
  { id: 3, name: 'Doctoral' }
];

const IS_GUARDIAN = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' }
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

const AdmitStudentFormTailwind = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    fatherName: '',
    motherName: '',
    birthDate: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    phone: '',
    email: '',
    class: '',
    section: '',
    previousSchoolName: '',
    previousClass: '',
    admissionNo: '',
    admissionDate: '',
    registrationNo: '',
    isGuardian: '',
    relationWithGuardian: '',
    sameAsGuardian: false,
    presentAddress: '',
    permanentAddress: '',
    username: '',
    password: '',
    healthCondition: '',
    otherInfo: '',
    fatherPhoto: null,
    motherPhoto: null,
    transferCertificate: null,
    photo: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.schoolName || !formData.name || !formData.birthDate ||
        !formData.gender || !formData.phone || !formData.class ||
        !formData.section || !formData.username || !formData.password) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Admission application submitted successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      schoolName: '',
      name: '',
      fatherName: '',
      motherName: '',
      birthDate: '',
      gender: '',
      bloodGroup: '',
      religion: '',
      phone: '',
      email: '',
      class: '',
      section: '',
      previousSchoolName: '',
      previousClass: '',
      admissionNo: '',
      admissionDate: '',
      registrationNo: '',
      isGuardian: '',
      relationWithGuardian: '',
      sameAsGuardian: false,
      presentAddress: '',
      permanentAddress: '',
      username: '',
      password: '',
      healthCondition: '',
      otherInfo: '',
      fatherPhoto: null,
      motherPhoto: null,
      transferCertificate: null,
      photo: null
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      name: '',
      fatherName: '',
      motherName: '',
      birthDate: '',
      gender: '',
      bloodGroup: '',
      religion: '',
      phone: '',
      email: '',
      class: '',
      section: '',
      previousSchoolName: '',
      previousClass: '',
      admissionNo: '',
      admissionDate: '',
      registrationNo: '',
      isGuardian: '',
      relationWithGuardian: '',
      sameAsGuardian: false,
      presentAddress: '',
      permanentAddress: '',
      username: '',
      password: '',
      healthCondition: '',
      otherInfo: '',
      fatherPhoto: null,
      motherPhoto: null,
      transferCertificate: null,
      photo: null
    });
    setError('');
  };

  // Section Header Component
  const SectionHeader = ({ title }) => (
    <Box sx={{
      gridColumn: '1 / -1',
      bgcolor: '#f5f5f5',
      p: 1.5,
      fontWeight: 600,
      color: '#666',
      borderLeft: '4px solid #000',
      mb: 2
    }}>
      {title}
    </Box>
  );

  // File Upload Box Component
  const FileUploadBox = ({ label, fieldName, onFileChange }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
        {label}
      </Typography>
      <Paper
        component="label"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 2,
          border: '2px dashed #ccc',
          bgcolor: '#f9f9f9',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': { bgcolor: '#f0f0f0' }
        }}
      >
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => onFileChange(e, fieldName)}
        />
        <UploadIcon sx={{ fontSize: 24, color: '#999' }} />
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
          Click to Upload
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#0066cc', textAlign: 'center' }}>
          Dimension: Max-W: 120px, Max-H: 130px
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#0066cc' }}>
          Image file format: .jpg, .jpeg, .png or .gif
        </Typography>
      </Paper>
    </Box>
  );

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
        {/* School Name - Full Width */}
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            School Name <span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>--Select School--</InputLabel>
            <Select
              name="schoolName"
              value={formData.schoolName}
              onChange={handleFormChange}
              label="--Select School--"
            >
              <MenuItem value="">--Select School--</MenuItem>
              {SCHOOLS.map((school) => (
                <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Section 1: Basic Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionHeader title="Basic Information" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              {...requiredFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Father Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Mother Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Birth Date *"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleFormChange}
              InputLabelProps={{
                shrink: true,
                ...requiredFieldStyles.InputLabelProps
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel {...requiredFieldStyles.InputLabelProps}>Gender *</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                label="Gender *"
              >
                <MenuItem value="">--Select Gender--</MenuItem>
                {GENDERS.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id}>{gender.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Blood Group</InputLabel>
              <Select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleFormChange}
                label="Blood Group"
              >
                <MenuItem value="">--Select Blood Group--</MenuItem>
                {BLOOD_GROUPS.map((bg) => (
                  <MenuItem key={bg.id} value={bg.id}>{bg.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Religion</InputLabel>
              <Select
                name="religion"
                value={formData.religion}
                onChange={handleFormChange}
                label="Religion"
              >
                <MenuItem value="">--Select Religion--</MenuItem>
                {RELIGIONS.map((religion) => (
                  <MenuItem key={religion.id} value={religion.id}>{religion.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Phone *"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              {...requiredFieldStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        {/* Section 2: Academic Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionHeader title="Academic Information" />
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
                <MenuItem value="">--Select Class--</MenuItem>
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
                <MenuItem value="">--Select Section--</MenuItem>
                {SECTIONS.map((sec) => (
                  <MenuItem key={sec.id} value={sec.id}>{sec.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Admission No"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Admission Date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Registration No"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        {/* Section 3: Previous School Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionHeader title="Previous School Information" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="School Name"
              name="previousSchoolName"
              value={formData.previousSchoolName}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Class"
              name="previousClass"
              value={formData.previousClass}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FileUploadBox
              label="Transfer Certificate"
              fieldName="transferCertificate"
              onFileChange={handleFileChange}
            />
          </Grid>
        </Grid>

        {/* Section 4: Guardian Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionHeader title="Guardian Information" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Is Guardian?</InputLabel>
              <Select
                name="isGuardian"
                value={formData.isGuardian}
                onChange={handleFormChange}
                label="Is Guardian?"
              >
                <MenuItem value="">--Select--</MenuItem>
                {IS_GUARDIAN.map((ig) => (
                  <MenuItem key={ig.id} value={ig.id}>{ig.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Relation With Guardian"
              name="relationWithGuardian"
              value={formData.relationWithGuardian}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        {/* Section 5: Address Information */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 1.5, borderLeft: '4px solid #000' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: '#666' }}>
              Address Information
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="sameAsGuardian"
                  checked={formData.sameAsGuardian}
                  onChange={handleFormChange}
                />
              }
              label="Same as Guardian Address"
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label="Present Address"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        {/* Section 6: Other Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionHeader title="Other Information" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Username *"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              {...requiredFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="password"
              label="Password *"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              {...requiredFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Health Condition"
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={4}
              label="Other Info"
              name="otherInfo"
              value={formData.otherInfo}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FileUploadBox
              label="Photo"
              fieldName="photo"
              onFileChange={handleFileChange}
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

        {/* Instruction Box */}
        <Alert severity="info">
          <strong>Instruction:</strong> Please fill in all required fields before submitting the admission application.
        </Alert>
      </Box>
    </Box>
  );
};

export default AdmitStudentFormTailwind;
