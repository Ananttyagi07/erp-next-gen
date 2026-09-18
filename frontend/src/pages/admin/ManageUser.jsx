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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const ManageUser = () => {
  const { selectedSchool } = useSchool();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    role_id: '',
    is_active: true,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch users and roles on mount and when school changes
  useEffect(() => {
    if (selectedSchool) {
      fetchUsers();
      fetchRoles();
    }
  }, [selectedSchool]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/users/?college_id=${selectedSchool}`);
      setUsers(response.data.data?.users || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiService.get(`/roles/roles/?college_id=${selectedSchool}`);
      const rolesData = response.data.results || response.data.data || response.data || [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles');
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email,
        username: user.username,
        password: '', // Don't show password for edit
        phone: user.phone || '',
        role_id: user.role_id || '',
        is_active: user.is_active,
      });
    } else {
      setEditingUser(null);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        phone: '',
        role_id: '',
        is_active: true,
      });
    }
    setFormDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setFormDialogOpen(false);
    setEditingUser(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      phone: '',
      role_id: '',
      is_active: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveUser = async () => {
    try {
      setSubmitting(true);

      // Validate form
      if (!formData.first_name || !formData.last_name || !formData.email || !formData.username || !formData.role_id) {
        setError('Please fill all required fields');
        return;
      }

      // For new users, password is required
      if (!editingUser && !formData.password) {
        setError('Password is required for new users');
        return;
      }

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        role_id: parseInt(formData.role_id, 10),
        college_id: selectedSchool,
        is_active: formData.is_active,
      };

      // Add password only if provided (for new users or password change)
      if (formData.password) {
        payload.password = formData.password;
      }

      console.log('Submitting user creation with payload:', payload);

      let response;
      if (editingUser) {
        // For now, we'll only support creating users, not editing
        setError('Editing users is not yet supported');
        return;
      } else {
        response = await apiService.post('/users/', payload);
      }

      console.log('User creation response:', response.data);

      setSuccess(true);
      setSuccessMessage(editingUser ? 'User updated successfully' : 'User created successfully');
      setTimeout(() => setSuccess(false), 3000);

      handleCloseDialog();
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
      const errorMsg = err.response?.data?.message || 'Failed to save user';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await apiService.post(`/users/${userId}/toggle_status/`);
      setSuccess(true);
      setSuccessMessage(`User ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      setTimeout(() => setSuccess(false), 3000);
      fetchUsers();
    } catch (err) {
      console.error('Error toggling user status:', err);
      setError('Failed to update user status');
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleNameById = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Header Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon sx={{ fontSize: 32, color: '#667eea' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {t('manageUser') || 'Manage Users'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create and manage users, assign roles, and control access
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Create User
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Total Users
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {users.length}
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Active Users
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {users.filter(u => u.is_active).length}
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Inactive Users
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {users.filter(u => !u.is_active).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      {/* Search Bar */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search users by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* Users Table */}
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ fontWeight: '500' }}>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role || 'No Role'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.is_active ? 'Active' : 'Inactive'}
                        size="small"
                        color={user.is_active ? 'success' : 'error'}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={user.is_active ? 'Deactivate' : 'Activate'}>
                        <IconButton
                          size="small"
                          color={user.is_active ? 'primary' : 'error'}
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                        >
                          {user.is_active ? <ToggleOnIcon /> : <ToggleOffIcon />}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create/Edit User Dialog */}
      <Dialog open={formDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockIcon color="primary" />
          {editingUser ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              size="small"
              required
              disabled={!!editingUser}
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              size="small"
              required
              disabled={!!editingUser}
            />
            {!editingUser && (
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                size="small"
                required
              />
            )}
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              size="small"
            />
            <FormControl fullWidth size="small" required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role_id"
                value={formData.role_id}
                onChange={handleSelectChange}
                label="Role"
              >
                <MenuItem value="">Select a role</MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUser;
