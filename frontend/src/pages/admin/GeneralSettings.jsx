import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Collapse,
  FormControlLabel,
  Checkbox,
  Container,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const QUICK_LINKS = [
  'General Setting',
  'Manage School',
  'Payment Setting',
  'SMS Setting',
  'Email Setting',
  'Academic Year',
  'User Role',
  'Role Permission',
  'Super Admin',
  'Manage User',
  'Reset User Password',
  'Reset Username',
  'User Credential',
  'Activity Log',
  'Feedback',
  'Backup',
  'Opening Hour',
];

const TIMEZONES = [
  'UTC', 'EST', 'CST', 'MST', 'PST', 'IST', 'JST', 'GMT', 'CET', 'AEST'
];

const GeneralSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expandedSection, setExpandedSection] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [formData, setFormData] = useState({
    brand_name: '',
    brand_title: '',
    brand_logo: null,
    favicon_icon: null,
    brand_footer: '',
    school_name: '',
    school_code: '',
    school_address: '',
    school_phone: '',
    school_email: '',
    school_website: '',
    school_logo: null,
    principal_name: '',
    principal_email: '',
    timezone: 'UTC',
    language: 'en',
    currency: 'USD',
    currency_symbol: '$',
    enable_rtl: false,
    enable_frontend: true,
    theme: 'light',
    date_format: 'DD/MM/YYYY',
    google_analytics: '',
    academic_year_start: '',
    academic_year_end: '',
  });

  useEffect(() => {
    // Initialize school selection from localStorage or default to school1
    const savedSchool = localStorage.getItem('selectedSchool') || 'school1';
    setSelectedSchool(savedSchool);
    localStorage.setItem('selectedSchool', savedSchool);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/general/');
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setFormData(data);
        if (data.brand_logo) setLogoPreview(data.brand_logo);
        if (data.favicon_icon) setFaviconPreview(data.favicon_icon);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSchoolChange = (e) => {
    const school = e.target.value;
    setSelectedSchool(school);
    // Save selected school to localStorage for API requests
    localStorage.setItem('selectedSchool', school);
    // Reload settings for the selected school
    setTimeout(() => fetchSettings(), 100);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (fieldName === 'brand_logo') {
          setLogoPreview(reader.result);
        } else if (fieldName === 'favicon_icon') {
          setFaviconPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await apiService.post('/admin-settings/general/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success || response.status === 200) {
        setSuccess(true);
        if (response.data.data) {
          setFormData(response.data.data);
        }
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', minHeight: '100vh', p: 2 }}>
      <Container maxWidth="xl" sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 } }}>

        {/* Global Header Bar */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'white', overflow: 'hidden' }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={handleSchoolChange}
                  label="Select School"
                >
                  <MenuItem value="">Choose School</MenuItem>
                  <MenuItem value="school1">School 1 (Erp_Database)</MenuItem>
                  <MenuItem value="school2">School 2 (Erp_Database2)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Session Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Session Year"
                >
                  <MenuItem value="">Choose Year</MenuItem>
                  <MenuItem value="2023-2024">2023-2024</MenuItem>
                  <MenuItem value="2024-2025">2024-2025</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Global Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Updating...' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Page Header & Navigation */}
        <Paper elevation={1} sx={{ mb: 2, backgroundColor: 'white', overflow: 'hidden' }}>
          {/* Page Title */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                General Setting
              </Typography>
            </Box>
            <IconButton onClick={() => setExpandedSection(!expandedSection)} size="small">
              {expandedSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Quick Links Bar - Scrollable */}
          <Box sx={{
            p: 1.5,
            backgroundColor: '#f9f9f9',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
          }}>
            <Box sx={{ display: 'flex', gap: 1, minWidth: 'min-content' }}>
              {QUICK_LINKS.map((link) => (
                <Button
                  key={link}
                  variant="text"
                  size="small"
                  sx={{
                    whiteSpace: 'nowrap',
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    '&:hover': { backgroundColor: '#e0e0e0' }
                  }}
                >
                  {link}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Main Form Content */}
        <Collapse in={expandedSection}>
          <Card elevation={1}>
            <CardContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>Settings updated successfully!</Alert>}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Form Title */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <SettingsIcon sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        General Setting
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Brand Information Section */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                      Brand Information
                    </Typography>
                  </Grid>

                  {/* Brand Name - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Brand Name"
                      name="brand_name"
                      value={formData.brand_name}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Brand Title - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Brand Title *"
                      name="brand_title"
                      value={formData.brand_title}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* Google Analytics - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Google Analytics"
                      name="google_analytics"
                      value={formData.google_analytics}
                      onChange={handleChange}
                      placeholder="UA-XXXXXXXX-X"
                    />
                  </Grid>

                  {/* Currency - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Currency Symbol - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Currency Symbol"
                      name="currency_symbol"
                      value={formData.currency_symbol}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Brand Footer - Full Width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Brand Footer"
                      name="brand_footer"
                      value={formData.brand_footer}
                      onChange={handleChange}
                      multiline
                      rows={2}
                    />
                  </Grid>

                  {/* Logo Upload - Full Width */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                        Brand Logo
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {logoPreview && (
                          <Box sx={{ mb: 1 }}>
                            <img
                              src={logoPreview}
                              alt="Logo Preview"
                              style={{ maxWidth: '80px', maxHeight: '80px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
                            />
                            <Button
                              size="small"
                              variant="text"
                              sx={{ display: 'block', mt: 0.5, p: 0 }}
                              onClick={() => { setLogoPreview(null); setFormData(prev => ({ ...prev, brand_logo: null })); }}
                            >
                              Remove
                            </Button>
                          </Box>
                        )}
                        <Box>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'brand_logo')}
                            style={{ display: 'none' }}
                            id="logo-upload"
                          />
                          <label htmlFor="logo-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              size="small"
                              startIcon={<CloudUploadIcon />}
                              sx={{ fontSize: '0.75rem' }}
                            >
                              Upload Logo
                            </Button>
                          </label>
                          <Typography variant="caption" display="block" sx={{ mt: 0.5, fontSize: '0.7rem', color: 'textSecondary' }}>
                            Max: 100x110px
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Favicon Upload - Full Width */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                        Favicon Icon
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {faviconPreview && (
                          <Box sx={{ mb: 1 }}>
                            <img
                              src={faviconPreview}
                              alt="Favicon Preview"
                              style={{ maxWidth: '30px', maxHeight: '30px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
                            />
                            <Button
                              size="small"
                              variant="text"
                              sx={{ display: 'block', mt: 0.5, p: 0 }}
                              onClick={() => { setFaviconPreview(null); setFormData(prev => ({ ...prev, favicon_icon: null })); }}
                            >
                              Remove
                            </Button>
                          </Box>
                        )}
                        <Box>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'favicon_icon')}
                            style={{ display: 'none' }}
                            id="favicon-upload"
                          />
                          <label htmlFor="favicon-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              size="small"
                              startIcon={<CloudUploadIcon />}
                              sx={{ fontSize: '0.75rem' }}
                            >
                              Upload Favicon
                            </Button>
                          </label>
                          <Typography variant="caption" display="block" sx={{ mt: 0.5, fontSize: '0.7rem', color: 'textSecondary' }}>
                            Max: 20x20px
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* System Configuration */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 1, mt: 1 }}>
                      System Configuration
                    </Typography>
                  </Grid>

                  {/* Global Language - Full Width */}
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Global Language *</InputLabel>
                      <Select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        label="Global Language *"
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Theme - Full Width */}
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Theme *</InputLabel>
                      <Select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        label="Theme *"
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="auto">Auto</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Time Zone - Full Width */}
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Time Zone *</InputLabel>
                      <Select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        label="Time Zone *"
                      >
                        {TIMEZONES.map(tz => (
                          <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Date Format - Full Width */}
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Date Format *</InputLabel>
                      <Select
                        name="date_format"
                        value={formData.date_format}
                        onChange={handleChange}
                        label="Date Format *"
                      >
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Enable RTL - Full Width */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="enable_rtl"
                          checked={formData.enable_rtl}
                          onChange={handleChange}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Enable RTL (Right-to-Left) *</Typography>}
                    />
                  </Grid>

                  {/* Enable Frontend - Full Width */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="enable_frontend"
                          checked={formData.enable_frontend}
                          onChange={handleChange}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Enable Frontend *</Typography>}
                    />
                  </Grid>

                  {/* Form Action Buttons */}
                  <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={fetchSettings}
                      disabled={saving || loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="small"
                      disabled={saving}
                    >
                      {saving ? 'Updating...' : 'Update'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Collapse>
      </Container>
    </Box>
  );
};

export default GeneralSettings;
