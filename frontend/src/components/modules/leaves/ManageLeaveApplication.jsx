/**
 * Manage Leave Application Component
 * Comprehensive leave application management with List and Add tabs
 * Features: Leave application listing, filtering, sorting, pagination, and add form
 */

import React, { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  NotificationsActive as BellIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const APPLICANT_TYPES = [
  'Teacher',
  'Student',
  'Staff',
  'Parent',
];

const LEAVE_TYPES = [
  'Casual Leave',
  'Sick Leave',
  'Earned Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Bereavement Leave',
  'Study Leave',
];

const APPLICANTS = [
  'Raj Kumar',
  'Priya Singh',
  'Amit Patel',
  'Neha Gupta',
  'Ravi Sharma',
];

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const ManageLeaveApplication = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('applicant');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);

  // Form states
  const [formData, setFormData] = useState({
    school: '',
    applicantType: '',
    applicant: '',
    leaveType: '',
    applicationDate: '',
    leaveFrom: '',
    leaveTo: '',
    leaveReason: '',
    attachment: null,
    attachmentName: '',
  });

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [leaveApplications] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: file,
        attachmentName: file.name,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.school || !formData.applicantType || !formData.applicant ||
        !formData.leaveType || !formData.applicationDate || !formData.leaveFrom ||
        !formData.leaveTo || !formData.leaveReason) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate dates
    const fromDate = new Date(formData.leaveFrom);
    const toDate = new Date(formData.leaveTo);
    if (fromDate > toDate) {
      setError('Leave From date must be before Leave To date');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call with FormData for file upload
      setSuccess('Leave Application added successfully');
      setFormData({
        school: '',
        applicantType: '',
        applicant: '',
        leaveType: '',
        applicationDate: '',
        leaveFrom: '',
        leaveTo: '',
        leaveReason: '',
        attachment: null,
        attachmentName: '',
      });
      setCurrentTab(0);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add leave application: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    setSuccess('Leave Application deleted successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdate = () => {
    setSuccess('Filters updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <Box>
      {/* Global Navigation Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={globalSchool}
                label="--Select School--"
                onChange={(e) => setGlobalSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          {/* Center Divider */}
          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={selectedSchool}
                label="--Select School--"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Session Year--</InputLabel>
              <Select
                value={sessionYear}
                label="--Session Year--"
                onChange={(e) => setSessionYear(e.target.value)}
              >
                {ACADEMIC_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                textTransform: 'none',
                fontWeight: 500,
              }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Card */}
      <Paper sx={{ boxShadow: 1 }}>
        {/* Header */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BellIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              Manage Leave Application
            </Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Typography
            onClick={() => navigate('/leaves?tab=0')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Leave Type
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=1')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Leave Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=2')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Waiting Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=3')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Approved Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=4')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Declined Application
          </Typography>
        </Box>

        {/* Tabs Bar */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              onClick={() => setCurrentTab(0)}
              sx={{
                fontWeight: currentTab === 0 ? 600 : 400,
                color: currentTab === 0 ? '#000' : '#666',
                borderBottom: currentTab === 0 ? '3px solid #000' : 'none',
                pb: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                p: 0,
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              List
            </Button>
            <Button
              onClick={() => setCurrentTab(1)}
              sx={{
                fontWeight: currentTab === 1 ? 600 : 400,
                color: currentTab === 1 ? '#000' : '#666',
                borderBottom: currentTab === 1 ? '3px solid #000' : 'none',
                pb: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                p: 0,
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              Add
            </Button>
          </Box>

          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>--Select School--</InputLabel>
            <Select
              value={selectedSchool}
              label="--Select School--"
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <MenuItem value="">--Select School--</MenuItem>
              {SCHOOLS.map(school => (
                <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* LIST TAB */}
        {currentTab === 0 && (
          <Box sx={{ p: 3 }}>
            {/* Toolbar */}
            <Box sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton size="small" title="Copy" sx={{ border: '1px solid #ddd' }}>
                  <FileCopyIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="Excel" sx={{ border: '1px solid #ddd' }}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="CSV" sx={{ border: '1px solid #ddd' }}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="PDF" sx={{ border: '1px solid #ddd' }}>
                  <GetAppIcon fontSize="small" />
                </IconButton>

                <FormControl sx={{ minWidth: 140, ml: 2 }} size="small">
                  <InputLabel>Rows</InputLabel>
                  <Select
                    value={showRows}
                    label="Rows"
                    onChange={(e) => setShowRows(e.target.value)}
                  >
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                    <MenuItem value={50}>Show 50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                  Search:
                </Typography>
                <TextField
                  size="small"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 200 }}
                />
              </Box>
            </Box>

            {/* Table */}
            <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                      # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('school')}>
                      School <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('academicYear')}>
                      Academic Year <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('applicantType')}>
                      Applicant Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('leaveType')}>
                      Leave Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('applicant')}>
                      Applicant <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('status')}>
                      Status <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#999' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    leaveApplications.map((app, index) => (
                      <TableRow key={app.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{app.school}</TableCell>
                        <TableCell>{app.academicYear}</TableCell>
                        <TableCell>{app.applicantType}</TableCell>
                        <TableCell>{app.leaveType}</TableCell>
                        <TableCell>{app.applicant}</TableCell>
                        <TableCell>
                          <Box sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}>
                            Pending
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="View" sx={{ color: '#000' }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Delete" sx={{ color: '#f44336' }} onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer */}
            <Box sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #e0e0e0'
            }}>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Showing 0 to 0 of 0 entries
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: '#999', borderColor: '#ddd' }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: '#999', borderColor: '#ddd' }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* ADD TAB */}
        {currentTab === 1 && (
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleFormSubmit}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              <Grid container spacing={3}>
                {/* School Name */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    School Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>--Select School--</InputLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      label="--Select School--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {SCHOOLS.map(school => (
                        <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Applicant Type */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Applicant Type <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="applicantType"
                      value={formData.applicantType}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {APPLICANT_TYPES.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Applicant */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Applicant <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="applicant"
                      value={formData.applicant}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {APPLICANTS.map(applicant => (
                        <MenuItem key={applicant} value={applicant}>{applicant}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Leave Type */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Leave Type <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="leaveType"
                      value={formData.leaveType}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {LEAVE_TYPES.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Application Date */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Application Date <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                {/* Leave From */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Leave From <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    name="leaveFrom"
                    value={formData.leaveFrom}
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                {/* Leave To */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Leave To <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    name="leaveTo"
                    value={formData.leaveTo}
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                {/* Leave Reason */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Leave Reason <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    name="leaveReason"
                    placeholder="Leave Reason"
                    value={formData.leaveReason}
                    onChange={handleFormChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                {/* Attachment */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Attachment
                  </Typography>
                  <Box sx={{
                    border: '2px dashed #ddd',
                    borderRadius: '6px',
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#999',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <input
                      type="file"
                      id="attachment"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="attachment" style={{ cursor: 'pointer', display: 'block' }}>
                      <AttachFileIcon sx={{ fontSize: 40, color: '#999', mb: 1 }} />
                      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 0.5 }}>
                        {formData.attachmentName ? formData.attachmentName : 'Upload'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#0066cc', display: 'block' }}>
                        Please select a valid file format.
                      </Typography>
                    </label>
                  </Box>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFormData({
                        school: '',
                        applicantType: '',
                        applicant: '',
                        leaveType: '',
                        applicationDate: '',
                        leaveFrom: '',
                        leaveTo: '',
                        leaveReason: '',
                        attachment: null,
                        attachmentName: '',
                      });
                      setError('');
                      setSuccess('');
                    }}
                    sx={{
                      color: '#666',
                      borderColor: '#ddd',
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 4,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#333' },
                      '&:disabled': { backgroundColor: '#ccc', color: '#999' },
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 4,
                    }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this leave application? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageLeaveApplication;
