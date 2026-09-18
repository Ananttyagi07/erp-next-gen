import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { useSchool } from '../context/useSchool';
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
const Attendance = () => {
  const { selectedSchool: activeBranch } = useSchool();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0 });

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    student_id: '',
    date: '',
    status: 'present',
    remarks: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('/attendance/students/', {
          params: {
            page: page + 1,
            page_size: rowsPerPage,
            date: searchTerm || undefined,
          },
        });
        if (cancelled) return;
        const results = response.data?.results || [];
        setAttendance(results.map((r) => ({
          id: r.id,
          student_id: `${r.student_name || '—'} (Roll ${r.roll_number || '—'}, ${r.class_name || '—'})`,
          date: r.attendance_date,
          status: r.status,
          remarks: '',
        })));
        setPagination({ total: response.data?.count || 0 });
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load attendance');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [page, rowsPerPage, searchTerm, activeBranch]);

  const handleOpenDialog = () => {
    setFormData({
      student_id: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      remarks: '',
    });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      student_id: '',
      date: '',
      status: 'present',
      remarks: '',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.student_id.trim()) errors.student_id = 'Student ID is required';
    if (!formData.date.trim()) errors.date = 'Date is required';
    if (!formData.status.trim()) errors.status = 'Status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // NOTE: marking attendance from this dialog needs a student/class/
      // section picker wired to real records, not just free-text IDs —
      // out of scope for tonight's fix (read paths only). This at least
      // won't throw a ReferenceError on submit anymore.
      await apiService.post('/attendance/students/', {
        student: formData.student_id,
        attendance_date: formData.date,
        status: formData.status,
      });
      handleCloseDialog();
    } catch (err) {
      console.error('Submit error:', err);
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
      case 'present':
        return '#4caf50';
      case 'absent':
        return '#f44336';
      case 'late':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: "#000" }}>Attendance Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Mark Attendance
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Date Filter */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          type="date"
          label="Filter by Date"
          value={searchTerm}
          onChange={handleSearchChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Paper>

      {/* Attendance Table */}
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
                  <TableCell><strong>Student ID</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Remarks</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.length > 0 ? (
                  attendance.map((record) => (
                    <TableRow key={record.id} hover>
                      <TableCell>{record.student_id}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: getStatusColor(record.status),
                            color: 'white',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {record.status}
                        </Box>
                      </TableCell>
                      <TableCell>{record.remarks || '-'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            if (window.confirm('Delete this attendance record?')) {
                              // Add delete functionality if available
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      No attendance records found
                    </TableCell>
                  </TableRow>
                )}</TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pagination.total || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </TableContainer>

      {/* Mark Attendance Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <h2 style={{ color: "#000" }}>Mark Attendance</h2>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student ID"
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                error={Boolean(formErrors.student_id)}
                helperText={formErrors.student_id}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                error={Boolean(formErrors.date)}
                helperText={formErrors.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                error={Boolean(formErrors.status)}
                helperText={formErrors.status}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="leave">Leave</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                multiline
                rows={2}
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
              {loading ? 'Saving...' : 'Mark'}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Attendance;
