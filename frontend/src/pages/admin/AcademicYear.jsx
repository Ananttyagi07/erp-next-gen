import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const AcademicYear = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    start_date: '',
    end_date: '',
    is_active: false,
    description: ''
  });

  useEffect(() => {
    fetchAcademicYears();
  }, [page, pageSize]);

  const fetchAcademicYears = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/academic-years/', {
        params: { page, page_size: pageSize }
      });
      if (response.data.success) {
        setAcademicYears(response.data.data);
        setTotalPages(response.data.pagination?.pages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load academic years');
      console.error('Error fetching academic years:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (year = null) => {
    if (year) {
      setEditingId(year.id);
      setFormData(year);
    } else {
      setEditingId(null);
      setFormData({
        year: '',
        start_date: '',
        end_date: '',
        is_active: false,
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      if (editingId) {
        const response = await apiService.patch(`/admin-settings/academic-years/${editingId}/`, formData);
        if (response.data.success || response.status === 200) {
          setSuccess(true);
        }
      } else {
        const response = await apiService.post('/admin-settings/academic-years/', formData);
        if (response.data.success || response.status === 201) {
          setSuccess(true);
        }
      }

      setTimeout(() => {
        setSuccess(false);
        handleCloseDialog();
        fetchAcademicYears();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save academic year');
      console.error('Error saving academic year:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this academic year?')) return;

    try {
      setError(null);
      await apiService.delete(`/admin-settings/academic-years/${id}/`);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        fetchAcademicYears();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete academic year');
      console.error('Error deleting academic year:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader
          title="Academic Years"
          subheader="Manage academic years and their date ranges"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
            >
              Add Academic Year
            </Button>
          }
        />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Operation completed successfully!</Alert>}

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Year</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {academicYears.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No academic years found
                  </TableCell>
                </TableRow>
              ) : (
                academicYears.map((year) => (
                  <TableRow key={year.id}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{year.year}</TableCell>
                    <TableCell>{new Date(year.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(year.end_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {year.is_active ? (
                        <Typography color="success.main" variant="body2">✓ Active</Typography>
                      ) : (
                        <Typography color="text.secondary" variant="body2">Inactive</Typography>
                      )}
                    </TableCell>
                    <TableCell>{year.description?.substring(0, 30)}...</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(year)}
                        title="Edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(year.id)}
                        title="Delete"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {page} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Academic Year' : 'Add Academic Year'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2023-2024"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                }
                label="Set as Active Academic Year"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AcademicYear;
