/**
 * Student Form Component
 * Handles adding/editing students with comprehensive information
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Paper,
  Checkbox,
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

const DISCOUNTS = [
  { id: 1, name: '10%' },
  { id: 2, name: '20%' },
  { id: 3, name: '50%' },
  { id: 4, name: 'Free' }
];

const IS_GUARDIAN = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' }
];

const StudentForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    admissionNo: '',
    admissionDate: '',
    birthDate: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    phone: '',
    email: '',
    nationalId: '',
    studentType: '',
    class: '',
    section: '',
    group: '',
    rollNo: '',
    registrationNo: '',
    discount: '',
    secondLanguage: '',
    fatherName: '',
    fatherPhone: '',
    fatherEducation: '',
    fatherProfession: '',
    fatherDesignation: '',
    fatherPhoto: null,
    motherName: '',
    motherPhone: '',
    motherEducation: '',
    motherProfession: '',
    motherDesignation: '',
    motherPhoto: null,
    isGuardian: '',
    relationWithGuardian: '',
    sameAsGuardian: false,
    presentAddress: '',
    permanentAddress: '',
    previousSchoolName: '',
    previousClass: '',
    transferCertificate: null,
    username: '',
    password: '',
    healthCondition: '',
    otherInfo: '',
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
    if (!formData.schoolName || !formData.name || !formData.admissionNo ||
        !formData.admissionDate || !formData.birthDate || !formData.gender ||
        !formData.phone || !formData.class || !formData.section || !formData.rollNo ||
        !formData.username || !formData.password) {
      const errorMsg = 'Please fill in all required fields';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Success message
    const successMsg = 'Student created successfully!';
    setSuccess(successMsg);
    onSuccess?.(successMsg);

    // Reset form
    setFormData({
      schoolName: '',
      name: '',
      admissionNo: '',
      admissionDate: '',
      birthDate: '',
      gender: '',
      bloodGroup: '',
      religion: '',
      caste: '',
      phone: '',
      email: '',
      nationalId: '',
      studentType: '',
      class: '',
      section: '',
      group: '',
      rollNo: '',
      registrationNo: '',
      discount: '',
      secondLanguage: '',
      fatherName: '',
      fatherPhone: '',
      fatherEducation: '',
      fatherProfession: '',
      fatherDesignation: '',
      fatherPhoto: null,
      motherName: '',
      motherPhone: '',
      motherEducation: '',
      motherProfession: '',
      motherDesignation: '',
      motherPhoto: null,
      isGuardian: '',
      relationWithGuardian: '',
      sameAsGuardian: false,
      presentAddress: '',
      permanentAddress: '',
      previousSchoolName: '',
      previousClass: '',
      transferCertificate: null,
      username: '',
      password: '',
      healthCondition: '',
      otherInfo: '',
      photo: null
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      name: '',
      admissionNo: '',
      admissionDate: '',
      birthDate: '',
      gender: '',
      bloodGroup: '',
      religion: '',
      caste: '',
      phone: '',
      email: '',
      nationalId: '',
      studentType: '',
      class: '',
      section: '',
      group: '',
      rollNo: '',
      registrationNo: '',
      discount: '',
      secondLanguage: '',
      fatherName: '',
      fatherPhone: '',
      fatherEducation: '',
      fatherProfession: '',
      fatherDesignation: '',
      fatherPhoto: null,
      motherName: '',
      motherPhone: '',
      motherEducation: '',
      motherProfession: '',
      motherDesignation: '',
      motherPhoto: null,
      isGuardian: '',
      relationWithGuardian: '',
      sameAsGuardian: false,
      presentAddress: '',
      permanentAddress: '',
      previousSchoolName: '',
      previousClass: '',
      transferCertificate: null,
      username: '',
      password: '',
      healthCondition: '',
      otherInfo: '',
      photo: null
    });
    setError('');
  };

  const SectionHeader = ({ title }) => (
    <Paper sx={{ p: 1.5, backgroundColor: '#f5f5f5', border: 'none', boxShadow: 'none', mb: 2 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
        {title}
      </Typography>
    </Paper>
  );

  const FileUploadBox = ({ label, fieldName, onFileChange }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
        {label}
      </Typography>
      <Paper
        sx={{
          p: 2,
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
          onChange={(e) => onFileChange(e, fieldName)}
        />
        <UploadIcon sx={{ fontSize: 24, color: '#999', mb: 0.5 }} />
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>
          Upload
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: '#0066cc', mt: 0.5 }}>
          Dimension:- Max-W: 120px, Max-H: 130px
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: '#0066cc' }}>
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

          {/* Section 1: Basic Information */}
          <Grid item xs={12}>
            <SectionHeader title="Basic Information:" />
          </Grid>

          {/* Row 1: Name, Admission No, Admission Date, Birth Date */}
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
                    placeholder="Name"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Admission No <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="admissionNo"
                    value={formData.admissionNo}
                    onChange={handleFormChange}
                    placeholder="Admission No"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Admission Date <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="admissionDate"
                    type="date"
                    value={formData.admissionDate}
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Birth Date <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Gender, Blood Group, Religion, Caste */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Gender <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Gender--</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                      label="--Select Gender--"
                    >
                      <MenuItem value="">--Select Gender--</MenuItem>
                      {GENDERS.map((gender) => (
                        <MenuItem key={gender.id} value={gender.id}>
                          {gender.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Blood Group
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Blood Group--</InputLabel>
                    <Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleFormChange}
                      label="--Select Blood Group--"
                    >
                      <MenuItem value="">--Select Blood Group--</MenuItem>
                      {BLOOD_GROUPS.map((bg) => (
                        <MenuItem key={bg.id} value={bg.id}>
                          {bg.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Caste
                  </Typography>
                  <TextField
                    fullWidth
                    name="caste"
                    value={formData.caste}
                    onChange={handleFormChange}
                    placeholder="Caste"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 3: Phone, Email, National ID */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
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
                    placeholder="Phone"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email"
                    size="small"
                  />
                </Box>
              </Grid>
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
                    placeholder="National ID"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 2: Academic Information */}
          <Grid item xs={12}>
            <SectionHeader title="Academic Information:" />
          </Grid>

          {/* Row 1: Student Type, Class, Section, Group */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Student Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Student Type--</InputLabel>
                    <Select
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleFormChange}
                      label="--Select Student Type--"
                    >
                      <MenuItem value="">--Select Student Type--</MenuItem>
                      {STUDENT_TYPES.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Class <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
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
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Section <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Section--</InputLabel>
                    <Select
                      name="section"
                      value={formData.section}
                      onChange={handleFormChange}
                      label="--Select Section--"
                    >
                      <MenuItem value="">--Select Section--</MenuItem>
                      {SECTIONS.map((sec) => (
                        <MenuItem key={sec.id} value={sec.id}>
                          {sec.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Group
                  </Typography>
                  <TextField
                    fullWidth
                    name="group"
                    value={formData.group}
                    onChange={handleFormChange}
                    placeholder="Group"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Roll No, Registration No, Discount, Second Language */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Roll No <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleFormChange}
                    placeholder="Roll No"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Registration No
                  </Typography>
                  <TextField
                    fullWidth
                    name="registrationNo"
                    value={formData.registrationNo}
                    onChange={handleFormChange}
                    placeholder="Registration No"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Discount
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select Discount--</InputLabel>
                    <Select
                      name="discount"
                      value={formData.discount}
                      onChange={handleFormChange}
                      label="--Select Discount--"
                    >
                      <MenuItem value="">--Select Discount--</MenuItem>
                      {DISCOUNTS.map((disc) => (
                        <MenuItem key={disc.id} value={disc.id}>
                          {disc.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Second Language
                  </Typography>
                  <TextField
                    fullWidth
                    name="secondLanguage"
                    value={formData.secondLanguage}
                    onChange={handleFormChange}
                    placeholder="Second Language"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 3: Father Information */}
          <Grid item xs={12}>
            <SectionHeader title="Father Information:" />
          </Grid>

          {/* Row 1: Father Name, Father Phone, Father Education, Father Profession */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Father Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleFormChange}
                    placeholder="Father Name"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Father Phone
                  </Typography>
                  <TextField
                    fullWidth
                    name="fatherPhone"
                    value={formData.fatherPhone}
                    onChange={handleFormChange}
                    placeholder="Father Phone"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Father Education
                  </Typography>
                  <TextField
                    fullWidth
                    name="fatherEducation"
                    value={formData.fatherEducation}
                    onChange={handleFormChange}
                    placeholder="Father Education"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Father Profession
                  </Typography>
                  <TextField
                    fullWidth
                    name="fatherProfession"
                    value={formData.fatherProfession}
                    onChange={handleFormChange}
                    placeholder="Father Profession"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Father Designation, Father Photo */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Father Designation
                  </Typography>
                  <TextField
                    fullWidth
                    name="fatherDesignation"
                    value={formData.fatherDesignation}
                    onChange={handleFormChange}
                    placeholder="Father Designation"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FileUploadBox
                  label="Father Photo"
                  fieldName="fatherPhoto"
                  onFileChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Section 4: Mother Information */}
          <Grid item xs={12}>
            <SectionHeader title="Mother Information:" />
          </Grid>

          {/* Row 1: Mother Name, Mother Phone, Mother Education, Mother Profession */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Mother Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleFormChange}
                    placeholder="Mother Name"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Mother Phone
                  </Typography>
                  <TextField
                    fullWidth
                    name="motherPhone"
                    value={formData.motherPhone}
                    onChange={handleFormChange}
                    placeholder="Mother Phone"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Mother Education
                  </Typography>
                  <TextField
                    fullWidth
                    name="motherEducation"
                    value={formData.motherEducation}
                    onChange={handleFormChange}
                    placeholder="Mother Education"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Mother Profession
                  </Typography>
                  <TextField
                    fullWidth
                    name="motherProfession"
                    value={formData.motherProfession}
                    onChange={handleFormChange}
                    placeholder="Mother Profession"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Mother Designation, Mother Photo */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Mother Designation
                  </Typography>
                  <TextField
                    fullWidth
                    name="motherDesignation"
                    value={formData.motherDesignation}
                    onChange={handleFormChange}
                    placeholder="Mother Designation"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FileUploadBox
                  label="Mother Photo"
                  fieldName="motherPhoto"
                  onFileChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Section 5: Guardian Information */}
          <Grid item xs={12}>
            <SectionHeader title="Guardian Information:" />
          </Grid>

          {/* Row 1: Is Guardian, Relation With Guardian */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Is Guardian? <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="isGuardian"
                      value={formData.isGuardian}
                      onChange={handleFormChange}
                      label="--Select--"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {IS_GUARDIAN.map((ig) => (
                        <MenuItem key={ig.id} value={ig.id}>
                          {ig.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Relation With Guardian
                  </Typography>
                  <TextField
                    fullWidth
                    name="relationWithGuardian"
                    value={formData.relationWithGuardian}
                    onChange={handleFormChange}
                    placeholder="Relation"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 6: Address Information */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <Paper sx={{ p: 1.5, backgroundColor: '#f5f5f5', border: 'none', boxShadow: 'none', flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    Address Information:
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="sameAsGuardian"
                        checked={formData.sameAsGuardian}
                        onChange={handleFormChange}
                        size="small"
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem' }}>Same as Guardian Address</Typography>}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Row 1: Present Address, Permanent Address */}
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
                    placeholder="Present Address"
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
                    placeholder="Permanent Address"
                    multiline
                    rows={3}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Section 7: Previous School */}
          <Grid item xs={12}>
            <SectionHeader title="Previous School:" />
          </Grid>

          {/* Row 1: School Name, Class, Transfer Certificate */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    School Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="previousSchoolName"
                    value={formData.previousSchoolName}
                    onChange={handleFormChange}
                    placeholder="School Name"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Class
                  </Typography>
                  <TextField
                    fullWidth
                    name="previousClass"
                    value={formData.previousClass}
                    onChange={handleFormChange}
                    placeholder="Class"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FileUploadBox
                  label="Transfer Certificate"
                  fieldName="transferCertificate"
                  onFileChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Section 8: Other Information */}
          <Grid item xs={12}>
            <SectionHeader title="Other Information:" />
          </Grid>

          {/* Row 1: Username, Password, Health Condition */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
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
                    placeholder="Username"
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
                    placeholder="Password"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Health Condition
                  </Typography>
                  <TextField
                    fullWidth
                    name="healthCondition"
                    value={formData.healthCondition}
                    onChange={handleFormChange}
                    placeholder="Health Condition"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Row 2: Other Info, Photo */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
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
                    placeholder="Other Info"
                    multiline
                    rows={4}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUploadBox
                  label="Photo"
                  fieldName="photo"
                  onFileChange={handleFileChange}
                />
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

          {/* Instruction Box */}
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ backgroundColor: '#fef9e7', border: '1px solid #f0e68c', color: '#333' }}>
              <strong>Instruction:</strong> Please add Guardian, Class & Section before add Student.
            </Alert>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StudentForm;
