import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  TablePagination,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const ManageSuperAdmin = () => {
  const { t } = useTranslation();
  const [superAdmins, setSuperAdmins] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuperAdmins();
  }, []);

  const fetchSuperAdmins = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/users/?role=superadmin');
      const usersData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setSuperAdmins(usersData);
    } catch (error) {
      console.error('Error fetching super admins:', error);
      setSuperAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedSuperAdmin(user);
    setEditFormData({
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      password: '',
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedSuperAdmin(user);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const updateData = {
        username: editFormData.username,
        email: editFormData.email,
        first_name: editFormData.first_name,
        last_name: editFormData.last_name,
      };
      if (editFormData.password) {
        updateData.password = editFormData.password;
      }
      await apiService.put(`/users/${selectedSuperAdmin.id}/`, updateData);
      setEditDialogOpen(false);
      fetchSuperAdmins();
    } catch (error) {
      console.error('Error updating super admin:', error);
      alert(t('errorUpdatingUser') || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiService.delete(`/users/${selectedSuperAdmin.id}/`);
      setDeleteDialogOpen(false);
      fetchSuperAdmins();
    } catch (error) {
      console.error('Error deleting super admin:', error);
      alert(t('errorDeletingUser') || 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuperAdmin = async () => {
    if (!editFormData.password) {
      alert(t('passwordRequired') || 'Password is required');
      return;
    }
    try {
      setLoading(true);
      await apiService.post('/users/', {
        ...editFormData,
        role: 'superadmin',
      });
      setAddDialogOpen(false);
      setEditFormData({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      });
      fetchSuperAdmins();
    } catch (error) {
      console.error('Error adding super admin:', error);
      alert(t('errorAddingUser') || 'Error adding user');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuperAdmins = superAdmins.filter(user =>
    (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.first_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSuperAdmins = filteredSuperAdmins.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('manageSuperAdmin') || 'Manage Super Admin'}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => {
          setEditFormData({
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
          });
          setAddDialogOpen(true);
        }}>
          {t('addSuperAdmin') || 'Add Super Admin'}
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder={t('search') || 'Search...'}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ p: 2, '& .MuiOutlinedInput-root': { border: 'none' } }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600 }}>{t('username') || 'Username'}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('email') || 'Email'}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('name') || 'Name'}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">{t('action') || 'Action'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSuperAdmins.length > 0 ? (
              paginatedSuperAdmins.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? t('active') || 'Active' : t('inactive') || 'Inactive'}
                      color={user.is_active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(user)}
                      disabled={loading}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
                      disabled={loading}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  {t('noData') || 'No data found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredSuperAdmins.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('editUser') || 'Edit User'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label={t('username') || 'Username'}
            value={editFormData.username}
            onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('email') || 'Email'}
            type="email"
            value={editFormData.email}
            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('firstName') || 'First Name'}
            value={editFormData.first_name}
            onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('lastName') || 'Last Name'}
            value={editFormData.last_name}
            onChange={(e) => setEditFormData({ ...editFormData, last_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('password') || 'Password (leave blank to keep current)'}
            type="password"
            value={editFormData.password}
            onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary" disabled={loading}>
            {t('save') || 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('addSuperAdmin') || 'Add Super Admin'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label={t('username') || 'Username'}
            value={editFormData.username}
            onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('email') || 'Email'}
            type="email"
            value={editFormData.email}
            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('firstName') || 'First Name'}
            value={editFormData.first_name}
            onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('lastName') || 'Last Name'}
            value={editFormData.last_name}
            onChange={(e) => setEditFormData({ ...editFormData, last_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('password') || 'Password'}
            type="password"
            value={editFormData.password}
            onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleAddSuperAdmin} variant="contained" color="primary" disabled={loading}>
            {t('add') || 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t('confirmDelete') || 'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('deleteConfirmationMessage') || 'Are you sure you want to delete this user?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleDelete} variant="contained" color="error" disabled={loading}>
            {t('delete') || 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSuperAdmin;
