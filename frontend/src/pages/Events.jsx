import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment, Alert, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import apiService from '../services/apiService';
import { useSchool } from '../context/useSchool';

const Events = () => {
  const { selectedSchool } = useSchool();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '', date: '', location: '', capacity: '', organizer: ''
  });

  // Load events when school changes
  useEffect(() => {
    loadEvents();
  }, [selectedSchool]);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('/event/events/');
      const eventsData = response.data?.data || response.data || [];
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      console.log('[Events] Data loaded:', eventsData);
    } catch (err) {
      console.error('[Events] Error loading events:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event = null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData(event);
    } else {
      setCurrentEvent(null);
      setFormData({ name: '', date: '', location: '', capacity: '', organizer: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEvent(null);
    setFormData({ name: '', date: '', location: '', capacity: '', organizer: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.date || !formData.location || !formData.capacity || !formData.organizer) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      if (currentEvent) {
        await apiService.put(`/event/events/${currentEvent.id}/`, formData);
      } else {
        await apiService.post('/event/events/', formData);
      }
      await loadEvents();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
      console.error('[Events] Error saving:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        await apiService.delete(`/event/events/${id}/`);
        await loadEvents();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete event');
        console.error('[Events] Error deleting:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#000' }}>Events Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} disabled={loading}>
          Add Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <>
          <TextField
            fullWidth
            placeholder="Search by event name, location or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Event Name</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Capacity</strong></TableCell>
                  <TableCell><strong>Organizer</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No events found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.capacity}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenDialog(event)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(event.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredEvents.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Event Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentEvent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;
