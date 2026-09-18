/**
 * Manage Call Log Component
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
  Tabs,
  Tab,
  TableSortLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  GetApp as ExportIcon,
  Refresh as RefreshIcon,
  ContentCopy as CopyIcon,
  List as ListIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManageCallLog = () => {
  const { t } = useTranslation();

  // State Management
  const [callLogs, setCallLogs] = useState([]);
  const [filteredCallLogs, setFilteredCallLogs] = useState([]);
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
    name: '',
    phone: '',
    call_duration: '',
    call_date: new Date().toISOString().split('T')[0],
    follow_up: false,
    call_type: 'Incoming',
    call_purpose: '',
    note: '',
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

  // Fetch Call Logs
  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      let url = '/front-office/call-logs/';
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
      const callLogsArray = Array.isArray(data) ? data : (data.results || []);
      setCallLogs(callLogsArray);
      setFilteredCallLogs(callLogsArray);
      setError('');
    } catch (err) {
      console.error('Error fetching call logs:', err);
      setError('Failed to load call logs');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchSchools();
    fetchSessionYears();
    fetchCallLogs();
  }, []);

  // Refetch when school changes
  useEffect(() => {
    setPage(0);
    fetchCallLogs();
  }, [schoolFilterList]);

  // Handle Search
  const handleListSearch = (e) => {
    setListSearch(e.target.value);
    setPage(0);
  };

  // Apply filters and sorting to table data
  useEffect(() => {
    let filtered = callLogs;

    if (listSearch) {
      filtered = callLogs.filter((c) =>
        c.name?.toLowerCase().includes(listSearch.toLowerCase()) ||
        c.phone?.includes(listSearch) ||
        c.call_type?.toLowerCase().includes(listSearch.toLowerCase()) ||
        c.call_purpose?.toLowerCase().includes(listSearch.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      if (orderBy === 'name') {
        aVal = a.name?.toLowerCase();
        bVal = b.name?.toLowerCase();
      } else if (orderBy === 'phone') {
        aVal = a.phone?.toLowerCase();
        bVal = b.phone?.toLowerCase();
      } else if (orderBy === 'call_type') {
        aVal = a.call_type?.toLowerCase();
        bVal = b.call_type?.toLowerCase();
      } else if (orderBy === 'call_date') {
        aVal = a.call_date;
        bVal = b.call_date;
      } else if (orderBy === 'call_duration') {
        aVal = a.call_duration;
        bVal = b.call_duration;
      } else {
        aVal = a.id;
        bVal = b.id;
      }

      if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredCallLogs(filtered);
  }, [callLogs, listSearch, orderBy, orderDirection]);

  // Handle Add/Edit Dialog
  const handleOpenDialog = (callLog = null) => {
    if (callLog) {
      setEditingId(callLog.id);
      setFormData({
        name: callLog.name || '',
        phone: callLog.phone || '',
        call_duration: callLog.call_duration || '',
        call_date: callLog.call_date || new Date().toISOString().split('T')[0],
        follow_up: callLog.follow_up || false,
        call_type: callLog.call_type || 'Incoming',
        call_purpose: callLog.call_purpose || '',
        note: callLog.note || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        phone: '',
        call_duration: '',
        call_date: new Date().toISOString().split('T')[0],
        follow_up: false,
        call_type: 'Incoming',
        call_purpose: '',
        note: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  // Handle Save
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.call_duration) {
      setError('Name, Phone, and Call Duration are required');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        phone: formData.phone,
        call_duration: parseInt(formData.call_duration),
        call_date: formData.call_date,
        follow_up: formData.follow_up,
        call_type: formData.call_type,
        call_purpose: formData.call_purpose,
        note: formData.note,
      };

      if (selectedSchool) {
        payload.college_id = selectedSchool;
      }

      if (editingId) {
        await apiService.put(`/front-office/call-logs/${editingId}/`, payload);
        setSuccess('Call log updated successfully');
      } else {
        await apiService.post('/front-office/call-logs/', payload);
        setSuccess('Call log added successfully');
      }

      handleCloseDialog();
      fetchCallLogs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving call log:', err);
      setError(err.response?.data?.message || 'Failed to save call log');
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
      await apiService.delete(`/front-office/call-logs/${deleteTargetId}/`);
      setSuccess('Call log deleted successfully');
      setDeleteConfirmDialog(false);
      fetchCallLogs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting call log:', err);
      setError('Failed to delete call log');
    } finally {
      setLoading(false);
    }
  };

  // Handle Change Rows Per Page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  // Handle Change Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    const text = filteredCallLogs.map((c, i) => `${i + 1}. ${c.name} - ${c.phone}`).join('\n');
    navigator.clipboard.writeText(text);
    setSuccess('Data copied to clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const headers = ['#SL', 'School', 'Call Type', 'Name', 'Phone', 'Call Duration', 'Call Date', 'Action'];
    const csvData = filteredCallLogs.map((c, i) => [
      i + 1,
      c.school_name || 'All',
      c.call_type || '-',
      c.name,
      c.phone,
      c.call_duration || '-',
      c.call_date,
      c.follow_up ? 'Follow-up' : '-',
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'call-logs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrderDirection('asc');
    }
  };

  const displayedCallLogs = filteredCallLogs.slice(
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
                onClick={fetchCallLogs}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Manage Call Log
                </Typography>
              </Box>
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
                  <Chip label="Visitor Purpose" variant="outlined" size="small" />
                  <Chip label="Visitor Info" variant="outlined" size="small" />
                  <Chip label="Call Log" color="primary" variant="outlined" size="small" />
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
                  {/* Left Side: Copy, CSV, Show Rows */}
                  <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CopyIcon />}
                        onClick={handleCopy}
                        disabled={filteredCallLogs.length === 0}
                      >
                        Copy
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={handleExportCSV}
                        disabled={filteredCallLogs.length === 0}
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
                                active={orderBy === 'call_type'}
                                direction={orderDirection}
                                onClick={() => handleSort('call_type')}
                              >
                                Call Type
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderDirection}
                                onClick={() => handleSort('name')}
                              >
                                Name
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'phone'}
                                direction={orderDirection}
                                onClick={() => handleSort('phone')}
                              >
                                Phone
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'call_duration'}
                                direction={orderDirection}
                                onClick={() => handleSort('call_duration')}
                              >
                                Call Duration
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'call_date'}
                                direction={orderDirection}
                                onClick={() => handleSort('call_date')}
                              >
                                Call Date
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
                          {displayedCallLogs.length > 0 ? (
                            displayedCallLogs.map((callLog, index) => (
                              <TableRow key={callLog.id} hover>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{callLog.school_name || 'All'}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={callLog.call_type || '-'}
                                    size="small"
                                    color={callLog.call_type === 'Incoming' ? 'success' : 'info'}
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell sx={{ fontWeight: '500' }}>{callLog.name}</TableCell>
                                <TableCell>{callLog.phone}</TableCell>
                                <TableCell>{callLog.call_duration || '-'}</TableCell>
                                <TableCell>{callLog.call_date}</TableCell>
                                <TableCell>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => handleOpenDialog(callLog)}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleDelete(callLog.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
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
                        Showing {filteredCallLogs.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                        {Math.min((page + 1) * rowsPerPage, filteredCallLogs.length)} of{' '}
                        {filteredCallLogs.length} entries
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
                          disabled={page >= Math.ceil(filteredCallLogs.length / rowsPerPage) - 1}
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

                  {/* Name * - Required */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name *"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Grid>

                  {/* Phone * - Required */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone *"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </Grid>

                  {/* Call Duration * - Required */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Call Duration *"
                      placeholder="Call Duration (in seconds)"
                      type="number"
                      value={formData.call_duration}
                      onChange={(e) => setFormData({ ...formData, call_duration: e.target.value })}
                      required
                    />
                  </Grid>

                  {/* Call Date * - Required */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Call Date *"
                      type="date"
                      value={formData.call_date}
                      onChange={(e) => setFormData({ ...formData, call_date: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  {/* Follow Up */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <input
                          type="checkbox"
                          checked={formData.follow_up}
                          onChange={(e) => setFormData({ ...formData, follow_up: e.target.checked })}
                        />
                      }
                      label="Follow Up"
                    />
                  </Grid>

                  {/* Call Type - Radio Buttons */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Call Type:
                    </Typography>
                    <RadioGroup
                      row
                      value={formData.call_type}
                      onChange={(e) => setFormData({ ...formData, call_type: e.target.value })}
                    >
                      <FormControlLabel
                        value="Incoming"
                        control={<Radio />}
                        label="Incoming:"
                      />
                      <FormControlLabel
                        value="Outgoing"
                        control={<Radio />}
                        label="Outgoing:"
                      />
                    </RadioGroup>
                  </Grid>

                  {/* Note */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Note"
                      placeholder="Note"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      multiline
                      rows={4}
                    />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setFormData({
                          name: '',
                          phone: '',
                          call_duration: '',
                          call_date: new Date().toISOString().split('T')[0],
                          follow_up: false,
                          call_type: 'Incoming',
                          call_purpose: '',
                          note: '',
                        });
                      }}
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
          Are you sure you want to delete this call log record? This action cannot be undone.
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

export default ManageCallLog;
