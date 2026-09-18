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
  FormControl,
  InputLabel,
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
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Event as CalendarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import academicYearsService from '../../services/academicYears';
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

const ManageAcademicYear = () => {
  const [tabValue, setTabValue] = useState(0);
  const [academicYears, setAcademicYears] = useState([]);
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

  // Filter for list view
  const [filterSchool, setFilterSchool] = useState('');

  const [formData, setFormData] = useState({
    school: '',
    year: '',
    start_date: '',
    end_date: '',
    note: '',
    is_active: false,
    is_running: false
  });

  useEffect(() => {
    fetchAcademicYears();
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await collegesService.getColleges();
      const data = Array.isArray(response) ? response : response.data || [];
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academicYearsService.getAcademicYears();
      const data = response.data || [];
      setAcademicYears(data);
    } catch (err) {
      console.error('Error fetching academic years:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load academic years');
      setAcademicYears([]);
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

  const resetForm = () => {
    setFormData({
      school: '',
      year: '',
      start_date: '',
      end_date: '',
      note: '',
      is_active: false,
      is_running: false
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

      if (!formData.school || !formData.year || !formData.start_date || !formData.end_date) {
        setError('Please fill in all required fields');
        setSaving(false);
        return;
      }

      if (editingId) {
        await academicYearsService.updateAcademicYear(editingId, formData);
        setSuccess('Academic year updated successfully!');
      } else {
        await academicYearsService.createAcademicYear(formData);
        setSuccess('Academic year created successfully!');
      }

      setTimeout(() => {
        setSuccess(false);
        resetForm();
        fetchAcademicYears();
        setTabValue(0);
      }, 2000);
    } catch (err) {
      console.error('Error saving academic year:', err);
      setError(err.response?.data?.message || 'Failed to save academic year');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (year) => {
    try {
      const response = await academicYearsService.getAcademicYear(year.id);
      const yearData = response.data;
      setFormData({
        school: yearData.school || '',
        year: yearData.year || '',
        start_date: yearData.start_date || '',
        end_date: yearData.end_date || '',
        note: yearData.note || '',
        is_active: yearData.is_active || false,
        is_running: yearData.is_running || false
      });
      setEditingId(year.id);
      setTabValue(1);
    } catch (err) {
      console.error('Error loading academic year details:', err);
      setError('Failed to load academic year details');
    }
  };

  const handleToggleActive = async (year) => {
    try {
      setSaving(true);
      await academicYearsService.updateAcademicYear(year.id, {
        is_running: !year.is_running
      });
      setSuccess(`Academic year ${!year.is_running ? 'activated' : 'deactivated'} successfully!`);
      setTimeout(() => {
        setSuccess(false);
        fetchAcademicYears();
      }, 2000);
    } catch (err) {
      console.error('Error toggling academic year:', err);
      setError(err.response?.data?.message || 'Failed to toggle academic year');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (yearId) => {
    setDeleteId(yearId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setSaving(true);
      await academicYearsService.deleteAcademicYear(deleteId);
      setSuccess('Academic year deleted successfully!');
      setDeleteConfirmOpen(false);
      setDeleteId(null);
      setTimeout(() => {
        setSuccess(false);
        fetchAcademicYears();
      }, 2000);
    } catch (err) {
      console.error('Error deleting academic year:', err);
      setError(err.response?.data?.message || 'Failed to delete academic year');
    } finally {
      setSaving(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['#SL', 'School', 'Academic Year', 'Start Date', 'End Date', 'Is Running', 'Note'];
    const data = filteredYears.map((year, idx) => [
      idx + 1,
      year.school_name || 'N/A',
      year.year,
      year.start_date,
      year.end_date,
      year.is_running ? 'Yes' : 'No',
      year.note || 'N/A'
    ]);

    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell || ''}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'academic_years.csv';
    link.click();
  };

  const exportToExcel = () => {
    const headers = ['#SL', 'School', 'Academic Year', 'Start Date', 'End Date', 'Is Running', 'Note'];
    const data = filteredYears.map((year, idx) => [
      idx + 1,
      year.school_name || 'N/A',
      year.year,
      year.start_date,
      year.end_date,
      year.is_running ? 'Yes' : 'No',
      year.note || 'N/A'
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Academic Years');
    XLSX.writeFile(wb, 'academic_years.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = ['SL', 'School', 'Academic Year', 'Start Date', 'End Date', 'Is Running', 'Note'];
    const data = filteredYears.map((year, idx) => [
      idx + 1,
      year.school_name || 'N/A',
      year.year,
      year.start_date,
      year.end_date,
      year.is_running ? 'Yes' : 'No',
      year.note || 'N/A'
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20
    });

    doc.text('Academic Years List', 14, 15);
    doc.save('academic_years.pdf');
  };

  const filteredYears = academicYears.filter(year =>
    (year.year?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     year.note?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterSchool || year.school === parseInt(filterSchool))
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
              <CalendarIcon />
              <Typography variant="h5">Manage Academic Year</Typography>
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
          <Tab icon={<CalendarIcon />} iconPosition="start" label="List" />
          <Tab icon={<CalendarIcon />} iconPosition="start" label="Add" />
        </Tabs>

        <CardContent>
          {/* List Tab */}
          {tabValue === 0 && (
            <Box>
              {/* Filter Section */}
              <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>--Select School--</InputLabel>
                  <Select
                    value={filterSchool}
                    onChange={(e) => {
                      setFilterSchool(e.target.value);
                      setPage(0);
                    }}
                    label="--Select School--"
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
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {}}
                  >
                    Copy
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
                    placeholder="Search years..."
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
                          <TableCell>School</TableCell>
                          <TableCell>Academic Year</TableCell>
                          <TableCell>Is Running?</TableCell>
                          <TableCell>Note</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredYears
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((year, idx) => (
                            <TableRow key={year.id}>
                              <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                              <TableCell>{year.school_name || 'N/A'}</TableCell>
                              <TableCell>{year.year}</TableCell>
                              <TableCell>
                                <Chip
                                  label={year.is_running ? 'Yes' : 'No'}
                                  color={year.is_running ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{year.note || '-'}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleEdit(year)}
                                  title="Edit"
                                >
                                  <EditIcon />
                                </IconButton>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color={year.is_running ? 'warning' : 'success'}
                                  startIcon={<CheckCircleIcon />}
                                  onClick={() => handleToggleActive(year)}
                                  disabled={saving}
                                  sx={{ ml: 1 }}
                                >
                                  {year.is_running ? 'Deactivate' : 'Activate'}
                                </Button>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteClick(year.id)}
                                  title="Delete"
                                  sx={{ ml: 1 }}
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
                      Showing {filteredYears.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                      {Math.min((page + 1) * rowsPerPage, filteredYears.length)} of{' '}
                      {filteredYears.length} entries
                    </Typography>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 25, 50]}
                      component="div"
                      count={filteredYears.length}
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
                {/* Filter dropdown at top */}
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select School--</InputLabel>
                    <Select
                      value={filterSchool}
                      onChange={(e) => setFilterSchool(e.target.value)}
                      label="--Select School--"
                    >
                      <MenuItem value="">Choose School</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>School Name</InputLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      label="School Name"
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Session Start"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
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
                    label="Session End"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
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
                    label="Academic Year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2024-25"
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    placeholder="Additional notes or remarks"
                  />
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
          <Typography>Are you sure you want to delete this academic year?</Typography>
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

export default ManageAcademicYear;
