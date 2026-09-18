import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment, MenuItem, Chip, Alert, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import apiService from '../services/apiService';
import { useSchool } from '../context/useSchool';

const Announcements = () => {
  const { selectedSchool } = useSchool();
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '', content: '', date: '', priority: '', status: ''
  });

  // Load announcements when school changes
  useEffect(() => {
    loadAnnouncements();
  }, [selectedSchool]);

  useEffect(() => {
    const filtered = announcements.filter(announcement =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnnouncements(filtered);
  }, [searchTerm, announcements]);

  const loadAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('/announcement/notices/');
      const announcementsData = response.data?.data || response.data || [];
      setAnnouncements(Array.isArray(announcementsData) ? announcementsData : []);
      console.log('[Announcements] Data loaded:', announcementsData);
    } catch (err) {
      console.error('[Announcements] Error loading announcements:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load announcements');
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (announcement = null) => {
    if (announcement) {
      setCurrentAnnouncement(announcement);
      setFormData(announcement);
    } else {
      setCurrentAnnouncement(null);
      setFormData({ title: '', content: '', date: '', priority: '', status: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAnnouncement(null);
    setFormData({ title: '', content: '', date: '', priority: '', status: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.date || !formData.priority || !formData.status) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      if (currentAnnouncement) {
        await apiService.put(`/announcement/notices/${currentAnnouncement.id}/`, formData);
      } else {
        await apiService.post('/announcement/notices/', formData);
      }
      await loadAnnouncements();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save announcement');
      console.error('[Announcements] Error saving:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setLoading(true);
      try {
        await apiService.delete(`/announcement/notices/${id}/`);
        await loadAnnouncements();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete announcement');
        console.error('[Announcements] Error deleting:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Announcements</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} disabled={loading}>
          Add Announcement
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
            placeholder="Search by title or content..."
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
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Content</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAnnouncements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No announcements found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAnnouncements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell>{announcement.title}</TableCell>
                      <TableCell>{announcement.content}</TableCell>
                      <TableCell>{announcement.date}</TableCell>
                      <TableCell>
                        <Chip label={announcement.priority} color={getPriorityColor(announcement.priority)} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={announcement.status} color={getStatusColor(announcement.status)} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenDialog(announcement)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(announcement.id)}>
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
            count={filteredAnnouncements.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            name="content"
            multiline
            rows={3}
            value={formData.content}
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
            label="Priority"
            name="priority"
            select
            value={formData.priority}
            onChange={handleInputChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Status"
            name="status"
            select
            value={formData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentAnnouncement ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Announcements;
