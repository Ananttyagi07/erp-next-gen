import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  Chip,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import axiosInstance from '../../services/api';

const LanguageManagement = () => {
  const [languages, setLanguages] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    is_active: true,
    is_default: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin-settings/languages/', {
        params: {
          page: 1,
          page_size: 10
        }
      });
      if (response.data.success) {
        setLanguages(response.data.data);
      } else {
        showSnackbar(response.data.message || 'Failed to fetch languages', 'error');
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
      showSnackbar(error.response?.data?.message || error.message || 'Failed to fetch languages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (language = null) => {
    if (language) {
      setEditingLanguage(language);
      setFormData({
        name: language.name,
        code: language.code,
        is_active: language.is_active,
        is_default: language.is_default,
      });
    } else {
      setEditingLanguage(null);
      setFormData({
        name: '',
        code: '',
        is_active: true,
        is_default: false,
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingLanguage(null);
    setFormData({
      name: '',
      code: '',
      is_active: true,
      is_default: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingLanguage) {
        await axiosInstance.put(`/admin-settings/languages/${editingLanguage.id}/`, formData);
        showSnackbar('Language updated successfully', 'success');
      } else {
        await axiosInstance.post('/admin-settings/languages/', formData);
        showSnackbar('Language added successfully', 'success');
      }
      fetchLanguages();
      handleCloseDialog();
    } catch (error) {
      showSnackbar('Error saving language', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (languageId) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/admin-settings/languages/${languageId}/`);
        showSnackbar('Language deleted successfully', 'success');
        fetchLanguages();
      } catch (error) {
        showSnackbar('Error deleting language', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleActive = async (language) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/admin-settings/languages/${language.id}/`, {
        is_active: !language.is_active,
      });
      showSnackbar(`Language ${!language.is_active ? 'activated' : 'deactivated'} successfully`, 'success');
      fetchLanguages();
    } catch (error) {
      showSnackbar('Error updating language status', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (language) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/admin-settings/languages/${language.id}/`, {
        is_default: true,
      });
      showSnackbar('Default language updated successfully', 'success');
      fetchLanguages();
    } catch (error) {
      showSnackbar('Error setting default language', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon />
          Language Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Language
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Default</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {languages.map((language) => (
                      <TableRow key={language.id}>
                        <TableCell>{language.name}</TableCell>
                        <TableCell>{language.code}</TableCell>
                        <TableCell>
                          <Chip
                            label={language.is_active ? 'Active' : 'Inactive'}
                            color={language.is_active ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {language.is_default && (
                            <Chip label="Default" color="primary" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(language)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleActive(language)}
                            color={language.is_active ? 'warning' : 'success'}
                          >
                            {language.is_active ? 'Deactivate' : 'Activate'}
                          </IconButton>
                          {!language.is_default && (
                            <IconButton
                              size="small"
                              onClick={() => handleSetDefault(language)}
                              color="secondary"
                            >
                              Set Default
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(language.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingLanguage ? 'Edit Language' : 'Add Language'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Language Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Language Code"
              fullWidth
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              helperText="e.g., en, es, fr"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value })}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Set as Default</InputLabel>
              <Select
                value={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.value })}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {editingLanguage ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LanguageManagement;
