/**
 * Manage Leave Type Component
 * Comprehensive leave type management with List and Add tabs
 * Features: Leave type listing, filtering, sorting, pagination, and add form
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
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  NotificationsActive as BellIcon,
  List as ListIcon,
  AddBox as AddBoxIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{
        display: value === index ? 'block' : 'none',
        py: 3,
        width: '100%'
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

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

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const ManageLeaveType = () => {
  const navigate = useNavigate();

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSchoolTab, setSelectedSchoolTab] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('leaveType');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [formData, setFormData] = useState({
    school: '',
    applicantType: '',
    leaveType: '',
    totalLeave: '',
  });

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [leaveTypes] = useState([]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.school || !formData.applicantType || !formData.leaveType || !formData.totalLeave) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      setSuccess('Leave Type added successfully');
      setFormData({
        school: '',
        applicantType: '',
        leaveType: '',
        totalLeave: '',
      });
      setCurrentTab(0);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add leave type: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    setSuccess('Leave Type deleted successfully');
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
      {/* Global Filter Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.9}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Page Header with Collapse */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BellIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Manage Leave Type
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            size="small"
          >
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>
      </Paper>

      {!isHeaderCollapsed && (
        <>
          {/* Quick Links */}
          <Box sx={{ mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Typography
              onClick={() => navigate('/leaves?tab=0')}
              sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}
            >
              Leave Type
            </Typography>
            <Typography
              onClick={() => navigate('/leaves?tab=1')}
              sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}
            >
              Leave Application
            </Typography>
            <Typography
              onClick={() => navigate('/leaves?tab=2')}
              sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}
            >
              Waiting Application
            </Typography>
            <Typography
              onClick={() => navigate('/leaves?tab=3')}
              sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}
            >
              Approved Application
            </Typography>
            <Typography
              onClick={() => navigate('/leaves?tab=4')}
              sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}
            >
              Declined Application
            </Typography>
          </Box>

          {/* Messages */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  onClick={() => handleTabChange(null, 0)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: currentTab === 0 ? 600 : 400,
                    color: currentTab === 0 ? '#000' : '#666',
                    borderBottom: currentTab === 0 ? '3px solid #000' : 'none',
                    pb: 1,
                    textTransform: 'none',
                    fontSize: 16,
                  }}
                >
                  <ListIcon fontSize="small" />
                  List
                </Button>
                <Button
                  onClick={() => handleTabChange(null, 1)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: currentTab === 1 ? 600 : 400,
                    color: currentTab === 1 ? '#000' : '#666',
                    borderBottom: currentTab === 1 ? '3px solid #000' : 'none',
                    pb: 1,
                    textTransform: 'none',
                    fontSize: 16,
                  }}
                >
                  <AddBoxIcon fontSize="small" />
                  Add
                </Button>
              </Box>

              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel>--Select School--</InputLabel>
                <Select
                  value={selectedSchoolTab}
                  label="--Select School--"
                  onChange={(e) => setSelectedSchoolTab(e.target.value)}
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
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton size="small" title="Copy">
                      <FileCopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Excel">
                      <FileDownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="CSV">
                      <FileDownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="PDF">
                      <GetAppIcon fontSize="small" />
                    </IconButton>

                    <FormControl sx={{ minWidth: 140 }} size="small">
                      <InputLabel>Rows</InputLabel>
                      <Select
                        value={showRows}
                        label="Rows"
                        onChange={(e) => {
                          setShowRows(e.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <MenuItem value={10}>Show 10 rows</MenuItem>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      placeholder=""
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      sx={{ width: 200 }}
                    />
                  </Box>
                </Box>

                {/* Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                          # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                        </TableCell>
                        <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('school')}>
                          School <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                        </TableCell>
                        <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('applicantType')}>
                          Applicant Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                        </TableCell>
                        <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('leaveType')}>
                          Leave Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                        </TableCell>
                        <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('totalLeave')}>
                          Total Leave <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaveTypes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'gray' }}>
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : (
                        leaveTypes.map((leaveType, index) => (
                          <TableRow key={leaveType.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{leaveType.school}</TableCell>
                            <TableCell>{leaveType.applicantType}</TableCell>
                            <TableCell>{leaveType.leaveType}</TableCell>
                            <TableCell>{leaveType.totalLeave}</TableCell>
                            <TableCell>
                              <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" title="View" sx={{ color: '#000' }}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" title="Delete" sx={{ color: '#f44336' }} onClick={() => handleDelete(leaveType.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Footer and Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ color: 'gray', borderColor: '#ccc' }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ color: 'gray', borderColor: '#ccc' }}
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
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    {/* School Name */}
                    <Grid item xs={12} sm={3}>
                      <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        School Name <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <FormControl fullWidth size="small">
                        <InputLabel>--Select School--</InputLabel>
                        <Select
                          name="school"
                          value={formData.school}
                          label="--Select School--"
                          onChange={handleFormChange}
                        >
                          {SCHOOLS.map(school => (
                            <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Applicant Type */}
                    <Grid item xs={12} sm={3}>
                      <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        Applicant Type <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <FormControl fullWidth size="small">
                        <InputLabel>--Select--</InputLabel>
                        <Select
                          name="applicantType"
                          value={formData.applicantType}
                          label="--Select--"
                          onChange={handleFormChange}
                        >
                          {APPLICANT_TYPES.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Leave Type */}
                    <Grid item xs={12} sm={3}>
                      <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        Leave Type <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        placeholder="Leave Type"
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleFormChange}
                        required
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    </Grid>

                    {/* Total Leave */}
                    <Grid item xs={12} sm={3}>
                      <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        Total Leave <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        placeholder="Total Leave"
                        name="totalLeave"
                        type="number"
                        value={formData.totalLeave}
                        onChange={handleFormChange}
                        required
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    </Grid>
                  </Grid>

                  {/* Form Footer Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentTab(0);
                        setFormData({
                          school: '',
                          applicantType: '',
                          leaveType: '',
                          totalLeave: '',
                        });
                      }}
                      sx={{ px: 4 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={loading}
                      sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' }, px: 4 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
          </Paper>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this leave type? This action cannot be undone.
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

export default ManageLeaveType;
