import { useState, useEffect } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, IconButton, TextField, Grid, Alert, CircularProgress, TablePagination, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const Grades = () => {
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
    subject: '',
    marks: '',
    totalMarks: '100',
    grade: 'A',
    semester: '1',
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
          { id: 1, studentId: 'STU001', subject: 'Mathematics', marks: '85', totalMarks: '100', grade: 'A', semester: '1' },
          { id: 2, studentId: 'STU001', subject: 'English', marks: '92', totalMarks: '100', grade: 'A+', semester: '1' },
          { id: 3, studentId: 'STU002', subject: 'Mathematics', marks: '78', totalMarks: '100', grade: 'B', semester: '1' },
          { id: 4, studentId: 'STU002', subject: 'Science', marks: '88', totalMarks: '100', grade: 'A', semester: '1' },
          { id: 5, studentId: 'STU003', subject: 'History', marks: '95', totalMarks: '100', grade: 'A+', semester: '1' },
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
      setFormData({ id: item.id, studentId: item.studentId, subject: item.subject, marks: item.marks, totalMarks: item.totalMarks, grade: item.grade, semester: item.semester });
    } else {
      setEditingItem(null);
      setFormData({ id: '', studentId: '', subject: '', marks: '', totalMarks: '100', grade: 'A', semester: '1' });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ id: '', studentId: '', subject: '', marks: '', totalMarks: '100', grade: 'A', semester: '1' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId.trim()) errors.studentId = 'Student ID is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.marks || isNaN(formData.marks) || parseFloat(formData.marks) < 0) errors.marks = 'Valid marks required';
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

  const filteredItems = items.filter(item => item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || item.subject.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedItems = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 3, minHeight: '100vh', backgroundColor: '#fff' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#000' }}>Grades Management</h1>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Grade</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField fullWidth placeholder="Search by student or subject..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
      </Paper>

      <TableContainer component={Paper}>
        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box> : (
          <>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Student ID</strong></TableCell>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell><strong>Marks</strong></TableCell>
                  <TableCell><strong>Grade</strong></TableCell>
                  <TableCell><strong>Semester</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length > 0 ? paginatedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.marks}/{item.totalMarks}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: item.grade === 'A+' ? '#d32f2f' : '#1976d2' }}>{item.grade}</TableCell>
                    <TableCell>Sem {item.semester}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3 }}>No grades found</TableCell></TableRow>}
              </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredItems.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
          </>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2>{editingItem ? 'Edit Grade' : 'Add New Grade'}</h2>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Student ID" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} error={Boolean(formErrors.studentId)} helperText={formErrors.studentId} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} error={Boolean(formErrors.subject)} helperText={formErrors.subject} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Marks" type="number" value={formData.marks} onChange={(e) => setFormData({ ...formData, marks: e.target.value })} error={Boolean(formErrors.marks)} helperText={formErrors.marks} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Total Marks" type="number" value={formData.totalMarks} onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })} /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select value={formData.grade} label="Grade" onChange={(e) => setFormData({ ...formData, grade: e.target.value })}>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select value={formData.semester} label="Semester" onChange={(e) => setFormData({ ...formData, semester: e.target.value })}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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

export default Grades;
