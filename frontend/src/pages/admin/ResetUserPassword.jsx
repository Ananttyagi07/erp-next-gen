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
import { Search as SearchIcon, RestartAlt as ResetIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const ResetUserPassword = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleResetClick = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setResetDialogOpen(true);
    setErrorMessage('');
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage(t('allFieldsRequired') || 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(t('passwordsNotMatch') || 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage(t('passwordTooShort') || 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await apiService.put(`/users/${selectedUser.id}/password/`, {
        password: newPassword,
      });
      setSuccessMessage(t('passwordResetSuccess') || 'Password reset successfully');
      setResetDialogOpen(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage(t('errorResettingPassword') || 'Error resetting password');
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
        {t('resetUserPassword') || 'Reset User Password'}
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
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>
                      <Chip label={user.role || 'User'} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ResetIcon />}
                        onClick={() => handleResetClick(user)}
                        disabled={loading}
                      >
                        {t('reset') || 'Reset'}
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

      {/* Reset Password Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('resetPassword') || 'Reset Password'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {t('resetPasswordFor') || 'Reset password for'}: <strong>{selectedUser?.username}</strong>
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <TextField
            fullWidth
            label={t('newPassword') || 'New Password'}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label={t('confirmPassword') || 'Confirm Password'}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="dense"
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {t('passwordRequirements') || 'Password must be at least 6 characters long'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleResetPassword} variant="contained" color="primary" disabled={loading}>
            {t('resetPassword') || 'Reset Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResetUserPassword;
