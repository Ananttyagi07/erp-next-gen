import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSchool } from '../../context/useSchool';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  TablePagination,
  Tooltip,
  Grid,
  Card,
  CardContent,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  ExpandLess,
  ExpandMore,
  GetApp as ExportIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const ManageUserRole = () => {
  // Get selected school from SchoolContext instead of local state
  const { selectedSchool } = useSchool();
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [sessionYears, setSessionYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSessionYear, setSelectedSessionYear] = useState('');
  const [expandedTitle, setExpandedTitle] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', note: '' });
  const [createFormData, setCreateFormData] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);

  const fetchRoles = async (schoolId = selectedSchool) => {
    try {
      setLoading(true);
      // Build URL with college filter if selected
      let url = '/roles/roles/';
      if (schoolId) {
        url += `?college_id=${schoolId}`;
      }
      const response = await apiService.get(url);
      const rolesData = response.data.results || response.data.data || response.data || [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await apiService.get('/colleges/colleges/');
      // API returns {success: true, data: [...]}
      const schoolsData = response.data.data || response.data || [];
      // Handle both direct array and wrapped response
      const schools = Array.isArray(schoolsData) ? schoolsData : (schoolsData.data || []);
      setSchools(schools);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setSchools([]);
    }
  };

  const fetchSessionYears = async () => {
    try {
      const response = await apiService.get('/admin-settings/academic-years/');
      const yearsData = response.data.data || response.data || [];
      setSessionYears(Array.isArray(yearsData) ? yearsData : []);
    } catch (err) {
      console.error('Error fetching session years:', err);
      setSessionYears([]);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchRoles();
    fetchSchools();
    fetchSessionYears();
  }, []);

  // Refetch roles when school selection changes
  useEffect(() => {
    if (selectedSchool !== '') {
      fetchRoles(selectedSchool);
    }
  }, [selectedSchool]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = () => {
    fetchRoles();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setEditFormData({ name: role.name, note: role.description || '' });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedRole(null);
    setEditFormData({ name: '', note: '' });
  };

  const handleEditSave = async () => {
    try {
      await apiService.put(`/roles/roles/${selectedRole.id}/`, {
        name: editFormData.name,
        description: editFormData.note,
      });
      handleEditClose();
      fetchRoles();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update role');
    }
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiService.delete(`/roles/roles/${selectedRole.id}/`);
      setDeleteDialogOpen(false);
      setSelectedRole(null);
      fetchRoles();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error deleting role:', err);
      setError('Failed to delete role');
    }
  };

  const handleCreateRole = async () => {
    if (!createFormData.name.trim()) {
      setError('Role name is required');
      return;
    }

    try {
      setCreating(true);
      const roleData = {
        name: createFormData.name,
        description: createFormData.description,
      };

      // If a school is selected, associate the role with that school
      if (selectedSchool) {
        roleData.college_id = selectedSchool;
      }

      await apiService.post('/roles/roles/', roleData);
      setCreateFormData({ name: '', description: '' });
      fetchRoles();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError(null);
    } catch (err) {
      console.error('Error creating role:', err);
      setError('Failed to create role. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  // Filter and search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRoles = filteredRoles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const quickLinks = [
    { label: 'General Setting', key: 'generalSettings' },
    { label: 'Manage School', key: 'manageSchool' },
    { label: 'Payment Setting', key: 'paymentSettings' },
    { label: 'SMS Setting', key: 'smsSettings' },
    { label: 'Email Setting', key: 'emailSettings' },
    { label: 'Academic Year', key: 'academicYears' },
    { label: 'User Role', key: 'userRole' },
    { label: 'Role Permission', key: 'rolePermission' },
    { label: 'Super Admin', key: 'manageSuperAdmin' },
    { label: 'Manage User', key: 'manageUser' },
    { label: 'Reset User Password', key: 'resetUserPassword' },
    { label: 'Reset Username', key: 'resetUsername' },
    { label: 'User Credential', key: 'userCredential' },
    { label: 'Activity Log', key: 'activityLog' },
    { label: 'Feedback', key: 'feedback' },
    { label: 'Backup', key: 'backupDatabase' },
    { label: 'Opening Hour', key: 'openingHours' },
  ];

  const defaultRoles = ['Super Admin', 'Admin', 'Guardian', 'Student', 'Teacher'];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Operation completed successfully!
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Header with Dropdowns */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* First School Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                label="Select School"
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

          {/* Global Search */}
          <Grid item xs={12} sm={6} md={3}>
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

          {/* Second School Dropdown */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                label="Select School"
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

          {/* Session Year Dropdown */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Session Year</InputLabel>
              <Select
                value={selectedSessionYear}
                onChange={(e) => setSelectedSessionYear(e.target.value)}
                label="Session Year"
              >
                <MenuItem value="">--Session Year--</MenuItem>
                {sessionYears.map((year) => (
                  <MenuItem key={year.id} value={year.id}>
                    {year.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Update Button */}
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#000', color: '#fff' }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Page Title with Accordion */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backgroundColor: '#f5f5f5',
          }}
          onClick={() => setExpandedTitle(!expandedTitle)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon sx={{ color: '#333', fontSize: 24 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Manage User Role
            </Typography>
          </Box>
          <IconButton size="small">
            {expandedTitle ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {/* Collapsed Content */}
        <Collapse in={expandedTitle}>
          <Box sx={{ p: 2, backgroundColor: '#fff' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Quick Link:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickLinks.map((link) => (
                <Button
                  key={link.key}
                  size="small"
                  variant="text"
                  sx={{
                    color: '#667eea',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Paper>

      {/* Tabs and Table */}
      <Paper elevation={2}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="List" />
          <Tab label="Add" />
        </Tabs>

        {/* List Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            {/* Table Action Bar */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md="auto">
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Copy">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        const text = paginatedRoles.map((r) => r.name).join('\n');
                        navigator.clipboard.writeText(text);
                      }}
                    >
                      Copy
                    </Button>
                  </Tooltip>
                  <Tooltip title="Export as Excel">
                    <Button size="small" variant="outlined">
                      Excel
                    </Button>
                  </Tooltip>
                  <Tooltip title="Export as CSV">
                    <Button size="small" variant="outlined">
                      CSV
                    </Button>
                  </Tooltip>
                  <Tooltip title="Export as PDF">
                    <Button size="small" variant="outlined">
                      PDF
                    </Button>
                  </Tooltip>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md="auto" sx={{ ml: 'auto' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Show Rows</InputLabel>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    label="Show Rows"
                  >
                    <MenuItem value={10}>10 rows</MenuItem>
                    <MenuItem value={15}>15 rows</MenuItem>
                    <MenuItem value={25}>25 rows</MenuItem>
                    <MenuItem value={50}>50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(0);
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
                  }}
                />
              </Grid>
            </Grid>

            {/* Data Table */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>#SL</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Note</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Is Default?</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedRoles.length > 0 ? (
                        paginatedRoles.map((role, index) => (
                          <TableRow key={role.id} hover>
                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.description || '-'}</TableCell>
                            <TableCell>{role.is_default ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEdit(role)}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                {!role.is_default && (
                                  <Tooltip title="Delete">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleDeleteClick(role)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                            No roles found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Table Footer - Pagination */}
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    Showing {filteredRoles.length > 0 ? page * rowsPerPage + 1 : 0} to{' '}
                    {Math.min((page + 1) * rowsPerPage, filteredRoles.length)} of {filteredRoles.length} entries
                  </Typography>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 25, 50]}
                    component="div"
                    count={filteredRoles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </>
            )}
          </Box>
        )}

        {/* Add Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add New Role
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Use this form to create a new user role. Fill in the details and click "Create Role".
            </Alert>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                label="Role Name"
                value={createFormData.name}
                onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                margin="normal"
                placeholder="e.g., Manager, Coordinator"
              />
              <TextField
                fullWidth
                label="Description"
                value={createFormData.description}
                onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                margin="normal"
                multiline
                rows={4}
                placeholder="Describe the responsibilities and purpose of this role"
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateRole}
                  disabled={creating || !createFormData.name.trim()}
                >
                  {creating ? 'Creating...' : 'Create Role'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setCreateFormData({ name: '', description: '' })}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Role Name"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description/Note"
            value={editFormData.note}
            onChange={(e) => setEditFormData({ ...editFormData, note: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUserRole;
