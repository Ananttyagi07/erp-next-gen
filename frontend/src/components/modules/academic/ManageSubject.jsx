/**
 * Manage Subject Component
 * Displays subject management with list and add form
 * Features: Subject listing, filtering, sorting, add new subject
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  GetApp as GetAppIcon,
  FolderOpen as FolderIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';
import { useSchool } from '../../../context/useSchool';

const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const CLASSES = [
  { id: 1, name: 'Class 10' },
  { id: 2, name: 'Class 11' },
  { id: 3, name: 'Class 12' },
];

const TEACHERS = [
  { id: 1, name: 'Mr. John Smith' },
  { id: 2, name: 'Mrs. Jane Doe' },
  { id: 3, name: 'Mr. David Wilson' },
  { id: 4, name: 'Ms. Sarah Connor' },
  { id: 5, name: 'Mr. Ayush Kumar' },
];

const SUBJECT_TYPES = [
  { id: 1, name: 'Core' },
  { id: 2, name: 'Elective' },
  { id: 3, name: 'Optional' },
];

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const ManageSubject = () => {
  const navigate = useNavigate();

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);

  // Form states
  const [formData, setFormData] = useState({
    schoolName: '',
    subjectName: '',
    subjectCode: '',
    author: '',
    type: '',
    className: '',
    teacher: '',
    note: '',
  });

  const { selectedSchool: activeBranch } = useSchool();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await apiService.get('/academic/subjects/', { params: { page_size: 300 } });
        const results = response.data?.results || [];
        if (cancelled) return;
        setSubjects(results.map((s) => ({
          id: s.id,
          school: '',
          name: s.name,
          code: s.subject_code || '—',
          class: s.class_name || '—',
          teacher: s.teacher_name || '—',
        })));
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load subjects');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchSubjects();
    return () => { cancelled = true; };
  }, [activeBranch]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleUpdate = () => {
    console.log('Filters updated');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (
      !formData.schoolName ||
      !formData.subjectName ||
      !formData.className ||
      !formData.teacher
    ) {
      setError('Please fill all required fields');
      return;
    }
    setSuccess('Subject added successfully!');
    setFormData({
      schoolName: '',
      subjectName: '',
      subjectCode: '',
      author: '',
      type: '',
      className: '',
      teacher: '',
      note: '',
    });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      subjectName: '',
      subjectCode: '',
      author: '',
      type: '',
      className: '',
      teacher: '',
      note: '',
    });
    setError('');
  };

  return (
    <Box>
      {/* Global Navigation Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={globalSchool}
                label="--Select School--"
                onChange={(e) => setGlobalSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          {/* Center Divider */}
          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={selectedSchool}
                label="--Select School--"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Session Year--</InputLabel>
              <Select
                value={sessionYear}
                label="--Session Year--"
                onChange={(e) => setSessionYear(e.target.value)}
              >
                {ACADEMIC_YEARS.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                textTransform: 'none',
                fontWeight: 500,
              }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Card */}
      <Paper sx={{ boxShadow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FolderIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              Manage Subject
            </Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>
            Quick Link:
          </Typography>
          <Typography
            onClick={() => navigate('/academic?tab=0')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Class
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=1')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Section
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Subject
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=3')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Syllabus
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=4')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Material
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=5')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Live Class
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=6')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Assignment
          </Typography>
          <Typography sx={{ color: '#ddd' }}>|</Typography>
          <Typography
            onClick={() => navigate('/academic?tab=7')}
            sx={{
              cursor: 'pointer',
              color: '#0066cc',
              fontSize: '0.95rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Submission
          </Typography>
        </Box>

        {/* Tabs Bar */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              onClick={() => setCurrentTab(0)}
              sx={{
                cursor: 'pointer',
                fontWeight: currentTab === 0 ? 600 : 400,
                fontSize: '0.95rem',
                paddingBottom: '8px',
                borderBottom: currentTab === 0 ? '2px solid #000' : 'none',
              }}
            >
              List
            </Typography>
            <Typography
              onClick={() => setCurrentTab(1)}
              sx={{
                cursor: 'pointer',
                fontWeight: currentTab === 1 ? 600 : 400,
                fontSize: '0.95rem',
                paddingBottom: '8px',
                borderBottom: currentTab === 1 ? '2px solid #000' : 'none',
              }}
            >
              Add
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={selectedSchool}
                label="--Select School--"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel>--Select Class--</InputLabel>
              <Select
                value={selectedClass}
                label="--Select Class--"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <MenuItem value="">--Select Class--</MenuItem>
                {CLASSES.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* List Tab Content */}
        {currentTab === 0 && (
          <>
            {/* Toolbar */}
            <Box
              sx={{
                p: 3,
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton size="small" title="Copy" sx={{ border: '1px solid #ddd' }}>
                  <FileCopyIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="Excel" sx={{ border: '1px solid #ddd' }}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="CSV" sx={{ border: '1px solid #ddd' }}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="PDF" sx={{ border: '1px solid #ddd' }}>
                  <GetAppIcon fontSize="small" />
                </IconButton>

                <FormControl sx={{ minWidth: 140, ml: 2 }} size="small">
                  <InputLabel>Rows</InputLabel>
                  <Select
                    value={showRows}
                    label="Rows"
                    onChange={(e) => setShowRows(e.target.value)}
                  >
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                    <MenuItem value={50}>Show 50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                  Search:
                </Typography>
                <TextField
                  size="small"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 200 }}
                />
              </Box>
            </Box>

            {/* Table */}
            <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('id')}
                    >
                      # SL{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('school')}
                    >
                      School{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('name')}
                    >
                      Name{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('code')}
                    >
                      Subject Code{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('class')}
                    >
                      Class{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => handleSort('teacher')}
                    >
                      Teacher{' '}
                      <UnfoldMoreIcon
                        fontSize="small"
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#999' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    subjects.map((subject, index) => (
                      <TableRow
                        key={subject.id}
                        sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{subject.school}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.code}</TableCell>
                        <TableCell>{subject.class}</TableCell>
                        <TableCell>{subject.teacher}</TableCell>
                        <TableCell>
                          <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Delete" sx={{ color: '#f44336' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="body2" sx={{ color: '#999' }}>
                Showing 0 to 0 of 0 entries
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: '#999', borderColor: '#ddd' }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: '#999', borderColor: '#ddd' }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        )}

        {/* Add Tab Content */}
        {currentTab === 1 && (
          <Box sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* School Name */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    School Name <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select School--</InputLabel>
                    <Select
                      name="schoolName"
                      value={formData.schoolName}
                      label="--Select School--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {SCHOOLS.map((school) => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Name */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Name <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="subjectName"
                    placeholder="Name"
                    value={formData.subjectName}
                    onChange={handleFormChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Subject Code */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Subject Code
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="subjectCode"
                    placeholder="Subject Code"
                    value={formData.subjectCode}
                    onChange={handleFormChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Author */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Author
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleFormChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Type */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {SUBJECT_TYPES.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Class */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Class <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="className"
                      value={formData.className}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {CLASSES.map((cls) => (
                        <MenuItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Teacher */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Teacher <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      name="teacher"
                      value={formData.teacher}
                      label="--Select--"
                      onChange={handleFormChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {TEACHERS.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Note */}
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                    Note
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="note"
                    placeholder="Note"
                    value={formData.note}
                    onChange={handleFormChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#999',
                      color: '#666',
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#333' },
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ManageSubject;
