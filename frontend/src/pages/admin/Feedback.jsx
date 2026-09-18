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
  Chip,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    feedback_type: 'bug',
    status: 'pending',
    priority: 'medium',
    assigned_to: '',
    resolution_notes: ''
  });

  useEffect(() => {
    fetchFeedbacks();
  }, [page, pageSize, statusFilter]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const params = { page, page_size: pageSize };
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await apiService.get('/admin-settings/feedback/', { params });
      if (response.data.success) {
        setFeedbacks(response.data.data);
        setTotalPages(response.data.pagination?.pages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load feedback');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (feedback = null, view = false) => {
    if (feedback) {
      setEditingId(feedback.id);
      setFormData(feedback);
      setViewMode(view);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        feedback_type: 'bug',
        status: 'pending',
        priority: 'medium',
        assigned_to: '',
        resolution_notes: ''
      });
      setViewMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setViewMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      if (editingId) {
        const response = await apiService.patch(`/admin-settings/feedback/${editingId}/`, formData);
        if (response.data.success || response.status === 200) {
          setSuccess(true);
        }
      }

      setTimeout(() => {
        setSuccess(false);
        handleCloseDialog();
        fetchFeedbacks();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save feedback');
      console.error('Error saving feedback:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      setError(null);
      await apiService.delete(`/admin-settings/feedback/${id}/`);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        fetchFeedbacks();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete feedback');
      console.error('Error deleting feedback:', err);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'bug': 'error',
      'feature': 'primary',
      'improvement': 'info',
      'complaint': 'warning',
      'praise': 'success'
    };
    return colors[type] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'in_progress': 'info',
      'resolved': 'success',
      'rejected': 'error'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'success',
      'medium': 'warning',
      'high': 'error'
    };
    return colors[priority] || 'default';
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
          title="Manage Feedback"
          subheader="Review and manage user feedback"
        />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Operation completed successfully!</Alert>}

          {/* Filter Section */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              select
              SelectProps={{
                native: true,
              }}
              size="small"
              sx={{ minWidth: '200px' }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </TextField>
            <Button
              variant="outlined"
              onClick={() => {
                setStatusFilter('');
                setPage(1);
              }}
            >
              Clear Filter
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No feedback found
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {feedback.title?.substring(0, 40)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.feedback_type}
                        color={getTypeColor(feedback.feedback_type)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.status}
                        color={getStatusColor(feedback.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback.priority}
                        color={getPriorityColor(feedback.priority)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {feedback.user_name || feedback.user || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(feedback, true)}
                        title="View"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(feedback)}
                        title="Edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(feedback.id)}
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
          <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center' }}>
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

      {/* View/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {viewMode ? 'View Feedback' : editingId ? 'Edit Feedback' : 'Add Feedback'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={viewMode}
                required
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
                disabled={viewMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type"
                name="feedback_type"
                value={formData.feedback_type}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
                disabled={viewMode}
              >
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement</option>
                <option value="complaint">Complaint</option>
                <option value="praise">Praise</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
                disabled={viewMode}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
                disabled={viewMode}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assigned To"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                disabled={viewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resolution Notes"
                name="resolution_notes"
                value={formData.resolution_notes}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={viewMode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>
            {viewMode ? 'Close' : 'Cancel'}
          </Button>
          {!viewMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feedback;
