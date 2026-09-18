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
  IconButton,
  Chip,
} from '@mui/material';
import { Search as SearchIcon, Visibility as ViewIcon, VisibilityOff as HideIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const UserCredential = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [credentialDialogOpen, setCredentialDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleViewCredentials = (user) => {
    setSelectedUser(user);
    setShowPassword(false);
    setCredentialDialogOpen(true);
    setErrorMessage('');
  };

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${field} copied to clipboard!`);
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const filteredUsers = users.filter(user =>
    (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.first_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        {t('userCredential') || 'User Credentials'}
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        {t('credentialWarning') || 'View and manage user login credentials. Handle with care!'}
      </Alert>

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
                        startIcon={<ViewIcon />}
                        onClick={() => handleViewCredentials(user)}
                        disabled={loading}
                      >
                        {t('view') || 'View'}
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

      {/* View Credentials Dialog */}
      <Dialog open={credentialDialogOpen} onClose={() => setCredentialDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userCredentials') || 'User Credentials'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {t('credentialSecurityWarning') || 'Keep these credentials secure and confidential!'}
          </Alert>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
            {t('userDetails') || 'User Details'}
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="textSecondary">
                {t('username') || 'Username'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedUser?.username}
                </Typography>
                <Button
                  size="small"
                  onClick={() => handleCopyToClipboard(selectedUser?.username, 'Username')}
                >
                  {t('copy') || 'Copy'}
                </Button>
              </Box>
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="textSecondary">
                {t('email') || 'Email'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedUser?.email}
                </Typography>
                <Button
                  size="small"
                  onClick={() => handleCopyToClipboard(selectedUser?.email, 'Email')}
                >
                  {t('copy') || 'Copy'}
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary">
                {t('name') || 'Name'}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {`${selectedUser?.first_name} ${selectedUser?.last_name}`}
              </Typography>
            </Box>
          </Paper>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            {t('loginCredentials') || 'Login Credentials'}
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
              {t('usernameForLogin') || 'Username for login'}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
              {selectedUser?.username}
            </Typography>

            <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
              {t('password') || 'Password'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                {showPassword ? '••••••••' : '••••••••'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HideIcon /> : <ViewIcon />}
              </IconButton>
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
              {t('passwordNote') || 'Password cannot be displayed. Use "Reset User Password" option to change password.'}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCredentialDialogOpen(false)}>{t('close') || 'Close'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserCredential;
