import { useState, useEffect } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, IconButton, TextField, Grid, Alert, CircularProgress, TablePagination, InputAdornment, Chip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const Hostel = () => {
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
    studentId: '',
    roomNo: '',
    block: '',
    bedNo: '',
    checkInDate: new Date().toISOString().split('T')[0],
    fees: '',
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
          { id: 1, studentId: 'STU001', roomNo: '101', block: 'A', bedNo: '1', checkInDate: '2024-01-15', fees: '5000', status: 'active' },
          { id: 2, studentId: 'STU002', roomNo: '102', block: 'A', bedNo: '2', checkInDate: '2024-01-20', fees: '5000', status: 'active' },
          { id: 3, studentId: 'STU003', roomNo: '201', block: 'B', bedNo: '1', checkInDate: '2024-02-01', fees: '5500', status: 'active' },
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
      setFormData({ id: item.id, studentId: item.studentId, roomNo: item.roomNo, block: item.block, bedNo: item.bedNo, checkInDate: item.checkInDate, fees: item.fees });
    } else {
      setEditingItem(null);
      setFormData({ id: '', studentId: '', roomNo: '', block: '', bedNo: '', checkInDate: new Date().toISOString().split('T')[0], fees: '' });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ id: '', studentId: '', roomNo: '', block: '', bedNo: '', checkInDate: new Date().toISOString().split('T')[0], fees: '' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.roomNo.trim()) errors.roomNo = 'Room number is required';
    if (!formData.block.trim()) errors.block = 'Block is required';
    if (!formData.bedNo.trim()) errors.bedNo = 'Bed number is required';
    if (!formData.fees || isNaN(formData.fees) || parseFloat(formData.fees) <= 0) errors.fees = 'Fees must be positive';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editingItem) {
        setItems(items.map(item => item.id === editingItem.id ? { ...formData, id: item.id, status: 'active' } : item));
      } else {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { ...formData, id: newId, status: 'active' }]);
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

  const filteredItems = items.filter(item => item.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedItems = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>Hostel Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Allocation</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField fullWidth placeholder="Search by student ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
      </Paper>

      <TableContainer component={Paper}>
        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box> : (
          <>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Student ID</strong></TableCell>
                  <TableCell><strong>Block</strong></TableCell>
                  <TableCell><strong>Room</strong></TableCell>
                  <TableCell><strong>Bed</strong></TableCell>
                  <TableCell><strong>Check-In</strong></TableCell>
                  <TableCell><strong>Fees</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? paginatedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell>{item.block}</TableCell>
                    <TableCell>{item.roomNo}</TableCell>
                    <TableCell>{item.bedNo}</TableCell>
                    <TableCell>{item.checkInDate}</TableCell>
                    <TableCell>₹{item.fees}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={7} align="center" sx={{ py: 3 }}>No allocations found</TableCell></TableRow>}
              </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredItems.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
          </>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>{editingItem ? 'Edit Allocation' : 'Add New Allocation'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField fullWidth label="Student ID" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} error={Boolean(formErrors.studentId)} helperText={formErrors.studentId} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Block" value={formData.block} onChange={(e) => setFormData({ ...formData, block: e.target.value })} error={Boolean(formErrors.block)} helperText={formErrors.block} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Room Number" value={formData.roomNo} onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })} error={Boolean(formErrors.roomNo)} helperText={formErrors.roomNo} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Bed Number" value={formData.bedNo} onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })} error={Boolean(formErrors.bedNo)} helperText={formErrors.bedNo} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Check-In Date" type="date" value={formData.checkInDate} onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Monthly Fees" type="number" value={formData.fees} onChange={(e) => setFormData({ ...formData, fees: e.target.value })} error={Boolean(formErrors.fees)} helperText={formErrors.fees} /></Grid>
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

export default Hostel;
