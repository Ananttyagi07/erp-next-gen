import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  InputLabel,
  FormControl,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import collegesService from '../../services/colleges';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const QUICK_LINKS = [
  { name: 'General Setting', path: '/admin/general-settings' },
  { name: 'Manage School', path: '/admin/manage-school' },
  { name: 'Payment Setting', path: '/admin/payment-settings' },
  { name: 'SMS Setting', path: '/admin/sms-settings' },
  { name: 'Email Setting', path: '/admin/email-settings' },
  { name: 'Academic Year', path: '/admin/academic-years' },
  { name: 'User Role', path: '/admin/user-role' },
  { name: 'Role Permission', path: '/admin/role-permission' },
  { name: 'Super Admin', path: '/admin/manage-super-admin' },
  { name: 'Manage User', path: '/users' },
  { name: 'Reset User Password', path: '/admin/reset-user-password' },
  { name: 'Reset Username', path: '/admin/reset-username' },
  { name: 'User Credential', path: '/admin/user-credential' },
  { name: 'Activity Log', path: '/admin/activity-log' },
  { name: 'Feedback', path: '/admin/feedback' },
  { name: 'Backup', path: '/admin/backup-database' },
  { name: 'Opening Hour', path: '/admin/opening-hours' }
];

const ManageSchool = () => {
  const [tabValue, setTabValue] = useState(0);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedTitle, setExpandedTitle] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Global header bar states
  const [selectedSchool, setSelectedSchool] = useState(() => {
    return localStorage.getItem('selectedSchool') || '';
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem('selectedYear') || '';
  });
  const [globalSearch, setGlobalSearch] = useState('');

  const [formData, setFormData] = useState({
    school_url: '',
    code: '',
    name: '',
    address: '',
    phone: '',
    registration_date: '',
    email: '',
    fax: '',
    footer: '',
    currency: 'USD',
    currency_symbol: '$',
    enable_frontend: true,
    exam_final_result: 'Average of All Exam',
    language: 'en',
    theme: 'light',
    online_admission: false,
    enable_rtl: false,
    zoom_api_key: '',
    zoom_secret: '',
    google_map: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    youtube_url: '',
    instagram_url: '',
    pinterest_url: '',
    frontend_logo: null,
    admin_logo: null,
    website: '',
    is_active: true
  });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collegesService.getColleges();
      // Handle both array and object responses
      const data = Array.isArray(response) ? response : response.data || [];
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load schools');
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setEditingId(null);
      resetForm();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      school_url: '',
      code: '',
      name: '',
      address: '',
      phone: '',
      registration_date: '',
      email: '',
      fax: '',
      footer: '',
      currency: 'USD',
      currency_symbol: '$',
      enable_frontend: true,
      exam_final_result: 'Average of All Exam',
      language: 'en',
      theme: 'light',
      online_admission: false,
      enable_rtl: false,
      zoom_api_key: '',
      zoom_secret: '',
      google_map: '',
      facebook_url: '',
      twitter_url: '',
      linkedin_url: '',
      youtube_url: '',
      instagram_url: '',
      pinterest_url: '',
      frontend_logo: null,
      admin_logo: null,
      website: '',
      is_active: true
    });
    setEditingId(null);
  };

  // Global header bar handlers
  const handleSchoolChange = (event) => {
    const value = event.target.value;
    setSelectedSchool(value);
    localStorage.setItem('selectedSchool', value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
    localStorage.setItem('selectedYear', value);
  };

  const handleGlobalSearchChange = (event) => {
    setGlobalSearch(event.target.value);
  };

  const handleGlobalUpdate = () => {
    // This function can be expanded to perform global update operations
    setSuccess('Update processed successfully!');
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      if (!formData.school_url || !formData.code || !formData.name || !formData.address || !formData.phone || !formData.email || !formData.currency_symbol) {
        setError('Please fill in all required fields');
        setSaving(false);
        return;
      }

      if (editingId) {
        await collegesService.updateCollege(editingId, formData);
        setSuccess('School updated successfully!');
      } else {
        await collegesService.createCollege(formData);
        setSuccess('School created successfully!');
      }

      setTimeout(() => {
        setSuccess(false);
        resetForm();
        fetchSchools();
        setTabValue(0);
      }, 2000);
    } catch (err) {
      console.error('Error saving school:', err);
      setError(err.response?.data?.message || 'Failed to save school');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (school) => {
    try {
      const response = await collegesService.getCollege(school.id);
      const schoolData = response.data;
      setFormData({
        school_url: schoolData.school_url || '',
        code: schoolData.code || '',
        name: schoolData.name || '',
        address: schoolData.address || '',
        phone: schoolData.phone || '',
        registration_date: schoolData.registration_date || '',
        email: schoolData.email || '',
        fax: schoolData.fax || '',
        footer: schoolData.footer || '',
        currency: schoolData.currency || 'USD',
        currency_symbol: schoolData.currency_symbol || '$',
        enable_frontend: schoolData.enable_frontend !== false,
        exam_final_result: schoolData.exam_final_result || 'Average of All Exam',
        language: schoolData.language || 'en',
        theme: schoolData.theme || 'light',
        online_admission: schoolData.online_admission || false,
        enable_rtl: schoolData.enable_rtl || false,
        zoom_api_key: schoolData.zoom_api_key || '',
        zoom_secret: schoolData.zoom_secret || '',
        google_map: schoolData.google_map || '',
        facebook_url: schoolData.facebook_url || '',
        twitter_url: schoolData.twitter_url || '',
        linkedin_url: schoolData.linkedin_url || '',
        youtube_url: schoolData.youtube_url || '',
        instagram_url: schoolData.instagram_url || '',
        pinterest_url: schoolData.pinterest_url || '',
        frontend_logo: null,
        admin_logo: null,
        website: schoolData.website || '',
        is_active: schoolData.is_active !== false
      });
      setEditingId(school.id);
      setTabValue(1);
    } catch (err) {
      console.error('Error loading school details:', err);
      setError('Failed to load school details');
    }
  };

  const handleDeleteClick = (schoolId) => {
    setDeleteId(schoolId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setSaving(true);
      await collegesService.deleteCollege(deleteId);
      setSuccess('School deleted successfully!');
      setDeleteConfirmOpen(false);
      setDeleteId(null);
      setTimeout(() => {
        setSuccess(false);
        fetchSchools();
      }, 2000);
    } catch (err) {
      console.error('Error deleting school:', err);
      setError(err.response?.data?.message || 'Failed to delete school');
    } finally {
      setSaving(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'School Name', 'Code', 'Email', 'Phone', 'Address', 'Status'];
    const data = schools.map(school => [
      school.id,
      school.name,
      school.code,
      school.email,
      school.phone,
      school.address,
      school.is_active ? 'Active' : 'Inactive'
    ]);

    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell || ''}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'schools.csv';
    link.click();
  };

  const exportToExcel = () => {
    const headers = ['ID', 'School Name', 'Code', 'Email', 'Phone', 'Address', 'Status'];
    const data = schools.map(school => [
      school.id,
      school.name,
      school.code,
      school.email,
      school.phone,
      school.address,
      school.is_active ? 'Active' : 'Inactive'
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schools');
    XLSX.writeFile(wb, 'schools.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = ['ID', 'School Name', 'Code', 'Email', 'Phone', 'Address', 'Status'];
    const data = schools.map(school => [
      school.id,
      school.name,
      school.code,
      school.email,
      school.phone,
      school.address,
      school.is_active ? 'Active' : 'Inactive'
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20
    });

    doc.text('Schools List', 14, 15);
    doc.save('schools.pdf');
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Global Header Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: 'white', overflow: 'hidden' }}>
        <Grid container spacing={2} alignItems="center">
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
                {schools.length > 0 && schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Session Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                label="Session Year"
              >
                <MenuItem value="">Choose Year</MenuItem>
                <MenuItem value="2023-24">2023-24</MenuItem>
                <MenuItem value="2024-25">2024-25</MenuItem>
                <MenuItem value="2025-26">2025-26</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search..."
              value={globalSearch}
              onChange={handleGlobalSearchChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGlobalUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Header with Title and Collapse */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HomeIcon />
              <Typography variant="h5">Manage School</Typography>
            </Box>
          }
          action={
            <IconButton
              size="small"
              onClick={() => setExpandedTitle(!expandedTitle)}
            >
              {expandedTitle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          }
        />
        {expandedTitle && (
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Typography variant="caption" sx={{ alignSelf: 'center', mr: 1 }}>
                <strong>Quick Links:</strong>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {QUICK_LINKS.map((link, idx) => (
                  <Button
                    key={idx}
                    size="small"
                    variant="text"
                    sx={{ textTransform: 'none', fontSize: '0.85rem' }}
                    onClick={() => window.location.href = link.path}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(false)}>{success}</Alert>}

      {/* Tabs */}
      <Card>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab icon={<HomeIcon />} iconPosition="start" label="List" />
          <Tab icon={<HomeIcon />} iconPosition="start" label="Add" />
        </Tabs>

        <CardContent>
          {/* List Tab */}
          {tabValue === 0 && (
            <Box>
              {/* Table Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToCSV}
                  >
                    CSV
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToExcel}
                  >
                    Excel
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToPDF}
                  >
                    PDF
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Rows per page</InputLabel>
                    <Select
                      value={rowsPerPage}
                      label="Rows per page"
                      onChange={(e) => {
                        setRowsPerPage(e.target.value);
                        setPage(0);
                      }}
                    >
                      {[5, 10, 15, 25, 50].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    label="Search"
                    placeholder="Search schools..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(0);
                    }}
                    sx={{ minWidth: 250 }}
                  />
                </Box>
              </Box>

              {/* Table */}
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Paper sx={{ overflowX: 'auto' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell>#SL</TableCell>
                          <TableCell>School Name</TableCell>
                          <TableCell>Code</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell>Logo</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredSchools
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((school, idx) => (
                            <TableRow key={school.id}>
                              <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                              <TableCell>{school.name}</TableCell>
                              <TableCell>{school.code}</TableCell>
                              <TableCell>{school.email}</TableCell>
                              <TableCell>{school.phone}</TableCell>
                              <TableCell>{school.address}</TableCell>
                              <TableCell>
                                {school.admin_logo && (
                                  <img
                                    src={school.admin_logo}
                                    alt="logo"
                                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={school.is_active ? 'Active' : 'Inactive'}
                                  color={school.is_active ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleEdit(school)}
                                  title="Edit"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteClick(school.id)}
                                  title="Delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>

                  {/* Pagination */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption">
                      Showing {filteredSchools.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                      {Math.min((page + 1) * rowsPerPage, filteredSchools.length)} of{' '}
                      {filteredSchools.length} entries
                    </Typography>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 25, 50]}
                      component="div"
                      count={filteredSchools.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(event, newPage) => setPage(newPage)}
                      onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Add/Edit Tab */}
          {tabValue === 1 && (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ backgroundColor: '#e8e8e8', p: 1, mb: 2 }}>
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="School URL"
                    name="school_url"
                    value={formData.school_url}
                    onChange={handleInputChange}
                    helperText="No Space, No Capital Letter, No Special Character. Ex: south-point OR liverpool"
                    required
                    FormHelperTextProps={{ style: { color: 'inherit' } }}
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                    sx={{
                      '& .MuiFormLabel-root.MuiInputBase-root': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="School Code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="School Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Registration Date"
                    name="registration_date"
                    type="date"
                    value={formData.registration_date}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Footer"
                    name="footer"
                    value={formData.footer}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                  />
                </Grid>

                {/* Settings Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ backgroundColor: '#e8e8e8', p: 1, mb: 2 }}>
                    Setting Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Currency Symbol"
                    name="currency_symbol"
                    value={formData.currency_symbol}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>Enable Frontend</InputLabel>
                    <Select
                      name="enable_frontend"
                      value={formData.enable_frontend}
                      onChange={handleInputChange}
                      label="Enable Frontend"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>Exam Final Result</InputLabel>
                    <Select
                      name="exam_final_result"
                      value={formData.exam_final_result}
                      onChange={handleInputChange}
                      label="Exam Final Result"
                    >
                      <MenuItem value="Average of All Exam">Average of All Exam</MenuItem>
                      <MenuItem value="Highest Exam">Highest Exam</MenuItem>
                      <MenuItem value="Lowest Exam">Lowest Exam</MenuItem>
                      <MenuItem value="Percentage">Percentage</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>Language</InputLabel>
                    <Select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="ar">Arabic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>Theme</InputLabel>
                    <Select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      label="Theme"
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="blue">Blue</MenuItem>
                      <MenuItem value="green">Green</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="online_admission"
                        checked={formData.online_admission}
                        onChange={handleInputChange}
                      />
                    }
                    label="Online Admission"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Enable RTL</InputLabel>
                    <Select
                      name="enable_rtl"
                      value={formData.enable_rtl}
                      onChange={handleInputChange}
                      label="Enable RTL"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zoom API Key"
                    name="zoom_api_key"
                    value={formData.zoom_api_key}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zoom Secret"
                    name="zoom_secret"
                    value={formData.zoom_secret}
                    onChange={handleInputChange}
                    type="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Google Map"
                    name="google_map"
                    value={formData.google_map}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    helperText="Paste Google Map embed code here"
                  />
                </Grid>

                {/* Social Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ backgroundColor: '#e8e8e8', p: 1, mb: 2 }}>
                    Social Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook URL"
                    name="facebook_url"
                    value={formData.facebook_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter URL"
                    name="twitter_url"
                    value={formData.twitter_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="YouTube URL"
                    name="youtube_url"
                    value={formData.youtube_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Instagram URL"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pinterest URL"
                    name="pinterest_url"
                    value={formData.pinterest_url}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Other Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ backgroundColor: '#e8e8e8', p: 1, mb: 2 }}>
                    Other Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload Frontend Logo
                    <input
                      hidden
                      type="file"
                      name="frontend_logo"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>
                  <Typography variant="caption" color="textSecondary">
                    Dimension:- Max-W: 150px, Max-H: 90px
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                  >
                    Upload Admin Logo
                    <input
                      hidden
                      type="file"
                      name="admin_logo"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>
                  <Typography variant="caption" color="textSecondary">
                    Dimension:- Max-W: 100px, Max-H: 110px
                  </Typography>
                </Grid>

                {/* Form Actions */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        resetForm();
                        setTabValue(0);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this school?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSchool;
