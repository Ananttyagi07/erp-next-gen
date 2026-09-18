import { useState, useEffect } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, IconButton, TextField, Grid, Alert, CircularProgress, TablePagination, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const TimeTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    className: '',
    subject: '',
    teacher: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const mockData = [
          { id: 1, className: '10-A', subject: 'Mathematics', teacher: 'Mr. Smith', day: 'Monday', startTime: '09:00', endTime: '10:00', room: '101' },
          { id: 2, className: '10-A', subject: 'English', teacher: 'Ms. Johnson', day: 'Monday', startTime: '10:15', endTime: '11:15', room: '102' },
          { id: 3, className: '10-A', subject: 'Physics', teacher: 'Mr. Brown', day: 'Tuesday', startTime: '09:00', endTime: '10:00', room: '201' },
          { id: 4, className: '10-B', subject: 'Mathematics', teacher: 'Mr. White', day: 'Monday', startTime: '11:30', endTime: '12:30', room: '103' },
          { id: 5, className: '10-B', subject: 'Chemistry', teacher: 'Dr. Lee', day: 'Wednesday', startTime: '09:00', endTime: '10:00', room: '202' },
        ];
        setItems(mockData);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ id: item.id, className: item.className, subject: item.subject, teacher: item.teacher, day: item.day, startTime: item.startTime, endTime: item.endTime, room: item.room });
    } else {
      setEditingItem(null);
      setFormData({ id: '', className: '', subject: '', teacher: '', day: 'Monday', startTime: '09:00', endTime: '10:00', room: '' });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ id: '', className: '', subject: '', teacher: '', day: 'Monday', startTime: '09:00', endTime: '10:00', room: '' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.className.trim()) errors.className = 'Class is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.teacher.trim()) errors.teacher = 'Teacher is required';
    if (!formData.room.trim()) errors.room = 'Room is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editingItem) {
        setItems(items.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item));
      } else {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { ...formData, id: newId }]);
      }
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const filteredItems = items.filter(item => item.className.toLowerCase().includes(searchTerm.toLowerCase()) || item.subject.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedItems = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>Time Table Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Schedule</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField fullWidth placeholder="Search by class or subject..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
      </Paper>

      <TableContainer component={Paper}>
        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box> : (
          <>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Class</strong></TableCell>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell><strong>Teacher</strong></TableCell>
                  <TableCell><strong>Day</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Room</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? paginatedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.className}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.day}</TableCell>
                    <TableCell>{item.startTime} - {item.endTime}</TableCell>
                    <TableCell>{item.room}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={7} align="center" sx={{ py: 3 }}>No schedules found</TableCell></TableRow>}
              </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredItems.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
          </>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>{editingItem ? 'Edit Schedule' : 'Add New Schedule'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Class" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} error={Boolean(formErrors.className)} helperText={formErrors.className} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} error={Boolean(formErrors.subject)} helperText={formErrors.subject} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Teacher Name" value={formData.teacher} onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} error={Boolean(formErrors.teacher)} helperText={formErrors.teacher} /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Day</InputLabel>
                <Select value={formData.day} label="Day" onChange={(e) => setFormData({ ...formData, day: e.target.value })}>
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Start Time" type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="End Time" type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Room Number" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} error={Boolean(formErrors.room)} helperText={formErrors.room} /></Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading}>{loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default TimeTable;
