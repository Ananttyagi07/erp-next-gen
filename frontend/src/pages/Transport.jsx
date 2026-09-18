import { useState, useEffect } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, IconButton, TextField, Grid, Alert, CircularProgress, TablePagination, InputAdornment } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const Transport = () => {
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
    vehicleNo: '',
    routeName: '',
    pickupPoint: '',
    dropPoint: '',
    fee: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setItems([
          { id: 1, studentId: 'STU001', vehicleNo: 'MH01AB1234', routeName: 'Route A', pickupPoint: 'City Center', dropPoint: 'School Gate', fee: '2000' },
          { id: 2, studentId: 'STU002', vehicleNo: 'MH01AB1235', routeName: 'Route B', pickupPoint: 'North Zone', dropPoint: 'School Gate', fee: '2500' },
          { id: 3, studentId: 'STU003', vehicleNo: 'MH01AB1236', routeName: 'Route C', pickupPoint: 'South Zone', dropPoint: 'School Gate', fee: '2000' },
        ]);
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
      setFormData({ id: item.id, studentId: item.studentId, vehicleNo: item.vehicleNo, routeName: item.routeName, pickupPoint: item.pickupPoint, dropPoint: item.dropPoint, fee: item.fee });
    } else {
      setEditingItem(null);
      setFormData({ id: '', studentId: '', vehicleNo: '', routeName: '', pickupPoint: '', dropPoint: '', fee: '' });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ id: '', studentId: '', vehicleNo: '', routeName: '', pickupPoint: '', dropPoint: '', fee: '' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.vehicleNo.trim()) errors.vehicleNo = 'Vehicle number is required';
    if (!formData.routeName.trim()) errors.routeName = 'Route name is required';
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

  const filteredItems = items.filter(item => item.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedItems = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>Transport Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Transport</Button>
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
                  <TableCell><strong>Vehicle</strong></TableCell>
                  <TableCell><strong>Route</strong></TableCell>
                  <TableCell><strong>Pickup</strong></TableCell>
                  <TableCell><strong>Dropoff</strong></TableCell>
                  <TableCell><strong>Fee</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? paginatedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell>{item.vehicleNo}</TableCell>
                    <TableCell>{item.routeName}</TableCell>
                    <TableCell>{item.pickupPoint}</TableCell>
                    <TableCell>{item.dropPoint}</TableCell>
                    <TableCell>₹{item.fee}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={7} align="center" sx={{ py: 3 }}>No records found</TableCell></TableRow>}
              </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredItems.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
          </>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>{editingItem ? 'Edit Transport' : 'Add New Transport'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Student ID" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} error={Boolean(formErrors.studentId)} helperText={formErrors.studentId} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Vehicle No" value={formData.vehicleNo} onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })} error={Boolean(formErrors.vehicleNo)} helperText={formErrors.vehicleNo} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Route Name" value={formData.routeName} onChange={(e) => setFormData({ ...formData, routeName: e.target.value })} error={Boolean(formErrors.routeName)} helperText={formErrors.routeName} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Pickup Point" value={formData.pickupPoint} onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Drop Point" value={formData.dropPoint} onChange={(e) => setFormData({ ...formData, dropPoint: e.target.value })} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Monthly Fee" type="number" value={formData.fee} onChange={(e) => setFormData({ ...formData, fee: e.target.value })} /></Grid>
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

export default Transport;
