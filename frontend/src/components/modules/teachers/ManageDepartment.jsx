/**
 * Manage Department Component
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FileCopy as FileCopyIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManageDepartment = () => {
  console.log('ManageDepartment component starting to render');
  const { t } = useTranslation();

  // Data states
  const [departments, setDepartments] = useState([]);
  const [schools, setSchools] = useState([]);

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
    college: '',
    name: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data
  const fetchDepartments = async (schoolId) => {
    setLoading(true);
    console.log('fetchDepartments called with schoolId:', schoolId);
    try {
      const params = {};
      if (schoolId) params.college = schoolId;
      console.log('Fetching from /teachers/departments/ with params:', params);
      const response = await apiService.get('/teachers/departments/', { params });
      console.log('fetchDepartments response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      setDepartments(data);
      setError('');
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to load departments');
      setDepartments([]);
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

  // Initialize
  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetchDepartments(selectedSchool);
    } else {
      fetchDepartments('');
    }
  }, [selectedSchool]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    console.log('ManageDepartment: Tab changed to', newValue);
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
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('Submitting department form:', formData);

      const endpoint = editingId ? `/teachers/departments/${editingId}/` : '/teachers/departments/';
      const method = editingId ? 'put' : 'post';

      const response = await apiService[method](endpoint, formData);

      console.log('Department saved successfully:', response.data);
      setSuccess(`Department ${editingId ? 'updated' : 'created'} successfully!`);
      setFormData({
        college: '',
        name: '',
        description: '',
      });
      setEditingId(null);
      setCurrentTab(0);
      fetchDepartments(selectedSchool);
    } catch (err) {
      console.error('Error saving department:', err);
      setError('Failed to save department');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      college: '',
      name: '',
      description: '',
    });
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
      console.log('Deleting department:', deleteId);
      await apiService.delete(`/teachers/departments/${deleteId}/`);
      setSuccess('Department deleted successfully!');
      fetchDepartments(selectedSchool);
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error('Error deleting department:', err);
      setError('Failed to delete department');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort data
  const filteredDepartments = departments
    .filter((dept) => {
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          dept.name?.toLowerCase().includes(search) ||
          dept.description?.toLowerCase().includes(search)
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

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * showRows,
    currentPage * showRows
  );
  const totalPages = Math.ceil(filteredDepartments.length / showRows);

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
              Manage Department
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
                Department
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
                Teacher
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
                Class Lecture
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
                Rating
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
          <Tab label="List" sx={{ textTransform: 'none' }} />
          <Tab label="Add" icon={<AddIcon />} iconPosition="start" sx={{ textTransform: 'none' }} />
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
                    <TableCell
                      onClick={() => handleSort('id')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      #SL {sortColumn === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('college_name')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      School {sortColumn === 'college_name' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('name')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Title {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('description')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Note {sortColumn === 'description' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('id')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Action {sortColumn === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedDepartments.length > 0 ? (
                    paginatedDepartments.map((dept, index) => (
                      <TableRow key={dept.id}>
                        <TableCell>{(currentPage - 1) * showRows + index + 1}</TableCell>
                        <TableCell>{dept.college_name || 'N/A'}</TableCell>
                        <TableCell>{dept.name || 'N/A'}</TableCell>
                        <TableCell>{dept.description || 'N/A'}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setFormData({
                                college: dept.college || '',
                                name: dept.name || '',
                                description: dept.description || '',
                              });
                              setEditingId(dept.id);
                              setCurrentTab(1);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(dept.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                        No departments found
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
                Showing {paginatedDepartments.length > 0 ? (currentPage - 1) * showRows + 1 : 0} to{' '}
                {Math.min(currentPage * showRows, filteredDepartments.length)} of{' '}
                {filteredDepartments.length} entries
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
                  name="college"
                  value={formData.college}
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
                name="college"
                value={formData.college}
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

            {/* Form Fields */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title *"
                  name="name"
                  value={formData.name}
                  onChange={handleFormInputChange}
                  placeholder="Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Note"
                  name="description"
                  value={formData.description}
                  onChange={handleFormInputChange}
                  placeholder="Note"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>

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
          Are you sure you want to delete this department? This action cannot be undone.
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

export default ManageDepartment;
