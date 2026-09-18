/**
 * Manage Visitor Purpose Component
 * Full UI redesign matching design specifications with global header, quick links, and tabbed interface
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Chip,
  Container,
  Tabs,
  Tab,
  TableSortLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  GetApp as ExportIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  LibraryAdd as AddTabIcon,
  List as ListIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManageVisitorPurpose = () => {
  const { t } = useTranslation();

  // State Management
  const [purposes, setPurposes] = useState([]);
  const [filteredPurposes, setFilteredPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Filter States
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolFilterList, setSchoolFilterList] = useState('');
  const [listSearch, setListSearch] = useState('');

  // Global Header States
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sessionYears, setSessionYears] = useState([]);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);

  // Dialog States
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // UI States
  const [currentTab, setCurrentTab] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [orderDirection, setOrderDirection] = useState('asc');

  // Form Data
  const [formData, setFormData] = useState({
    purpose: '',
    description: '',
  });

  // Fetch Schools
  const fetchSchools = async () => {
    try {
      const response = await apiService.get('/colleges/colleges/');
      const schoolsData = response.data.data || response.data || [];
      const schools = Array.isArray(schoolsData) ? schoolsData : (schoolsData.data || []);
      setSchools(schools);
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
  };

  // Fetch Session Years
  const fetchSessionYears = async () => {
    try {
      const response = await apiService.get('/admin-settings/academic-years/');
      const yearsData = response.data.data || response.data || [];
      const years = Array.isArray(yearsData) ? yearsData : (yearsData.results || []);
      setSessionYears(years);
    } catch (err) {
      console.error('Error fetching session years:', err);
    }
  };

  // Fetch Visitor Purposes
  const fetchPurposes = async () => {
    try {
      setLoading(true);
      let url = '/front-office/visitor-purposes/';
      const params = new URLSearchParams();

      if (schoolFilterList) {
        params.append('college_id', schoolFilterList);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await apiService.get(url);
      const data = response.data.data || response.data || [];
      const purposesArray = Array.isArray(data) ? data : (data.results || []);
      setPurposes(purposesArray);
      setFilteredPurposes(purposesArray);
      setError('');
    } catch (err) {
      console.error('Error fetching purposes:', err);
      setError('Failed to load visitor purposes');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchSchools();
    fetchSessionYears();
    fetchPurposes();
  }, []);

  // Refetch when school changes
  useEffect(() => {
    setPage(0);
    fetchPurposes();
  }, [schoolFilterList]);

  // Handle Search
  const handleListSearch = (e) => {
    setListSearch(e.target.value);
    setPage(0);
  };

  // Apply filters and sorting to table data
  useEffect(() => {
    let filtered = purposes;

    if (listSearch) {
      filtered = purposes.filter((p) =>
        p.purpose?.toLowerCase().includes(listSearch.toLowerCase()) ||
        p.description?.toLowerCase().includes(listSearch.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      if (orderBy === 'purpose') {
        aVal = a.purpose?.toLowerCase();
        bVal = b.purpose?.toLowerCase();
      } else if (orderBy === 'school') {
        aVal = a.school_name?.toLowerCase();
        bVal = b.school_name?.toLowerCase();
      } else {
        aVal = a.id;
        bVal = b.id;
      }

      if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredPurposes(filtered);
  }, [purposes, listSearch, orderBy, orderDirection]);

  // Handle Add/Edit Dialog
  const handleOpenDialog = (purpose = null) => {
    if (purpose) {
      setEditingId(purpose.id);
      setFormData({
        purpose: purpose.purpose || '',
        description: purpose.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({ purpose: '', description: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({ purpose: '', description: '' });
  };

  // Handle Save
  const handleSave = async () => {
    if (!formData.purpose.trim()) {
      setError('Purpose name is required');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        purpose: formData.purpose,
        description: formData.description || '',
      };

      if (selectedSchool) {
        payload.college_id = selectedSchool;
      }

      if (editingId) {
        await apiService.put(`/front-office/visitor-purposes/${editingId}/`, payload);
        setSuccess('Visitor purpose updated successfully');
      } else {
        await apiService.post('/front-office/visitor-purposes/', payload);
        setSuccess('Visitor purpose added successfully');
      }

      handleCloseDialog();
      fetchPurposes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving purpose:', err);
      setError(err.response?.data?.message || 'Failed to save visitor purpose');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    setDeleteTargetId(id);
    setDeleteConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await apiService.delete(`/front-office/visitor-purposes/${deleteTargetId}/`);
      setSuccess('Visitor purpose deleted successfully');
      setDeleteConfirmDialog(false);
      fetchPurposes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting purpose:', err);
      setError('Failed to delete visitor purpose');
    } finally {
      setLoading(false);
    }
  };

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['#SL', 'Purpose', 'Description'];
    const csvData = filteredPurposes.map((purpose, index) => [
      index + 1,
      purpose.purpose,
      purpose.description || '-',
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'visitor-purposes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    const text = filteredPurposes.map((p, i) => `${i + 1}. ${p.purpose}`).join('\n');
    navigator.clipboard.writeText(text);
    setSuccess('Data copied to clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrderDirection('asc');
    }
  };

  const displayedPurposes = filteredPurposes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* SECTION 1: Global Header Bar */}
      <Paper elevation={1} sx={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', mb: 2, mt: -3, mx: -3 }}>
        <Box sx={{ px: 3, py: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Select School - First Dropdown */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  label="Select School"
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  {schools.map(school => (
                    <MenuItem key={school.id} value={school.id}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Global Search Field */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Global Search"
                label="Global Search"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
                }}
              />
            </Grid>

            {/* Select School - Second Dropdown */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={schoolFilterList}
                  onChange={(e) => setSchoolFilterList(e.target.value)}
                  label="Select School"
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  {schools.map(school => (
                    <MenuItem key={school.id} value={school.id}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Session Year - Third Dropdown */}
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Session Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Session Year"
                >
                  <MenuItem value="">--Select Year--</MenuItem>
                  {sessionYears.map(year => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Update Button */}
            <Grid item xs={12} sm={6} md={2.5}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<RefreshIcon />}
                sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
                onClick={fetchPurposes}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {/* Alerts */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* SECTION 2: Main Page Component */}
        <Card elevation={2}>
          <CardContent sx={{ p: 0 }}>
            {/* Title Bar with Collapse */}
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Manage Visitor Purpose
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              >
                {isHeaderExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            {/* Quick Links Section */}
            {isHeaderExpanded && (
              <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Quick Link:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Visitor Purpose" color="primary" variant="outlined" size="small" />
                  <Chip label="Visitor Info" variant="outlined" size="small" />
                  <Chip label="Call Log" variant="outlined" size="small" />
                  <Chip label="Postal Dispatch" variant="outlined" size="small" />
                  <Chip label="Postal Receive" variant="outlined" size="small" />
                </Box>
              </Box>
            )}

            {/* SECTION 3: Tabbed Interface */}
            <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '14px',
                  },
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ListIcon fontSize="small" />
                      List
                    </Box>
                  }
                  id="tab-list"
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AddIcon fontSize="small" />
                      Add
                    </Box>
                  }
                  id="tab-add"
                />
              </Tabs>
            </Box>

            {/* SECTION 4: LIST TAB */}
            {currentTab === 0 && (
              <Box sx={{ p: 2 }}>
                {/* Filter and Controls Row */}
                <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                  {/* Left Side: Copy, Excel, CSV, PDF, Show Rows */}
                  <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CopyIcon />}
                        onClick={handleCopy}
                        disabled={filteredPurposes.length === 0}
                      >
                        Copy
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={handleExportCSV}
                        disabled={filteredPurposes.length === 0}
                      >
                        CSV
                      </Button>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Show Rows</InputLabel>
                        <Select
                          value={rowsPerPage}
                          onChange={handleChangeRowsPerPage}
                          label="Show Rows"
                        >
                          <MenuItem value={5}>Show 5 rows</MenuItem>
                          <MenuItem value={10}>Show 10 rows</MenuItem>
                          <MenuItem value={15}>Show 15 rows</MenuItem>
                          <MenuItem value={25}>Show 25 rows</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  {/* Right Side: Search Bar */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search"
                      label="Search"
                      value={listSearch}
                      onChange={handleListSearch}
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
                      }}
                    />
                  </Grid>

                  {/* School Filter Dropdown */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Select School</InputLabel>
                        <Select
                          value={schoolFilterList}
                          onChange={(e) => setSchoolFilterList(e.target.value)}
                          label="Select School"
                        >
                          <MenuItem value="">--Select School--</MenuItem>
                          {schools.map(school => (
                            <MenuItem key={school.id} value={school.id}>
                              {school.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                    {/* Table */}
                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <TableContainer sx={{ mb: 2 }}>
                          <Table size="small">
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>#SL</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                  <TableSortLabel
                                    active={orderBy === 'school'}
                                    direction={orderDirection}
                                    onClick={() => handleSort('school')}
                                  >
                                    School
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                  <TableSortLabel
                                    active={orderBy === 'purpose'}
                                    direction={orderDirection}
                                    onClick={() => handleSort('purpose')}
                                  >
                                    Visitor Purpose
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                  <TableSortLabel
                                    active={orderBy === 'action'}
                                    direction={orderDirection}
                                    onClick={() => handleSort('action')}
                                  >
                                    Action
                                  </TableSortLabel>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {displayedPurposes.length > 0 ? (
                                displayedPurposes.map((purpose, index) => (
                                  <TableRow key={purpose.id} hover>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{purpose.school_name || 'All'}</TableCell>
                                    <TableCell sx={{ fontWeight: '500' }}>{purpose.purpose}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Edit">
                                        <IconButton
                                          size="small"
                                          color="primary"
                                          onClick={() => handleOpenDialog(purpose)}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          size="small"
                                          color="error"
                                          onClick={() => handleDelete(purpose.id)}
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                                    No data available in table
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            Showing {filteredPurposes.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                            {Math.min((page + 1) * rowsPerPage, filteredPurposes.length)} of{' '}
                            {filteredPurposes.length} entries
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              disabled={page === 0}
                              onClick={() => handleChangePage(null, page - 1)}
                            >
                              Previous
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              disabled={page >= Math.ceil(filteredPurposes.length / rowsPerPage) - 1}
                              onClick={() => handleChangePage(null, page + 1)}
                            >
                              Next
                            </Button>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                )}

            {/* SECTION 5: ADD TAB */}
            {currentTab === 1 && (
              <Box sx={{ p: 2 }}>
                {/* Filter Dropdown on Right */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Select School</InputLabel>
                    <Select
                      value={schoolFilterList}
                      onChange={(e) => setSchoolFilterList(e.target.value)}
                      label="Select School"
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {schools.map(school => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={3} sx={{ maxWidth: 600 }}>
                  {/* School Name * - Required */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>School Name *</InputLabel>
                      <Select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        label="School Name *"
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        {schools.map(school => (
                          <MenuItem key={school.id} value={school.id}>
                            {school.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Visitor Purpose * - Required */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Visitor Purpose *"
                      placeholder="Visitor Purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      required
                    />
                  </Grid>

                  {/* Description - Optional */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description (Optional)"
                      placeholder="Description (Optional)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      multiline
                      rows={3}
                    />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => setFormData({ purpose: '', description: '' })}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialog} onClose={() => setDeleteConfirmDialog(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this visitor purpose? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageVisitorPurpose;
