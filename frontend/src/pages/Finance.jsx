import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  IconButton,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  TablePagination,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

// Finance component - handles both Invoices and Payments
const Finance = ({ type = 'invoices' }) => {
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
    studentName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: type === 'invoices' ? 'pending' : 'completed',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate fetching data
    loadItems();
  }, [type]);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockData = type === 'invoices'
          ? [
              {
                id: 1,
                studentId: 'STU001',
                studentName: 'John Doe',
                amount: 5000,
                date: '2024-01-15',
                dueDate: '2024-02-15',
                status: 'pending',
                description: 'Tuition Fee'
              },
              {
                id: 2,
                studentId: 'STU002',
                studentName: 'Jane Smith',
                amount: 3000,
                date: '2024-01-20',
                dueDate: '2024-02-20',
                status: 'paid',
                description: 'Lab Fee'
              },
              {
                id: 3,
                studentId: 'STU003',
                studentName: 'Bob Johnson',
                amount: 2500,
                date: '2024-01-25',
                dueDate: '2024-02-25',
                status: 'overdue',
                description: 'Exam Fee'
              },
            ]
          : [
              {
                id: 1,
                studentId: 'STU001',
                studentName: 'John Doe',
                amount: 5000,
                date: '2024-02-01',
                status: 'completed',
                description: 'Tuition Fee Payment'
              },
              {
                id: 2,
                studentId: 'STU005',
                studentName: 'Alice Brown',
                amount: 4000,
                date: '2024-02-05',
                status: 'completed',
                description: 'Hostel Fee Payment'
              },
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
      setFormData({
        id: item.id,
        studentId: item.studentId,
        studentName: item.studentName,
        amount: item.amount,
        date: item.date,
        dueDate: item.dueDate || '',
        status: item.status,
        description: item.description,
      });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        studentId: '',
        studentName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: type === 'invoices' ? 'pending' : 'completed',
        description: '',
      });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      id: '',
      studentId: '',
      studentName: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: type === 'invoices' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '',
      status: type === 'invoices' ? 'pending' : 'completed',
      description: '',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.studentName.trim()) errors.studentName = 'Student Name is required';
    if (!formData.amount.trim()) {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be a valid positive number';
    }
    if (!formData.date) errors.date = 'Date is required';
    if (type === 'invoices' && !formData.dueDate) {
      errors.dueDate = 'Due date is required';
    }

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
      console.error('Submit error:', err);
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'overdue':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusLabel = (status) => {
    if (type === 'invoices') {
      return status.charAt(0).toUpperCase() + status.slice(1);
    } else {
      return 'Completed';
    }
  };

  const filteredItems = items.filter(item =>
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const title = type === 'invoices' ? 'Invoices Management' : 'Payments Management';
  const columns = type === 'invoices'
    ? ['Student ID', 'Student Name', 'Amount', 'Date', 'Due Date', 'Status', 'Description', 'Actions']
    : ['Student ID', 'Student Name', 'Amount', 'Date', 'Status', 'Description', 'Actions'];

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>{title}</h1>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add {type === 'invoices' ? 'Invoice' : 'Payment'}
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by student ID or name..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}><strong>{col}</strong></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.studentId}</TableCell>
                      <TableCell>{item.studentName}</TableCell>
                      <TableCell>{typeof item.amount === 'number' ? `₹${item.amount.toFixed(2)}` : item.amount}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      {type === 'invoices' && <TableCell>{item.dueDate}</TableCell>}
                      <TableCell>
                        <Chip
                          label={getStatusLabel(item.status)}
                          sx={{
                            backgroundColor: getStatusColor(item.status),
                            color: 'white',
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.description || '-'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>{editingItem ? `Edit ${type === 'invoices' ? 'Invoice' : 'Payment'}` : `Add New ${type === 'invoices' ? 'Invoice' : 'Payment'}`}</h2>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                error={Boolean(formErrors.studentId)}
                helperText={formErrors.studentId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                error={Boolean(formErrors.studentName)}
                helperText={formErrors.studentName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                error={Boolean(formErrors.amount)}
                helperText={formErrors.amount}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                error={Boolean(formErrors.date)}
                helperText={formErrors.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {type === 'invoices' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  error={Boolean(formErrors.dueDate)}
                  helperText={formErrors.dueDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={type === 'invoices' ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {type === 'invoices' ? (
                    <>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="overdue">Overdue</MenuItem>
                    </>
                  ) : (
                    <MenuItem value="completed">Completed</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          {/* Dialog Actions */}
          <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Finance;
