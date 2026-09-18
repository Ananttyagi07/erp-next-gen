/**
 * Manage Employee Component
 * 5-section UI pattern: Global Header, Main Page, Tabbed Interface, List Tab, Add Tab
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Badge as BadgeIcon,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FileCopy as FileCopyIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManageEmployee = () => {
  console.log('ManageEmployee component starting to render');
  const { t } = useTranslation();

  // Data states
  const [employees, setEmployees] = useState([]);
  const [schools, setSchools] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [salaryGrades, setSalaryGrades] = useState([]);

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    college_id: '',
    first_name: '',
    last_name: '',
    national_id: '',
    designation_id: '',
    phone: '',
    gender: '',
    blood_group: '',
    religion: '',
    birth_date: '',
    present_address: '',
    permanent_address: '',
    email: '',
    username: '',
    password: '',
    salary_grade_id: '',
    salary_type: '',
    role_id: '',
    joining_date: '',
    is_view_on_web: false,
    facebook_url: '',
    linkedin_url: '',
    twitter_url: '',
    instagram_url: '',
    youtube_url: '',
    pinterest_url: '',
    other_info: '',
    display_order: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  // Fetch data
  const fetchEmployees = async (schoolId) => {
    setLoading(true);
    console.log('fetchEmployees called with schoolId:', schoolId);
    try {
      const params = {};
      if (schoolId) params.college_id = schoolId;
      console.log('Fetching from /hr/employees/ with params:', params);
      const response = await apiService.get('/hr/employees/', { params });
      console.log('fetchEmployees response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      setEmployees(data);
      setError('');
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchools = async () => {
    try {
      console.log('Fetching schools from /colleges/');
      const response = await apiService.get('/colleges/');
      console.log('fetchSchools response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setSchools([]);
    }
  };

  const fetchDesignations = async () => {
    try {
      console.log('Fetching designations from /hr/designations/');
      const response = await apiService.get('/hr/designations/');
      console.log('fetchDesignations response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      setDesignations(data);
    } catch (err) {
      console.error('Error fetching designations:', err);
      setDesignations([]);
    }
  };

  // Initialize
  useEffect(() => {
    fetchSchools();
    fetchDesignations();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetchEmployees(selectedSchool);
    } else {
      fetchEmployees('');
    }
  }, [selectedSchool]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    console.log('ManageEmployee: Tab changed to', newValue);
    setCurrentTab(newValue);
  };

  // Handle school filter change
  const handleSchoolChange = (event) => {
    const value = event.target.value;
    setSelectedSchool(value);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle form input change
  const handleFormInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file uploads
  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      console.log('Photo file selected:', file.name);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      console.log('Resume file selected:', file.name);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('Submitting employee form:', formData);

      // Create FormData for multipart upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== '' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      if (photoFile) {
        submitData.append('photo', photoFile);
      }
      if (resumeFile) {
        submitData.append('resume', resumeFile);
      }

      const endpoint = editingId ? `/hr/employees/${editingId}/` : '/hr/employees/';
      const method = editingId ? 'put' : 'post';

      const response = await apiService[method](endpoint, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Employee saved successfully:', response.data);
      setSuccess(`Employee ${editingId ? 'updated' : 'created'} successfully!`);
      setFormData({
        college_id: '',
        first_name: '',
        last_name: '',
        national_id: '',
        designation_id: '',
        phone: '',
        gender: '',
        blood_group: '',
        religion: '',
        birth_date: '',
        present_address: '',
        permanent_address: '',
        email: '',
        username: '',
        password: '',
        salary_grade_id: '',
        salary_type: '',
        role_id: '',
        joining_date: '',
        is_view_on_web: false,
        facebook_url: '',
        linkedin_url: '',
        twitter_url: '',
        instagram_url: '',
        youtube_url: '',
        pinterest_url: '',
        other_info: '',
        display_order: '',
      });
      setPhotoFile(null);
      setResumeFile(null);
      setEditingId(null);
      setCurrentTab(0);
      fetchEmployees(selectedSchool);
    } catch (err) {
      console.error('Error saving employee:', err);
      setError('Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      college_id: '',
      first_name: '',
      last_name: '',
      national_id: '',
      designation_id: '',
      phone: '',
      gender: '',
      blood_group: '',
      religion: '',
      birth_date: '',
      present_address: '',
      permanent_address: '',
      email: '',
      username: '',
      password: '',
      salary_grade_id: '',
      salary_type: '',
      role_id: '',
      joining_date: '',
      is_view_on_web: false,
      facebook_url: '',
      linkedin_url: '',
      twitter_url: '',
      instagram_url: '',
      youtube_url: '',
      pinterest_url: '',
      other_info: '',
      display_order: '',
    });
    setPhotoFile(null);
    setResumeFile(null);
    setEditingId(null);
  };

  // Handle delete
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      console.log('Deleting employee:', deleteId);
      await apiService.delete(`/hr/employees/${deleteId}/`);
      setSuccess('Employee deleted successfully!');
      fetchEmployees(selectedSchool);
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort data
  const filteredEmployees = employees
    .filter((emp) => {
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          emp.first_name?.toLowerCase().includes(search) ||
          emp.last_name?.toLowerCase().includes(search) ||
          emp.email?.toLowerCase().includes(search) ||
          emp.phone?.includes(search)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortColumn] || '';
      let bVal = b[sortColumn] || '';
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * showRows,
    currentPage * showRows
  );
  const totalPages = Math.ceil(filteredEmployees.length / showRows);

  return (
    <Box sx={{ p: 0 }}>
      {/* Error/Success Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* 1. GLOBAL HEADER BAR */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={selectedSchool}
                onChange={handleSchoolChange}
                label="Select School"
              >
                <MenuItem value="">All Schools</MenuItem>
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.college_name || school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select defaultValue="" label="Select School">
                <MenuItem value="">--Select School--</MenuItem>
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.college_name || school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Session Year</InputLabel>
              <Select defaultValue="" label="Session Year">
                <MenuItem value="">--Session Year--</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 2. MAIN PAGE COMPONENT */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        {/* Title Bar with Badge and Collapse */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BadgeIcon sx={{ color: '#666' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Employee
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            size="small"
          >
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>

        {/* Quick Links */}
        {!isHeaderCollapsed && (
          <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Quick Link:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Manage Designation
              </Typography>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Manage Employee
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      {/* 3. TABBED INTERFACE */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Tab
            label="List"
            icon={<ListIcon />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            label="Add"
            icon={<AddIcon />}
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>

        {/* 4. LIST TAB */}
        {currentTab === 0 && (
          <Box sx={{ p: 3 }}>
            {loading && <CircularProgress />}

            {/* Filter and Controls */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Select School</InputLabel>
                  <Select
                    value={selectedSchool}
                    onChange={handleSchoolChange}
                    label="Select School"
                  >
                    <MenuItem value="">All Schools</MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.id}>
                        {school.college_name || school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Button size="small" variant="outlined" startIcon={<FileCopyIcon />}>
                    Copy
                  </Button>
                  <Button size="small" variant="outlined" startIcon={<GetAppIcon />}>
                    Excel
                  </Button>
                  <Button size="small" variant="outlined" startIcon={<GetAppIcon />}>
                    CSV
                  </Button>
                  <Button size="small" variant="outlined" startIcon={<GetAppIcon />}>
                    PDF
                  </Button>

                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Show Rows</InputLabel>
                    <Select
                      value={showRows}
                      onChange={(e) => setShowRows(e.target.value)}
                      label="Show Rows"
                    >
                      <MenuItem value={10}>Show 10 rows</MenuItem>
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
                    }}
                    sx={{ ml: 'auto' }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Data Table */}
            <TableContainer sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>#SL</TableCell>
                    <TableCell
                      onClick={() => handleSort('college_id')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      School {sortColumn === 'college_id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Photo</TableCell>
                    <TableCell
                      onClick={() => handleSort('first_name')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Name {sortColumn === 'first_name' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('designation_id')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Designation {sortColumn === 'designation_id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell
                      onClick={() => handleSort('email')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('joining_date')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Joining Date {sortColumn === 'joining_date' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('is_view_on_web')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Is View on Web? {sortColumn === 'is_view_on_web' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Display Order</TableCell>
                    <TableCell
                      onClick={() => handleSort('id')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Action {sortColumn === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((emp, index) => (
                      <TableRow key={emp.id}>
                        <TableCell>{(currentPage - 1) * showRows + index + 1}</TableCell>
                        <TableCell>{emp.college_name || 'N/A'}</TableCell>
                        <TableCell>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: '#1976d2',
                            }}
                          >
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          {emp.first_name} {emp.last_name || ''}
                        </TableCell>
                        <TableCell>{emp.designation || 'N/A'}</TableCell>
                        <TableCell>{emp.phone || 'N/A'}</TableCell>
                        <TableCell>{emp.email || 'N/A'}</TableCell>
                        <TableCell>{emp.joining_date || 'N/A'}</TableCell>
                        <TableCell>{emp.is_view_on_web ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            defaultValue={emp.display_order || ''}
                            variant="standard"
                            sx={{ width: 60 }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => console.log('Edit:', emp.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: '#1976d2' }}
                            onClick={() => console.log('View:', emp.id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(emp.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} sx={{ textAlign: 'center', py: 3 }}>
                        No employees found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Table Footer */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="body2">
                Showing {paginatedEmployees.length > 0 ? (currentPage - 1) * showRows + 1 : 0} to{' '}
                {Math.min(currentPage * showRows, filteredEmployees.length)} of{' '}
                {filteredEmployees.length} entries
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="small"
                    variant={currentPage === page ? 'contained' : 'outlined'}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  size="small"
                  variant="outlined"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </Box>
            </Box>

            {/* Update Order Button */}
            <Box sx={{ textAlign: 'right' }}>
              <Button variant="contained" color="success" sx={{ fontWeight: 600 }}>
                Update Order
              </Button>
            </Box>
          </Box>
        )}

        {/* 5. ADD TAB */}
        {currentTab === 1 && (
          <Box sx={{ p: 3 }}>
            {/* Top School Filter */}
            <Box sx={{ mb: 3, textAlign: 'right' }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Select School</InputLabel>
                <Select
                  name="college_id"
                  value={formData.college_id}
                  onChange={handleFormInputChange}
                  label="Select School"
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  {schools.map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {school.college_name || school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Top-Level Form Field: School Name */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>School Name *</InputLabel>
              <Select
                name="college_id"
                value={formData.college_id}
                onChange={handleFormInputChange}
                label="School Name *"
              >
                <MenuItem value="">--Select School--</MenuItem>
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.college_name || school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Basic Information Section */}
            <Box
              sx={{
                backgroundColor: '#e8e8e8',
                p: 1.5,
                mb: 2,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              Basic Information
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name *"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleFormInputChange}
                  placeholder="Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="National ID"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleFormInputChange}
                  placeholder="National ID"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Designation *</InputLabel>
                  <Select
                    name="designation_id"
                    value={formData.designation_id}
                    onChange={handleFormInputChange}
                    label="Designation *"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    {designations.map((des) => (
                      <MenuItem key={des.id} value={des.id}>
                        {des.designation || des.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormInputChange}
                  placeholder="Phone"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender *</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormInputChange}
                    label="Gender *"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="O">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleFormInputChange}
                    label="Blood Group"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleFormInputChange}
                  placeholder="Religion"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Birth Date *"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleFormInputChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Present Address"
                  name="present_address"
                  value={formData.present_address}
                  onChange={handleFormInputChange}
                  placeholder="Present Address"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Permanent Address"
                  name="permanent_address"
                  value={formData.permanent_address}
                  onChange={handleFormInputChange}
                  placeholder="Permanent Address"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Academic Information Section */}
            <Box
              sx={{
                backgroundColor: '#e8e8e8',
                p: 1.5,
                mb: 2,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              Academic Information
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormInputChange}
                  placeholder="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username *"
                  name="username"
                  value={formData.username}
                  onChange={handleFormInputChange}
                  placeholder="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password *"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormInputChange}
                  placeholder="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Salary Grade *</InputLabel>
                  <Select
                    name="salary_grade_id"
                    value={formData.salary_grade_id}
                    onChange={handleFormInputChange}
                    label="Salary Grade *"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="1">Grade A</MenuItem>
                    <MenuItem value="2">Grade B</MenuItem>
                    <MenuItem value="3">Grade C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Salary Type *</InputLabel>
                  <Select
                    name="salary_type"
                    value={formData.salary_type}
                    onChange={handleFormInputChange}
                    label="Salary Type *"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Role *</InputLabel>
                  <Select
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleFormInputChange}
                    label="Role *"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="1">Admin</MenuItem>
                    <MenuItem value="2">Teacher</MenuItem>
                    <MenuItem value="3">Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Joining Date *"
                  name="joining_date"
                  type="date"
                  value={formData.joining_date}
                  onChange={handleFormInputChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  component="label"
                  fullWidth
                >
                  Upload Resume
                  <input
                    hidden
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    type="file"
                    onChange={handleResumeUpload}
                  />
                </Button>
                <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                  Document file format: .pdf, .doc/docx, .ppt/pptx or .txt
                </Typography>
                {resumeFile && (
                  <Typography variant="caption" sx={{ color: '#1976d2', display: 'block' }}>
                    Selected: {resumeFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Other Information Section */}
            <Box
              sx={{
                backgroundColor: '#e8e8e8',
                p: 1.5,
                mb: 2,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              Other Information
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Is View on Web?</InputLabel>
                  <Select
                    name="is_view_on_web"
                    value={formData.is_view_on_web ? 'yes' : 'no'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_view_on_web: e.target.value === 'yes',
                      })
                    }
                    label="Is View on Web?"
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Facebook URL"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={handleFormInputChange}
                  placeholder="Facebook URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Linkedin URL"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleFormInputChange}
                  placeholder="Linkedin URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Twitter URL"
                  name="twitter_url"
                  value={formData.twitter_url}
                  onChange={handleFormInputChange}
                  placeholder="Twitter URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Instagram URL"
                  name="instagram_url"
                  value={formData.instagram_url}
                  onChange={handleFormInputChange}
                  placeholder="Instagram URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Youtube URL"
                  name="youtube_url"
                  value={formData.youtube_url}
                  onChange={handleFormInputChange}
                  placeholder="Youtube URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pinterest URL"
                  name="pinterest_url"
                  value={formData.pinterest_url}
                  onChange={handleFormInputChange}
                  placeholder="Pinterest URL"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Other Info"
                  name="other_info"
                  value={formData.other_info}
                  onChange={handleFormInputChange}
                  placeholder="Other Info"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Photo Section */}
            <Box
              sx={{
                backgroundColor: '#e8e8e8',
                p: 1.5,
                mb: 2,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              Photo
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  component="label"
                  fullWidth
                >
                  Upload Photo
                  <input
                    hidden
                    accept=".jpg,.jpeg,.png,.gif"
                    type="file"
                    onChange={handlePhotoUpload}
                  />
                </Button>
                <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                  Dimension:- Max-W: 120px, Max-H: 130px
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                  Image file format: .jpg, .jpeg, .png or .gif
                </Typography>
                {photoFile && (
                  <Typography variant="caption" sx={{ color: '#1976d2', display: 'block' }}>
                    Selected: {photoFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Instruction Box */}
            <Alert severity="warning" sx={{ mb: 3 }}>
              Instruction: Please add Designation before add Employee.
            </Alert>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Icon component for List tab
const ListIcon = () => <Box sx={{ display: 'inline', mr: 1 }}>📋</Box>;

export default ManageEmployee;
