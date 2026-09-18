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
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const Library = () => {
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
    bookTitle: '',
    bookId: '',
    author: '',
    isbn: '',
    quantity: '',
    availableCopies: '',
    category: '',
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
          {
            id: 1,
            bookTitle: 'Introduction to Python',
            bookId: 'BOOK-001',
            author: 'John Smith',
            isbn: '978-0-123456-78-9',
            quantity: 10,
            availableCopies: 7,
            category: 'Programming'
          },
          {
            id: 2,
            bookTitle: 'Data Science Handbook',
            bookId: 'BOOK-002',
            author: 'Jane Doe',
            isbn: '978-0-987654-32-1',
            quantity: 8,
            availableCopies: 5,
            category: 'Data Science'
          },
          {
            id: 3,
            bookTitle: 'Web Development Guide',
            bookId: 'BOOK-003',
            author: 'Bob Wilson',
            isbn: '978-0-555555-55-5',
            quantity: 12,
            availableCopies: 9,
            category: 'Web Development'
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
        bookTitle: item.bookTitle,
        bookId: item.bookId,
        author: item.author,
        isbn: item.isbn,
        quantity: item.quantity,
        availableCopies: item.availableCopies,
        category: item.category,
      });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        bookTitle: '',
        bookId: '',
        author: '',
        isbn: '',
        quantity: '',
        availableCopies: '',
        category: '',
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
      bookTitle: '',
      bookId: '',
      author: '',
      isbn: '',
      quantity: '',
      availableCopies: '',
      category: '',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.bookTitle.trim()) errors.bookTitle = 'Book title is required';
    if (!formData.bookId.trim()) errors.bookId = 'Book ID is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive number';
    }
    if (!formData.availableCopies || isNaN(formData.availableCopies) || parseInt(formData.availableCopies) < 0) {
      errors.availableCopies = 'Available copies must be a non-negative number';
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
    if (window.confirm('Are you sure you want to delete this book?')) {
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

  const filteredItems = items.filter(item =>
    item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bookId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>Library Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Book
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by book title or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
        />
      </Paper>

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
                  <TableCell><strong>Book Title</strong></TableCell>
                  <TableCell><strong>Book ID</strong></TableCell>
                  <TableCell><strong>Author</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell align="center"><strong>Total Qty</strong></TableCell>
                  <TableCell align="center"><strong>Available</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.bookTitle}</TableCell>
                      <TableCell>{item.bookId}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.availableCopies}
                          color={item.availableCopies > 0 ? 'success' : 'error'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      No books found
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>{editingItem ? 'Edit Book' : 'Add New Book'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Title"
                value={formData.bookTitle}
                onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                error={Boolean(formErrors.bookTitle)}
                helperText={formErrors.bookTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Book ID"
                value={formData.bookId}
                onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                error={Boolean(formErrors.bookId)}
                helperText={formErrors.bookId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                error={Boolean(formErrors.author)}
                helperText={formErrors.author}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ISBN"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                error={Boolean(formErrors.quantity)}
                helperText={formErrors.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Copies"
                type="number"
                value={formData.availableCopies}
                onChange={(e) => setFormData({ ...formData, availableCopies: e.target.value })}
                error={Boolean(formErrors.availableCopies)}
                helperText={formErrors.availableCopies}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading}>
              {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Library;
