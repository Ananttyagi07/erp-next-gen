import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment, MenuItem, Chip, Alert, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import apiService from '../services/apiService';
import { useSchool } from '../context/useSchool';

const Payments = () => {
  const { selectedSchool } = useSchool();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    invoice: '', amount: '', date: '', method: '', status: ''
  });

  // Load payments when school changes
  useEffect(() => {
    fetchPayments();
  }, [selectedSchool]);

  useEffect(() => {
    const filtered = payments.filter(payment =>
      (payment.invoice?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (payment.method?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('/finance/payments/');
      const paymentsData = response.data?.data || response.data || [];
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      console.log('[Payments] Data loaded:', paymentsData);
    } catch (err) {
      console.error('[Payments] Error loading payments:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (payment = null) => {
    if (payment) {
      setCurrentPayment(payment);
      setFormData(payment);
    } else {
      setCurrentPayment(null);
      setFormData({ invoice: '', amount: '', date: '', method: '', status: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPayment(null);
    setFormData({ invoice: '', amount: '', date: '', method: '', status: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.invoice || !formData.amount || !formData.date || !formData.method || !formData.status) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      if (currentPayment) {
        await apiService.put(`/finance/payments/${currentPayment.id}/`, formData);
      } else {
        await apiService.post('/finance/payments/', formData);
      }
      await fetchPayments();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save payment');
      console.error('[Payments] Error saving:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      setLoading(true);
      try {
        await apiService.delete(`/finance/payments/${id}/`);
        await fetchPayments();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete payment');
        console.error('[Payments] Error deleting:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'Failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Payment Tracking</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} disabled={loading}>
          Add Payment
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
            placeholder="Search by invoice or payment method..."
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
                  <TableCell><strong>Invoice</strong></TableCell>
                  <TableCell><strong>Amount ($)</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Method</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No payments found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.invoice}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Chip label={payment.status} color={getStatusColor(payment.status)} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenDialog(payment)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(payment.id)}>
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
            count={filteredPayments.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentPayment ? 'Edit Payment' : 'Add New Payment'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Invoice Number"
            name="invoice"
            value={formData.invoice}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Amount ($)"
            name="amount"
            type="number"
            value={formData.amount}
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
            label="Payment Method"
            name="method"
            select
            value={formData.method}
            onChange={handleInputChange}
          >
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Check">Check</MenuItem>
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
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentPayment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments;
