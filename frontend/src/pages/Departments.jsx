import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: '', head: '', budget: '', phone: ''
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  const loadDepartments = () => {
    const mockData = [
      { id: 1, name: 'Computer Science', head: 'Dr. Sarah Johnson', budget: 250000, phone: '555-0101' },
      { id: 2, name: 'Mathematics', head: 'Prof. Michael Chen', budget: 180000, phone: '555-0102' },
      { id: 3, name: 'Physics', head: 'Dr. Emily Rodriguez', budget: 220000, phone: '555-0103' },
      { id: 4, name: 'Chemistry', head: 'Prof. David Kumar', budget: 200000, phone: '555-0104' },
      { id: 5, name: 'Biology', head: 'Dr. Lisa Thompson', budget: 190000, phone: '555-0105' }
    ];
    setDepartments(mockData);
    setFilteredDepartments(mockData);
  };

  const handleOpenDialog = (dept = null) => {
    if (dept) {
      setCurrentDept(dept);
      setFormData(dept);
    } else {
      setCurrentDept(null);
      setFormData({ name: '', head: '', budget: '', phone: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDept(null);
    setFormData({ name: '', head: '', budget: '', phone: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.head || !formData.budget || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    if (currentDept) {
      setDepartments(departments.map(dept => dept.id === currentDept.id ? { ...formData, id: dept.id } : dept));
    } else {
      const newDept = { ...formData, id: Date.now(), budget: Number(formData.budget) };
      setDepartments([...departments, newDept]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Departments</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Department
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by department name or head..."
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
              <TableCell><strong>Department Name</strong></TableCell>
              <TableCell><strong>Department Head</strong></TableCell>
              <TableCell><strong>Budget ($)</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dept) => (
              <TableRow key={dept.id}>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{dept.head}</TableCell>
                <TableCell>${dept.budget.toLocaleString()}</TableCell>
                <TableCell>{dept.phone}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(dept)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(dept.id)}>
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
        count={filteredDepartments.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentDept ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department Head"
            name="head"
            value={formData.head}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Budget ($)"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentDept ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Departments;
