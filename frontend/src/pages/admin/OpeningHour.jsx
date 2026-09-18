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

const OpeningHour = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openingHours, setOpeningHours] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    day: 'monday',
    opening_time: '09:00',
    closing_time: '17:00',
    is_holiday: false,
    remarks: ''
  });

  const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const dayLabels = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday'
  };

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  const fetchOpeningHours = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/opening-hours/');
      if (response.data.success) {
        setOpeningHours(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load opening hours');
      console.error('Error fetching opening hours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (hour = null) => {
    if (hour) {
      setEditingId(hour.id);
      setFormData(hour);
    } else {
      setEditingId(null);
      setFormData({
        day: 'monday',
        opening_time: '09:00',
        closing_time: '17:00',
        is_holiday: false,
        remarks: ''
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
        const response = await apiService.patch(`/admin-settings/opening-hours/${editingId}/`, formData);
        if (response.data.success || response.status === 200) {
          setSuccess(true);
        }
      } else {
        const response = await apiService.post('/admin-settings/opening-hours/', formData);
        if (response.data.success || response.status === 201) {
          setSuccess(true);
        }
      }

      setTimeout(() => {
        setSuccess(false);
        handleCloseDialog();
        fetchOpeningHours();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save opening hours');
      console.error('Error saving opening hours:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opening hour entry?')) return;

    try {
      setError(null);
      await apiService.delete(`/admin-settings/opening-hours/${id}/`);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        fetchOpeningHours();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete opening hour');
      console.error('Error deleting opening hour:', err);
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
          title="Opening Hours"
          subheader="Manage school opening and closing times for each day"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
            >
              Add/Edit Hours
            </Button>
          }
        />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Operation completed successfully!</Alert>}

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Day</TableCell>
                <TableCell>Opening Time</TableCell>
                <TableCell>Closing Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {openingHours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No opening hours configured
                  </TableCell>
                </TableRow>
              ) : (
                openingHours.map((hour) => (
                  <TableRow key={hour.id}>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {dayLabels[hour.day] || hour.day}
                    </TableCell>
                    <TableCell>
                      {hour.is_holiday ? (
                        <Typography color="error" variant="body2">-</Typography>
                      ) : (
                        hour.opening_time
                      )}
                    </TableCell>
                    <TableCell>
                      {hour.is_holiday ? (
                        <Typography color="error" variant="body2">-</Typography>
                      ) : (
                        hour.closing_time
                      )}
                    </TableCell>
                    <TableCell>
                      {hour.is_holiday ? (
                        <Typography color="error" sx={{ fontWeight: 500 }}>Holiday</Typography>
                      ) : (
                        <Typography color="success.main" sx={{ fontWeight: 500 }}>Open</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{hour.remarks || '-'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(hour)}
                        title="Edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(hour.id)}
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
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Opening Hours' : 'Add/Edit Opening Hours'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Day of Week"
                name="day"
                value={formData.day}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>
                    {dayLabels[day]}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="is_holiday"
                    checked={formData.is_holiday}
                    onChange={handleChange}
                  />
                }
                label="Mark as Holiday (School Closed)"
              />
            </Grid>

            {!formData.is_holiday && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Opening Time"
                    name="opening_time"
                    type="time"
                    value={formData.opening_time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Closing Time"
                    name="closing_time"
                    type="time"
                    value={formData.closing_time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks (Optional)"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="e.g., Early closing on Fridays, Special hours during exams"
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

export default OpeningHour;
