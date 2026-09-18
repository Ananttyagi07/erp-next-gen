/**
 * Manage Designation Component
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

const ManageDesignation = () => {
  console.log('ManageDesignation component starting to render');
  const { t } = useTranslation();

  // Data states
  const [designations, setDesignations] = useState([]);
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
  const [sortColumn, setSortColumn] = useState('designation');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    college_id: '',
    designation: '',
    note: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data
  const fetchDesignations = async (schoolId) => {
    setLoading(true);
    console.log('fetchDesignations called with schoolId:', schoolId);
    try {
      const params = {};
      if (schoolId) params.college_id = schoolId;
      console.log('Fetching from /hr/designations/ with params:', params);
      const response = await apiService.get('/hr/designations/', { params });
      console.log('fetchDesignations response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      console.log('Extracted data:', data);
      setDesignations(data);
    } catch (err) {
      setError('Failed to fetch designations');
      console.error('fetchDesignations error:', err);
      console.error('Error details:', err.response?.data || err.message);
      setDesignations([]);
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
      console.log('Extracted schools data:', data);
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
      console.error('Schools error details:', err.response?.data || err.message);
      setSchools([]);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    console.log('ManageDesignation: Component mounted, fetching schools');
    fetchSchools();
    fetchDesignations(''); // Fetch all designations initially
  }, []);

  // Fetch designations when school selection changes
  useEffect(() => {
    // Skip the initial fetch since we already did it in the mount effect
    if (selectedSchool === '') {
      return;
    }
    console.log('ManageDesignation: Fetching designations for selected school:', selectedSchool);
    fetchDesignations(selectedSchool);
  }, [selectedSchool]);

  // Filter and sort designations
  const filteredAndSortedDesignations = designations
    .filter((d) => {
      const schoolMatch = !selectedSchool || d.college_id === parseInt(selectedSchool);
      const searchMatch = !searchTerm ||
        d.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.note?.toLowerCase().includes(searchTerm.toLowerCase());
      return schoolMatch && searchMatch;
    })
    .sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

  const totalPages = Math.ceil(filteredAndSortedDesignations.length / showRows);
  const paginatedDesignations = filteredAndSortedDesignations.slice(
    (currentPage - 1) * showRows,
    currentPage * showRows
  );

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  // Submit form
  const handleSubmit = async () => {
    if (!formData.college_id.trim()) {
      setError('Please select a school');
      return;
    }
    if (!formData.designation.trim()) {
      setError('Designation is required');
      return;
    }

    try {
      if (editingId) {
        await apiService.put(`/hr/designations/${editingId}/`, formData);
        setSuccess('Designation updated successfully!');
      } else {
        await apiService.post('/hr/designations/', formData);
        setSuccess('Designation added successfully!');
      }

      fetchDesignations(selectedSchool);
      resetForm();
      setCurrentTab(0);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save designation');
      console.error('Error:', err);
    }
  };

  // Edit handler
  const handleEdit = (designation) => {
    setEditingId(designation.id);
    setFormData({
      college_id: designation.college_id || selectedSchool || '',
      designation: designation.designation,
      note: designation.note || '',
    });
    setCurrentTab(1);
  };

  // Delete handler
  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await apiService.delete(`/hr/designations/${deleteId}/`);
      setSuccess('Designation deleted successfully!');
      fetchDesignations(selectedSchool);
      setOpenDeleteDialog(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete designation');
      console.error('Error:', err);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    const text = paginatedDesignations.map(d => `${d.designation}\t${d.note || ''}`).join('\n');
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['SL', 'School Name', 'Designation', 'Note'];
    const csv = [
      headers.join(','),
      ...paginatedDesignations.map((d, i) => [
        i + 1,
        schools.find(s => s.id === d.college_id)?.name || '',
        d.designation,
        d.note || '',
      ].map(v => `"${v}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `designations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const resetForm = () => {
    setFormData({
      college_id: '',
      designation: '',
      note: '',
    });
    setEditingId(null);
  };

  console.log('ManageDesignation rendering - designations:', designations, 'schools:', schools);

  try {
    return (
      <Box sx={{ width: '100%' }}>
        {/* DEBUG INFO - Always visible in development */}
        <Box sx={{ p: 2, mb: 2, backgroundColor: '#fff3cd', borderRadius: 1, border: '2px solid #ff6b6b', fontSize: 12, minHeight: '60px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            ✓ ManageDesignation Component Loaded
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Loading: {loading ? 'Yes' : 'No'} | Designations: {designations.length} | Schools: {schools.length} | Error: {error ? 'Yes' : 'No'}
          </Typography>
          {error && (
            <Typography variant="caption" display="block" sx={{ mt: 1, color: '#d32f2f' }}>
              Error Message: {error}
            </Typography>
          )}
        </Box>

        {/* SECTION 1: Global Header Bar */}
        {!isHeaderCollapsed && (
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select School</InputLabel>
                  <Select
                    label="Select School"
                    value={selectedSchool}
                    onChange={(e) => {
                      setSelectedSchool(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value="">All Schools</MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.id}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  placeholder="Global Search"
                  size="small"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select School</InputLabel>
                  <Select label="Select School" defaultValue="">
                    <MenuItem value="">Select School</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Session Year</InputLabel>
                  <Select label="Session Year" defaultValue="">
                    <MenuItem value="">Select Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button fullWidth variant="contained" sx={{ backgroundColor: '#000', color: '#fff' }}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* SECTION 2: Main Page Component */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BadgeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Manage Designation
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}>
              {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, fontSize: 14 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Quick Link:
            </Typography>
            <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Manage Designation
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>|</Typography>
            <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Manage Employee
            </Typography>
          </Box>
        </Paper>

        {/* SECTION 3: Tabbed Interface */}
        <Paper sx={{ p: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            aria-label="designation tabs"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab icon={<SearchIcon sx={{ mr: 1 }} />} iconPosition="start" label="List" />
            <Tab icon={<AddIcon sx={{ mr: 1 }} />} iconPosition="start" label="Add" />
          </Tabs>

          {/* SECTION 4: List Tab */}
          {currentTab === 0 && (
            <Box>
              {/* Filter Dropdown */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel>Select School</InputLabel>
                  <Select
                    label="Select School"
                    value={selectedSchool}
                    onChange={(e) => {
                      setSelectedSchool(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value="">All Schools</MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.id}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Table Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<FileCopyIcon />} onClick={handleCopy}>
                    Copy
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<GetAppIcon />}>
                    Excel
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<GetAppIcon />} onClick={handleExportCSV}>
                    CSV
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<GetAppIcon />}>
                    PDF
                  </Button>
                  <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Show Rows</InputLabel>
                    <Select
                      label="Show Rows"
                      value={showRows}
                      onChange={(e) => {
                        setShowRows(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <MenuItem value={5}>Show 5 rows</MenuItem>
                      <MenuItem value={10}>Show 10 rows</MenuItem>
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField
                  placeholder="Search..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                  sx={{ minWidth: 250 }}
                />
              </Box>

              {/* Alerts */}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              {/* Data Table */}
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('id')}>
                        #SL
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('college_id')}>
                        School Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('designation')}>
                        Designation
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('note')}>
                        Note
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : paginatedDesignations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                          No designations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDesignations.map((designation, index) => (
                        <TableRow key={designation.id}>
                          <TableCell>{(currentPage - 1) * showRows + index + 1}</TableCell>
                          <TableCell>{schools.find(s => s.id === designation.college_id)?.name || 'N/A'}</TableCell>
                          <TableCell>{designation.designation}</TableCell>
                          <TableCell>{designation.note || '-'}</TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={() => handleEdit(designation)}
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleOpenDeleteDialog(designation.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Table Footer */}
              {filteredAndSortedDesignations.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Showing {(currentPage - 1) * showRows + 1} to {Math.min(currentPage * showRows, filteredAndSortedDesignations.length)} of {filteredAndSortedDesignations.length} entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* SECTION 5: Add Tab */}
          {currentTab === 1 && (
            <Box>
              {/* Filter Dropdown */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel>Select School</InputLabel>
                  <Select
                    label="Select School"
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                  >
                    <MenuItem value="">All Schools</MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.id}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Form */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>School Name *</InputLabel>
                    <Select
                      name="college_id"
                      label="School Name *"
                      value={formData.college_id}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">Select School</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Designation *"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Designation"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Note"
                  />
                </Grid>
              </Grid>

              {/* Alerts */}
              {success && <Alert severity="success" sx={{ mt: 2, mb: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

              {/* Form Actions */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-start' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    resetForm();
                    setError('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {editingId ? 'Update' : 'Submit'}
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this designation? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } catch (error) {
    console.error('ManageDesignation render error:', error);
    return (
      <Box sx={{ p: 3, backgroundColor: '#ffebee', border: '2px solid #d32f2f', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Error rendering Manage Designation Component
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: '#c62828' }}>
          {error.message}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#666' }}>
          {error.stack}
        </Typography>
      </Box>
    );
  }
};

export default ManageDesignation;
