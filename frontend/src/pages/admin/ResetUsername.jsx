import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search as SearchIcon, Edit as EditIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const ResetUsername = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/users/');
      const usersData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage(t('errorFetchingUsers') || 'Error fetching users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewUsername(user.username || '');
    setResetDialogOpen(true);
    setErrorMessage('');
  };

  const handleResetUsername = async () => {
    if (!newUsername) {
      setErrorMessage(t('usernameRequired') || 'Username is required');
      return;
    }

    if (newUsername === selectedUser.username) {
      setErrorMessage(t('usernameNotChanged') || 'Username is the same as current');
      return;
    }

    if (newUsername.length < 3) {
      setErrorMessage(t('usernameTooShort') || 'Username must be at least 3 characters');
      return;
    }

    try {
      setLoading(true);
      await apiService.put(`/users/${selectedUser.id}/`, {
        username: newUsername,
      });
      setSuccessMessage(t('usernameResetSuccess') || 'Username updated successfully');
      setResetDialogOpen(false);
      fetchUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating username:', error);
      if (error.response?.data?.username) {
        setErrorMessage(error.response.data.username[0]);
      } else {
        setErrorMessage(t('errorUpdatingUsername') || 'Error updating username');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.first_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        {t('resetUsername') || 'Reset Username'}
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder={t('searchUser') || 'Search users...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {loading && !users.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>{t('username') || 'Username'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('email') || 'Email'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('name') || 'Name'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('action') || 'Action'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>
                      <Chip label={user.role || 'User'} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(user)}
                        disabled={loading}
                      >
                        {t('edit') || 'Edit'}
                      </Button>
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
      )}

      {/* Edit Username Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('editUsername') || 'Edit Username'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {t('currentUsername') || 'Current username'}: <strong>{selectedUser?.username}</strong>
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <TextField
            fullWidth
            label={t('newUsername') || 'New Username'}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            margin="dense"
            placeholder="Enter new username"
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {t('usernameRequirements') || 'Username must be at least 3 characters long'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleResetUsername} variant="contained" color="primary" disabled={loading}>
            {t('update') || 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResetUsername;
