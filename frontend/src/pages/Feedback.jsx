import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment, MenuItem, Rating
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    studentName: '', rating: 0, comments: '', date: '', type: ''
  });

  useEffect(() => {
    loadFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = feedbacks.filter(feedback =>
      feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchTerm, feedbacks]);

  const loadFeedbacks = () => {
    const mockData = [
      { id: 1, studentName: 'John Smith', rating: 5, comments: 'Excellent teaching methods', date: '2024-01-15', type: 'Course' },
      { id: 2, studentName: 'Emily Davis', rating: 4, comments: 'Good content, needs more examples', date: '2024-01-18', type: 'Instructor' },
      { id: 3, studentName: 'Michael Brown', rating: 5, comments: 'Very helpful and engaging', date: '2024-01-20', type: 'Course' },
      { id: 4, studentName: 'Sarah Wilson', rating: 3, comments: 'Average experience', date: '2024-01-22', type: 'Facilities' },
      { id: 5, studentName: 'David Lee', rating: 4, comments: 'Well organized sessions', date: '2024-01-25', type: 'Instructor' }
    ];
    setFeedbacks(mockData);
    setFilteredFeedbacks(mockData);
  };

  const handleOpenDialog = (feedback = null) => {
    if (feedback) {
      setCurrentFeedback(feedback);
      setFormData(feedback);
    } else {
      setCurrentFeedback(null);
      setFormData({ studentName: '', rating: 0, comments: '', date: '', type: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentFeedback(null);
    setFormData({ studentName: '', rating: 0, comments: '', date: '', type: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.studentName || !formData.rating || !formData.comments || !formData.date || !formData.type) {
      alert('Please fill all fields');
      return;
    }

    if (currentFeedback) {
      setFeedbacks(feedbacks.map(feedback => feedback.id === currentFeedback.id ? { ...formData, id: feedback.id } : feedback));
    } else {
      const newFeedback = { ...formData, id: Date.now(), rating: Number(formData.rating) };
      setFeedbacks([...feedbacks, newFeedback]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Student Feedback</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Feedback
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by student name or feedback type..."
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
              <TableCell><strong>Student Name</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell><strong>Comments</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFeedbacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.studentName}</TableCell>
                <TableCell>
                  <Rating value={feedback.rating} readOnly size="small" />
                </TableCell>
                <TableCell>{feedback.comments}</TableCell>
                <TableCell>{feedback.date}</TableCell>
                <TableCell>{feedback.type}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(feedback)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(feedback.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredFeedbacks.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentFeedback ? 'Edit Feedback' : 'Add New Feedback'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={Number(formData.rating)}
              onChange={(e, newValue) => setFormData({ ...formData, rating: newValue })}
            />
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Comments"
            name="comments"
            multiline
            rows={3}
            value={formData.comments}
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
            label="Feedback Type"
            name="type"
            select
            value={formData.type}
            onChange={handleInputChange}
          >
            <MenuItem value="Course">Course</MenuItem>
            <MenuItem value="Instructor">Instructor</MenuItem>
            <MenuItem value="Facilities">Facilities</MenuItem>
            <MenuItem value="General">General</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentFeedback ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feedback;
