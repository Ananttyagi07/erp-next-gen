/**
 * Manage Postal Dispatch Component
 * 5-section UI pattern: Global Header, Main Page, Tabbed Interface, List Tab, Add Tab
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
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
  Tooltip,
  Typography,
  Alert,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Mail as MailIcon,
  CloudUpload as CloudUploadIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  FileCopy as FileCopyIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

const ManagePostalDispatch = () => {
  console.log('ManagePostalDispatch component starting to render');
  const { t } = useTranslation();

  // Data states
  const [dispatches, setDispatches] = useState([]);
  const [schools, setSchools] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('dispatch_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    college_id: '',
    to_title: '',
    reference_number: '',
    address: '',
    dispatch_date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch data
  const fetchDispatches = async (schoolId) => {
    setLoading(true);
    console.log('fetchDispatches called with schoolId:', schoolId);
    try {
      const params = {};
      if (schoolId) params.college_id = schoolId;
      console.log('Fetching from /front-office/postal-dispatches/ with params:', params);
      const response = await apiService.get('/front-office/postal-dispatches/', { params });
      console.log('fetchDispatches response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      console.log('Extracted data:', data);
      setDispatches(data);
    } catch (err) {
      setError('Failed to fetch postal dispatches');
      console.error('fetchDispatches error:', err);
      console.error('Error details:', err.response?.data || err.message);
      setDispatches([]);
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

  const fetchAcademicYears = async () => {
    try {
      console.log('Fetching academic years from /admin-settings/academic-years/');
      const response = await apiService.get('/admin-settings/academic-years/');
      console.log('fetchAcademicYears response:', response.data);
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      console.log('Extracted academic years data:', data);
      setAcademicYears(data);
    } catch (err) {
      console.error('Error fetching years:', err);
      console.error('Years error details:', err.response?.data || err.message);
      setAcademicYears([]);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    console.log('ManagePostalDispatch: Component mounted, fetching schools and academic years');
    fetchSchools();
    fetchAcademicYears();
    fetchDispatches(''); // Fetch all dispatches initially
  }, []);

  // Fetch dispatches when school selection changes
  useEffect(() => {
    // Skip the initial fetch since we already did it in the mount effect
    if (selectedSchool === '') {
      return;
    }
    console.log('ManagePostalDispatch: Fetching dispatches for selected school:', selectedSchool);
    fetchDispatches(selectedSchool);
  }, [selectedSchool]);

  // Filter and sort dispatches
  const filteredAndSortedDispatches = dispatches
    .filter((d) => {
      const schoolMatch = !selectedSchool || d.college_id === parseInt(selectedSchool);
      const searchMatch = !searchTerm ||
        d.to_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.reference_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.address?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const totalPages = Math.ceil(filteredAndSortedDispatches.length / showRows);
  const paginatedDispatches = filteredAndSortedDispatches.slice(
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

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(file.name);
    }
  };

  // Handle form input
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      college_id: selectedSchool || '',
      to_title: '',
      reference_number: '',
      address: '',
      dispatch_date: new Date().toISOString().split('T')[0],
      note: '',
    });
    setSelectedFile(null);
    setFilePreview('');
    setEditingId(null);
    setError('');
  };

  // Submit form
  const handleSubmit = async () => {
    if (!formData.college_id.trim()) {
      setError('Please select a school');
      return;
    }
    if (!formData.to_title.trim()) {
      setError('To Title is required');
      return;
    }
    if (!formData.reference_number.trim()) {
      setError('Reference Number is required');
      return;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return;
    }
    if (!formData.dispatch_date.trim()) {
      setError('Dispatch Date is required');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('college_id', formData.college_id);
      submitData.append('to_title', formData.to_title);
      submitData.append('reference_number', formData.reference_number);
      submitData.append('address', formData.address);
      submitData.append('dispatch_date', formData.dispatch_date);
      submitData.append('note', formData.note);

      if (selectedFile) {
        submitData.append('attachment', selectedFile);
      }

      if (editingId) {
        await apiService.put(`/front-office/postal-dispatches/${editingId}/`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Postal dispatch updated successfully!');
      } else {
        await apiService.post('/front-office/postal-dispatches/', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Postal dispatch added successfully!');
      }

      fetchDispatches(selectedSchool);
      resetForm();
      setCurrentTab(0);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save postal dispatch');
      console.error('Error:', err);
    }
  };

  // Edit handler
  const handleEdit = (dispatch) => {
    setEditingId(dispatch.id);
    setFormData({
      college_id: dispatch.college_id || selectedSchool || '',
      to_title: dispatch.to_title,
      reference_number: dispatch.reference_number || '',
      address: dispatch.address,
      dispatch_date: dispatch.dispatch_date,
      note: dispatch.note || '',
    });
    setFilePreview(dispatch.attachment ? dispatch.attachment.split('/').pop() : '');
    setCurrentTab(1);
  };

  // Delete handler
  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await apiService.delete(`/front-office/postal-dispatches/${deleteId}/`);
      setSuccess('Postal dispatch deleted successfully!');
      fetchDispatches(selectedSchool);
      setOpenDeleteDialog(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete postal dispatch');
      console.error('Error:', err);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    const text = paginatedDispatches.map(d => `${d.to_title}\t${d.reference_number}\t${d.dispatch_date}`).join('\n');
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // CSV export
  const handleCSVExport = () => {
    const headers = ['#SL', 'School', 'To Title', 'Reference Number', 'Dispatch Date'];
    const rows = paginatedDispatches.map((d, idx) => [
      (currentPage - 1) * showRows + idx + 1,
      schools.find(s => s.id === d.college_id)?.name || 'N/A',
      d.to_title,
      d.reference_number || 'N/A',
      d.dispatch_date,
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `postal_dispatches_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  console.log('ManagePostalDispatch rendering - dispatches:', dispatches, 'schools:', schools, 'academicYears:', academicYears);

  try {
    return (
      <Box sx={{ width: '100%' }}>
        {/* DEBUG INFO - Always visible in development */}
        <Box sx={{ p: 2, mb: 2, backgroundColor: '#fff3cd', borderRadius: 1, border: '2px solid #ff6b6b', fontSize: 12, minHeight: '60px' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            ✓ ManagePostalDispatch Component Loaded
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Loading: {loading ? 'Yes' : 'No'} | Dispatches: {dispatches.length} | Schools: {schools.length} | Error: {error ? 'Yes' : 'No'}
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
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value);
                    setCurrentPage(1);
                  }}
                  label="Select School"
                >
                  <MenuItem value="">All Schools</MenuItem>
                  {schools.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Global search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18 }} /> }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Session Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Session Year"
                >
                  <MenuItem value="">All Years</MenuItem>
                  {academicYears.map((y) => (
                    <MenuItem key={y.id} value={y.id}>{y.year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#000', color: '#fff' }}
                onClick={() => fetchDispatches(selectedSchool)}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* SECTION 2: Main Page Component with Title Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MailIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Manage Postal Dispatch
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Track outgoing postal dispatches
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}>
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['All Dispatches', 'Today', 'This Week', 'This Month'].map((link) => (
            <Chip key={link} label={link} variant="outlined" size="small" />
          ))}
        </Box>
      </Paper>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      {/* SECTION 3: Tabbed Interface */}
      <Paper>
        <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)}>
          <Tab label="List" />
          <Tab label="Add" />
        </Tabs>

        {/* SECTION 4: List Tab */}
        {currentTab === 0 && (
          <Box sx={{ p: 3 }}>
            {/* Controls */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
              <Tooltip title="Copy data">
                <IconButton size="small" onClick={handleCopy} color="primary">
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Export CSV">
                <IconButton size="small" onClick={handleCSVExport} color="primary">
                  <GetAppIcon />
                </IconButton>
              </Tooltip>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Show Rows</InputLabel>
                <Select
                  value={showRows}
                  onChange={(e) => {
                    setShowRows(e.target.value);
                    setCurrentPage(1);
                  }}
                  label="Show Rows"
                >
                  {[5, 10, 15, 25].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18 }} /> }}
              />
            </Box>

            {/* Table */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('#SL')}>
                          #SL {sortColumn === '#SL' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('college_id')}>
                          School {sortColumn === 'college_id' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('to_title')}>
                          To Title {sortColumn === 'to_title' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('reference_number')}>
                          Reference Number {sortColumn === 'reference_number' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('dispatch_date')}>
                          Dispatch Date {sortColumn === 'dispatch_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedDispatches.length > 0 ? (
                        paginatedDispatches.map((dispatch, idx) => (
                          <TableRow key={dispatch.id} hover>
                            <TableCell>{(currentPage - 1) * showRows + idx + 1}</TableCell>
                            <TableCell>{schools.find(s => s.id === dispatch.college_id)?.name || 'N/A'}</TableCell>
                            <TableCell>{dispatch.to_title}</TableCell>
                            <TableCell>
                              <Chip label={dispatch.reference_number || 'N/A'} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>{dispatch.dispatch_date}</TableCell>
                            <TableCell align="center">
                              <Tooltip title="Edit">
                                <IconButton size="small" color="primary" onClick={() => handleEdit(dispatch)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" color="error" onClick={() => handleOpenDeleteDialog(dispatch.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">No dispatches found</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Page {currentPage} of {totalPages || 1} | Total: {filteredAndSortedDispatches.length}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      size="small"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}

        {/* SECTION 5: Add Tab */}
        {currentTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {/* School Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>School Name</InputLabel>
                  <Select
                    value={formData.college_id}
                    onChange={(e) => setFormData({ ...formData, college_id: e.target.value })}
                    label="School Name"
                  >
                    <MenuItem value="">Select School</MenuItem>
                    {schools.map((s) => (
                      <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* To Title */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="To Title"
                  name="to_title"
                  value={formData.to_title}
                  onChange={handleFormChange}
                  required
                />
              </Grid>

              {/* Reference Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reference Number"
                  name="reference_number"
                  value={formData.reference_number}
                  onChange={handleFormChange}
                  required
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              {/* Dispatch Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dispatch Date"
                  name="dispatch_date"
                  type="date"
                  value={formData.dispatch_date}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              {/* Note */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Note"
                  name="note"
                  value={formData.note}
                  onChange={handleFormChange}
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Attachment */}
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', border: '2px dashed #ccc' }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    />
                  </Button>
                  <FormHelperText sx={{ mt: 1 }}>Please select a valid file format</FormHelperText>
                  {filePreview && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AttachFileIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">{filePreview}</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Form Actions */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  resetForm();
                  setCurrentTab(0);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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
          <Typography>Are you sure you want to delete this postal dispatch?</Typography>
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
    console.error('ManagePostalDispatch render error:', error);
    return (
      <Box sx={{ p: 3, backgroundColor: '#ffebee', border: '2px solid #d32f2f', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Error rendering Postal Dispatch Component
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

export default ManagePostalDispatch;
