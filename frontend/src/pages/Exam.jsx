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
} from '@mui/icons-material';

const Exam = () => {
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
    examName: '',
    examCode: '',
    courseId: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: '120',
    maxMarks: '100',
    room: '',
    description: '',
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
            examName: 'Math Final Exam',
            examCode: 'MATH-FIN-2024',
            courseId: 'MATH101',
            date: '2024-12-15',
            time: '09:00',
            duration: 120,
            maxMarks: 100,
            room: 'Room 101',
            status: 'scheduled'
          },
          {
            id: 2,
            examName: 'English Midterm',
            examCode: 'ENG-MID-2024',
            courseId: 'ENG102',
            date: '2024-12-10',
            time: '10:00',
            duration: 90,
            maxMarks: 75,
            room: 'Room 202',
            status: 'scheduled'
          },
          {
            id: 3,
            examName: 'Physics Practical',
            examCode: 'PHY-PRAC-2024',
            courseId: 'PHY103',
            date: '2024-12-20',
            time: '14:00',
            duration: 180,
            maxMarks: 50,
            room: 'Lab 1',
            status: 'scheduled'
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
        examName: item.examName,
        examCode: item.examCode,
        courseId: item.courseId,
        date: item.date,
        time: item.time,
        duration: item.duration,
        maxMarks: item.maxMarks,
        room: item.room,
        description: item.description || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        id: '',
        examName: '',
        examCode: '',
        courseId: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: '120',
        maxMarks: '100',
        room: '',
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
      examName: '',
      examCode: '',
      courseId: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: '120',
      maxMarks: '100',
      room: '',
      description: '',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.examName.trim()) errors.examName = 'Exam name is required';
    if (!formData.examCode.trim()) errors.examCode = 'Exam code is required';
    if (!formData.courseId.trim()) errors.courseId = 'Course ID is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.duration || isNaN(formData.duration) || parseInt(formData.duration) <= 0) {
      errors.duration = 'Duration must be a positive number (in minutes)';
    }
    if (!formData.maxMarks || isNaN(formData.maxMarks) || parseInt(formData.maxMarks) <= 0) {
      errors.maxMarks = 'Max marks must be a positive number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editingItem) {
        setItems(items.map(item => item.id === editingItem.id ? { ...formData, id: item.id, status: item.status } : item));
      } else {
        const newId = Math.max(...items.map(i => i.id), 0) + 1;
        setItems([...items, { ...formData, id: newId, status: 'scheduled' }]);
      }
      handleCloseDialog();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
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
    item.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.examCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3, minHeight: '100vh', backgroundColor: '#fff' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#000' }}>Exam Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Exam
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by exam name or code..."
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
                  <TableCell><strong>Exam Name</strong></TableCell>
                  <TableCell><strong>Code</strong></TableCell>
                  <TableCell><strong>Course</strong></TableCell>
                  <TableCell><strong>Date & Time</strong></TableCell>
                  <TableCell><strong>Duration</strong></TableCell>
                  <TableCell><strong>Max Marks</strong></TableCell>
                  <TableCell><strong>Room</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.examName}</TableCell>
                      <TableCell>{item.examCode}</TableCell>
                      <TableCell>{item.courseId}</TableCell>
                      <TableCell>{item.date} {item.time}</TableCell>
                      <TableCell>{item.duration} mins</TableCell>
                      <TableCell>{item.maxMarks}</TableCell>
                      <TableCell>{item.room}</TableCell>
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
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      No exams found
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
          <h2>{editingItem ? 'Edit Exam' : 'Add New Exam'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exam Name"
                value={formData.examName}
                onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                error={Boolean(formErrors.examName)}
                helperText={formErrors.examName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Exam Code"
                value={formData.examCode}
                onChange={(e) => setFormData({ ...formData, examCode: e.target.value })}
                error={Boolean(formErrors.examCode)}
                helperText={formErrors.examCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course ID"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                error={Boolean(formErrors.courseId)}
                helperText={formErrors.courseId}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                error={Boolean(formErrors.time)}
                helperText={formErrors.time}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                error={Boolean(formErrors.duration)}
                helperText={formErrors.duration}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Marks"
                type="number"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                error={Boolean(formErrors.maxMarks)}
                helperText={formErrors.maxMarks}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Room / Hall"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              />
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

export default Exam;
