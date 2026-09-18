/**
 * Manage Visitor Component
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
  Person as PersonIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManageVisitor = () => {
  const { t } = useTranslation();

  // State Management
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
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
  const [purposes, setPurposes] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);

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
    visitor_id: '',
    meet_user_type: '',
    meet_staff_id: '',
    purpose: '',
    number_of_people: 1,
    check_in_date: new Date().toISOString().split('T')[0],
    check_in_time: new Date().toTimeString().slice(0, 5),
    check_out_date: '',
    check_out_time: '',
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

  // Fetch Visitors
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      let url = '/front-office/visitor-info/';
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
      const visitorsArray = Array.isArray(data) ? data : (data.results || []);
      setVisitors(visitorsArray);
      setFilteredVisitors(visitorsArray);
      setError('');
    } catch (err) {
      console.error('Error fetching visitors:', err);
      setError('Failed to load visitors');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Purposes
  const fetchPurposes = async () => {
    try {
      const response = await apiService.get('/front-office/visitor-purposes/');
      const data = response.data.data || response.data || [];
      const purposesArray = Array.isArray(data) ? data : (data.results || []);
      setPurposes(purposesArray);
    } catch (err) {
      console.error('Error fetching purposes:', err);
    }
  };

  // Fetch Staff Members
  const fetchStaffMembers = async () => {
    try {
      const response = await apiService.get('/users/users/?is_staff=true');
      const data = response.data.results || response.data || [];
      const staffArray = Array.isArray(data) ? data : (data.data || []);
      setStaffMembers(staffArray);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchSchools();
    fetchSessionYears();
    fetchVisitors();
    fetchPurposes();
    fetchStaffMembers();
  }, []);

  // Refetch when school changes
  useEffect(() => {
    setPage(0);
    fetchVisitors();
  }, [schoolFilterList]);

  // Handle Search
  const handleListSearch = (e) => {
    setListSearch(e.target.value);
    setPage(0);
  };

  // Apply filters and sorting to table data
  useEffect(() => {
    let filtered = visitors;

    if (listSearch) {
      filtered = visitors.filter((v) =>
        v.name?.toLowerCase().includes(listSearch.toLowerCase()) ||
        v.phone?.includes(listSearch) ||
        v.purpose_name?.toLowerCase().includes(listSearch.toLowerCase()) ||
        v.meet_user_type?.toLowerCase().includes(listSearch.toLowerCase())
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
      } else if (orderBy === 'purpose') {
        aVal = a.purpose_name?.toLowerCase();
        bVal = b.purpose_name?.toLowerCase();
      } else if (orderBy === 'check_in') {
        aVal = a.check_in_date;
        bVal = b.check_in_date;
      } else {
        aVal = a.id;
        bVal = b.id;
      }

      if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredVisitors(filtered);
  }, [visitors, listSearch, orderBy, orderDirection]);

  // Handle Add/Edit Dialog
  const handleOpenDialog = (visitor = null) => {
    if (visitor) {
      setEditingId(visitor.id);
      setFormData({
        name: visitor.name || '',
        phone: visitor.phone || '',
        visitor_id: visitor.visitor_id || '',
        meet_user_type: visitor.meet_user_type || '',
        meet_staff_id: visitor.meet_staff_id || '',
        purpose: visitor.purpose || '',
        number_of_people: visitor.number_of_people || 1,
        check_in_date: visitor.check_in_date || new Date().toISOString().split('T')[0],
        check_in_time: visitor.check_in_time || new Date().toTimeString().slice(0, 5),
        check_out_date: visitor.check_out_date || '',
        check_out_time: visitor.check_out_time || '',
        note: visitor.note || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        phone: '',
        visitor_id: '',
        meet_user_type: '',
        meet_staff_id: '',
        purpose: '',
        number_of_people: 1,
        check_in_date: new Date().toISOString().split('T')[0],
        check_in_time: new Date().toTimeString().slice(0, 5),
        check_out_date: '',
        check_out_time: '',
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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.purpose || !formData.meet_user_type) {
      setError('Name, Phone, Purpose, and Meet User Type are required');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        phone: formData.phone,
        visitor_id: formData.visitor_id || '',
        meet_user_type: formData.meet_user_type,
        meet_staff_id: formData.meet_staff_id || null,
        purpose: parseInt(formData.purpose),
        number_of_people: parseInt(formData.number_of_people),
        check_in_date: formData.check_in_date,
        check_in_time: formData.check_in_time,
        check_out_date: formData.check_out_date || null,
        check_out_time: formData.check_out_time || null,
        note: formData.note,
      };

      if (selectedSchool) {
        payload.college_id = selectedSchool;
      }

      if (editingId) {
        await apiService.put(`/front-office/visitor-info/${editingId}/`, payload);
        setSuccess('Visitor updated successfully');
      } else {
        await apiService.post('/front-office/visitor-info/', payload);
        setSuccess('Visitor added successfully');
      }

      handleCloseDialog();
      fetchVisitors();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving visitor:', err);
      setError(err.response?.data?.message || 'Failed to save visitor');
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
      await apiService.delete(`/front-office/visitor-info/${deleteTargetId}/`);
      setSuccess('Visitor deleted successfully');
      setDeleteConfirmDialog(false);
      fetchVisitors();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting visitor:', err);
      setError('Failed to delete visitor');
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
    const text = filteredVisitors.map((v, i) => `${i + 1}. ${v.name} - ${v.phone}`).join('\n');
    navigator.clipboard.writeText(text);
    setSuccess('Data copied to clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const headers = ['#SL', 'School', 'Name', 'Phone', 'Purpose', 'Meet Type', 'Check-In', 'Check-Out'];
    const csvData = filteredVisitors.map((v, i) => [
      i + 1,
      v.school_name || 'All',
      v.name,
      v.phone,
      v.purpose_name || '-',
      v.meet_user_type || '-',
      `${v.check_in_date} ${v.check_in_time}`,
      v.check_out_date ? `${v.check_out_date} ${v.check_out_time}` : '-',
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'visitors.csv');
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

  const displayedVisitors = filteredVisitors.slice(
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
                onClick={fetchVisitors}
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
                <PersonIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Manage Visitor
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
                  <Chip label="Visitor Info" color="primary" variant="outlined" size="small" />
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
                  {/* Left Side: Copy, CSV, Show Rows */}
                  <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CopyIcon />}
                        onClick={handleCopy}
                        disabled={filteredVisitors.length === 0}
                      >
                        Copy
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={handleExportCSV}
                        disabled={filteredVisitors.length === 0}
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
                                active={orderBy === 'purpose'}
                                direction={orderDirection}
                                onClick={() => handleSort('purpose')}
                              >
                                Purpose
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'meet'}
                                direction={orderDirection}
                                onClick={() => handleSort('meet')}
                              >
                                To Meet
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'check_in'}
                                direction={orderDirection}
                                onClick={() => handleSort('check_in')}
                              >
                                Check-In
                              </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              <TableSortLabel
                                active={orderBy === 'check_out'}
                                direction={orderDirection}
                                onClick={() => handleSort('check_out')}
                              >
                                Check-Out
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
                          {displayedVisitors.length > 0 ? (
                            displayedVisitors.map((visitor, index) => (
                              <TableRow key={visitor.id} hover>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{visitor.school_name || 'All'}</TableCell>
                                <TableCell sx={{ fontWeight: '500' }}>{visitor.name}</TableCell>
                                <TableCell>{visitor.phone}</TableCell>
                                <TableCell>{visitor.purpose_name || '-'}</TableCell>
                                <TableCell>{visitor.meet_user_type || '-'}</TableCell>
                                <TableCell>{visitor.check_in_date} {visitor.check_in_time}</TableCell>
                                <TableCell>{visitor.check_out_date ? `${visitor.check_out_date} ${visitor.check_out_time}` : '-'}</TableCell>
                                <TableCell>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => handleOpenDialog(visitor)}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleDelete(visitor.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={9} sx={{ textAlign: 'center', py: 4 }}>
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
                        Showing {filteredVisitors.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                        {Math.min((page + 1) * rowsPerPage, filteredVisitors.length)} of{' '}
                        {filteredVisitors.length} entries
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
                          disabled={page >= Math.ceil(filteredVisitors.length / rowsPerPage) - 1}
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

                  {/* Meet User Type * - Required */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Meet User Type *</InputLabel>
                      <Select
                        value={formData.meet_user_type}
                        onChange={(e) => setFormData({ ...formData, meet_user_type: e.target.value })}
                        label="Meet User Type *"
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Faculty">Faculty</MenuItem>
                        <MenuItem value="Principal">Principal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* To Meet * - Required */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>To Meet *</InputLabel>
                      <Select
                        value={formData.meet_staff_id}
                        onChange={(e) => setFormData({ ...formData, meet_staff_id: e.target.value })}
                        label="To Meet *"
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        {staffMembers.map((staff) => (
                          <MenuItem key={staff.id} value={staff.id}>
                            {staff.first_name} {staff.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Visitor Purpose * - Required */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Visitor Purpose *</InputLabel>
                      <Select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        label="Visitor Purpose *"
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        {purposes.map((p) => (
                          <MenuItem key={p.id} value={p.id}>
                            {p.purpose}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                          visitor_id: '',
                          meet_user_type: '',
                          meet_staff_id: '',
                          purpose: '',
                          number_of_people: 1,
                          check_in_date: new Date().toISOString().split('T')[0],
                          check_in_time: new Date().toTimeString().slice(0, 5),
                          check_out_date: '',
                          check_out_time: '',
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
          Are you sure you want to delete this visitor record? This action cannot be undone.
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

export default ManageVisitor;
