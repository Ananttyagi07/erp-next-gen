import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
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
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const BackupDatabase = () => {
  const { t } = useTranslation();
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin/backups/');
      const backupsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setBackups(backupsData);
    } catch (error) {
      console.error('Error fetching backups:', error);
      setErrorMessage(t('errorFetchingBackups') || 'Error fetching backups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setCreatingBackup(true);
      setBackupProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setBackupProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 500);

      const response = await apiService.post('/admin/backups/create/', {});

      clearInterval(progressInterval);
      setBackupProgress(100);

      setSuccessMessage(t('backupCreatedSuccess') || 'Backup created successfully');
      setTimeout(() => setSuccessMessage(''), 3000);

      fetchBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
      setErrorMessage(t('errorCreatingBackup') || 'Error creating backup');
    } finally {
      setCreatingBackup(false);
      setBackupProgress(0);
    }
  };

  const handleDownloadBackup = async (backup) => {
    try {
      const response = await apiService.get(`/admin/backups/${backup.id}/download/`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `backup_${backup.id}.sql`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading backup:', error);
      setErrorMessage(t('errorDownloadingBackup') || 'Error downloading backup');
    }
  };

  const handleDeleteClick = (backup) => {
    setSelectedBackup(backup);
    setDeleteDialogOpen(true);
  };

  const handleDeleteBackup = async () => {
    try {
      setLoading(true);
      await apiService.delete(`/admin/backups/${selectedBackup.id}/`);
      setDeleteDialogOpen(false);
      setSuccessMessage(t('backupDeletedSuccess') || 'Backup deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchBackups();
    } catch (error) {
      console.error('Error deleting backup:', error);
      setErrorMessage(t('errorDeletingBackup') || 'Error deleting backup');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        {t('backupDatabase') || 'Database Backup'}
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      {/* Backup Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('totalBackups') || 'Total Backups'}
              </Typography>
              <Typography variant="h5">{backups.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('lastBackup') || 'Last Backup'}
              </Typography>
              <Typography variant="body2">
                {backups.length > 0 ? formatDate(backups[0].created_at) : t('noBackup') || 'No backup'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('totalSize') || 'Total Size'}
              </Typography>
              <Typography variant="body2">
                {formatBytes(backups.reduce((sum, b) => sum + (b.size || 0), 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<UploadIcon />}
                onClick={handleCreateBackup}
                disabled={creatingBackup || loading}
              >
                {t('createBackup') || 'Create Backup'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {creatingBackup && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t('creatingBackup') || 'Creating backup...'}
          </Typography>
          <LinearProgress variant="determinate" value={backupProgress} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            {backupProgress}%
          </Typography>
        </Paper>
      )}

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {t('backupHistory') || 'Backup History'}
      </Typography>

      {loading && !backups.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>{t('backupId') || 'Backup ID'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('createdAt') || 'Created At'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('size') || 'Size'}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('action') || 'Action'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backups.length > 0 ? (
                backups.map((backup) => (
                  <TableRow key={backup.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {backup.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(backup.created_at)}</TableCell>
                    <TableCell>{formatBytes(backup.size || 0)}</TableCell>
                    <TableCell>
                      <Chip
                        label={backup.status || 'Completed'}
                        color={backup.status === 'failed' ? 'error' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadBackup(backup)}
                        disabled={loading}
                        sx={{ mr: 1 }}
                      >
                        {t('download') || 'Download'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(backup)}
                        disabled={loading}
                      >
                        {t('delete') || 'Delete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    {t('noBackup') || 'No backups found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t('confirmDelete') || 'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('deleteBackupConfirmation') || 'Are you sure you want to delete this backup?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel') || 'Cancel'}</Button>
          <Button onClick={handleDeleteBackup} variant="contained" color="error" disabled={loading}>
            {t('delete') || 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BackupDatabase;
