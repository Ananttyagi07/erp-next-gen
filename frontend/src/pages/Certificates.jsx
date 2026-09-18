import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment, MenuItem
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    studentId: '', certificateType: '', issueDate: '', number: ''
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  useEffect(() => {
    const filtered = certificates.filter(cert =>
      cert.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  }, [searchTerm, certificates]);

  const loadCertificates = () => {
    const mockData = [
      { id: 1, studentId: 'STU001', certificateType: 'Course Completion', issueDate: '2024-01-15', number: 'CERT-2024-001' },
      { id: 2, studentId: 'STU002', certificateType: 'Achievement Award', issueDate: '2024-01-20', number: 'CERT-2024-002' },
      { id: 3, studentId: 'STU003', certificateType: 'Participation', issueDate: '2024-02-05', number: 'CERT-2024-003' },
      { id: 4, studentId: 'STU004', certificateType: 'Excellence', issueDate: '2024-02-10', number: 'CERT-2024-004' },
      { id: 5, studentId: 'STU005', certificateType: 'Course Completion', issueDate: '2024-02-15', number: 'CERT-2024-005' }
    ];
    setCertificates(mockData);
    setFilteredCertificates(mockData);
  };

  const handleOpenDialog = (cert = null) => {
    if (cert) {
      setCurrentCert(cert);
      setFormData(cert);
    } else {
      setCurrentCert(null);
      setFormData({ studentId: '', certificateType: '', issueDate: '', number: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCert(null);
    setFormData({ studentId: '', certificateType: '', issueDate: '', number: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.studentId || !formData.certificateType || !formData.issueDate || !formData.number) {
      alert('Please fill all fields');
      return;
    }

    if (currentCert) {
      setCertificates(certificates.map(cert => cert.id === currentCert.id ? { ...formData, id: cert.id } : cert));
    } else {
      const newCert = { ...formData, id: Date.now() };
      setCertificates([...certificates, newCert]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Certificates</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Certificate
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by student ID, certificate type or number..."
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
              <TableCell><strong>Student ID</strong></TableCell>
              <TableCell><strong>Certificate Type</strong></TableCell>
              <TableCell><strong>Issue Date</strong></TableCell>
              <TableCell><strong>Certificate Number</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCertificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.studentId}</TableCell>
                <TableCell>{cert.certificateType}</TableCell>
                <TableCell>{cert.issueDate}</TableCell>
                <TableCell>{cert.number}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(cert)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(cert.id)}>
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
        count={filteredCertificates.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentCert ? 'Edit Certificate' : 'Add New Certificate'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Student ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Certificate Type"
            name="certificateType"
            select
            value={formData.certificateType}
            onChange={handleInputChange}
          >
            <MenuItem value="Course Completion">Course Completion</MenuItem>
            <MenuItem value="Achievement Award">Achievement Award</MenuItem>
            <MenuItem value="Participation">Participation</MenuItem>
            <MenuItem value="Excellence">Excellence</MenuItem>
            <MenuItem value="Merit">Merit</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Issue Date"
            name="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Certificate Number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentCert ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Certificates;
