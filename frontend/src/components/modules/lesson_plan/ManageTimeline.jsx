/**
 * Manage Lesson Timeline Component
 * Handles lesson timeline creation and management with comprehensive UI structure
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
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
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandLess as ChevronUpIcon,
  Search as SearchIcon,
  FileCopy as CopyIcon,
  GetApp as ExcelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as GetAppIcon
} from '@mui/icons-material';

// Constants for sample data
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const CLASSES = [
  { id: 1, name: 'MCA' },
  { id: 2, name: 'BSC' },
  { id: 3, name: 'BCA' }
];

const SUBJECTS = [
  { id: 1, name: 'Data Structure' },
  { id: 2, name: 'Web Development' },
  { id: 3, name: 'Database' }
];

const LESSONS = [
  { id: 1, name: 'Lesson 1' },
  { id: 2, name: 'Lesson 2' },
  { id: 3, name: 'Lesson 3' }
];

const ACADEMIC_YEARS = [
  { id: 1, year: '2023-2024' },
  { id: 2, year: '2024-2025' },
  { id: 3, year: '2025-2026' },
  { id: 4, year: '2026-2027' }
];

const SAMPLE_TIMELINES = [];

const ManageTimeline = () => {
  // State Management
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Global Filters
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

  // Table State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);

  // Form State
  const [formData, setFormData] = useState({
    schoolName: '',
    class: '',
    subject: '',
    lesson: '',
    lessonStartDate: '',
    lessonEndDate: '',
    topicStartDate: '',
    topicEndDate: '',
    note: ''
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handler Functions
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleUpdate = () => {
    // Global filter update logic
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.schoolName || !formData.class || !formData.subject || !formData.lesson ||
        !formData.lessonStartDate || !formData.lessonEndDate || !formData.topicStartDate || !formData.topicEndDate) {
      setError('Please fill in all required fields');
      return;
    }

    setSuccess('Lesson timeline created successfully!');
    setFormData({
      schoolName: '',
      class: '',
      subject: '',
      lesson: '',
      lessonStartDate: '',
      lessonEndDate: '',
      topicStartDate: '',
      topicEndDate: '',
      note: ''
    });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      class: '',
      subject: '',
      lesson: '',
      lessonStartDate: '',
      lessonEndDate: '',
      topicStartDate: '',
      topicEndDate: '',
      note: ''
    });
    setError('');
  };

  return (
    <Box>
      {/* Global Top Navigation Bar */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        gap: 2,
        mb: 3,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Left: School Dropdown */}
        <FormControl size="small" fullWidth>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={globalSchool}
            onChange={(e) => setGlobalSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            {SCHOOLS.map((school) => (
              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Left-Center: Global Search */}
        <TextField
          placeholder="Global Search"
          size="small"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          sx={{ minWidth: 180 }}
        />

        {/* Center: Vertical Divider */}
        <Divider orientation="vertical" sx={{ my: 1 }} />

        {/* Right-Center: School Selection */}
        <FormControl size="small" fullWidth>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            {SCHOOLS.map((school) => (
              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Right: Session Year and Update Button */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small" fullWidth>
            <InputLabel>--Session Year--</InputLabel>
            <Select
              value={sessionYear}
              onChange={(e) => setSessionYear(e.target.value)}
              label="--Session Year--"
            >
              <MenuItem value="">--Session Year--</MenuItem>
              {ACADEMIC_YEARS.map((year) => (
                <MenuItem key={year.id} value={year.id}>{year.year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              px: 3,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Content Card */}
      <Paper sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ p: 3 }}>
          {/* Header with Icon, Title, and Collapse Button */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuIcon sx={{ fontSize: 28, color: '#333' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Manage Lesson Timeline
              </Typography>
            </Box>
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ minWidth: 'auto', p: 0.5, color: '#333' }}
            >
              <ChevronUpIcon sx={{ transform: isCollapsed ? 'rotate(180deg)' : 'none' }} />
            </Button>
          </Box>

          {!isCollapsed && (
            <>
              {/* Quick Links */}
              <Box sx={{
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap'
              }}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Topic
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Timeline
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Status
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Plan
                </Typography>
              </Box>

              {/* Tab & Filter Bar */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                borderBottom: '2px solid #e0e0e0'
              }}>
                {/* List Tab */}
                <Button
                  onClick={() => setCurrentTab(0)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom: currentTab === 0 ? '3px solid #000' : 'none',
                    borderRadius: 0,
                    color: currentTab === 0 ? '#000' : '#999',
                    textTransform: 'capitalize',
                    fontWeight: currentTab === 0 ? 600 : 400
                  }}
                >
                  List
                </Button>

                {/* Filter Group - Right Aligned */}
                {currentTab === 0 && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>--Select School--</InputLabel>
                      <Select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        label="--Select School--"
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        {SCHOOLS.map((school) => (
                          <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>--Select--</InputLabel>
                      <Select defaultValue="">
                        <MenuItem value="">--Select--</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>--Select--</InputLabel>
                      <Select defaultValue="">
                        <MenuItem value="">--Select--</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        px: 2,
                        textTransform: 'capitalize'
                      }}
                    >
                      Find
                    </Button>
                  </Box>
                )}
              </Box>

              {/* List View */}
              {currentTab === 0 ? (
                <Box>
                  {/* Toolbar */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    gap: 2,
                    flexWrap: 'wrap'
                  }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CopyIcon />}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ExcelIcon />}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        Excel
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ExcelIcon />}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        CSV
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GetAppIcon />}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        PDF
                      </Button>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={showRows}
                          onChange={(e) => setShowRows(e.target.value)}
                        >
                          <MenuItem value={10}>Show 10 rows</MenuItem>
                          <MenuItem value={15}>Show 15 rows</MenuItem>
                          <MenuItem value={25}>Show 25 rows</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      placeholder="Search"
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ minWidth: 180 }}
                    />
                  </Box>

                  {/* Data Table */}
                  <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            #SL <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            School <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Academic Year <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Class <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Subject <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Lesson: Start Date - End Date <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Topic: Start Date - End Date <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {SAMPLE_TIMELINES.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              sx={{ textAlign: 'center', py: 4, color: '#999' }}
                            >
                              No data available in table
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Pagination */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                  }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                      Showing 0 to 0 of 0 entries
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" disabled>
                        Previous
                      </Button>
                      <Button variant="outlined" size="small" disabled>
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
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
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            School Name <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel>--Select School--</InputLabel>
                            <Select
                              name="schoolName"
                              value={formData.schoolName}
                              onChange={handleFormChange}
                              label="--Select School--"
                            >
                              <MenuItem value="">--Select School--</MenuItem>
                              {SCHOOLS.map((school) => (
                                <MenuItem key={school.id} value={school.id}>
                                  {school.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      {/* Class */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Class <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel>--Select Class--</InputLabel>
                            <Select
                              name="class"
                              value={formData.class}
                              onChange={handleFormChange}
                              label="--Select Class--"
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
                      </Grid>

                      {/* Subject */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Subject <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel>--Select Subject--</InputLabel>
                            <Select
                              name="subject"
                              value={formData.subject}
                              onChange={handleFormChange}
                              label="--Select Subject--"
                            >
                              <MenuItem value="">--Select Subject--</MenuItem>
                              {SUBJECTS.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      {/* Lesson */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Lesson <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel>--Select Lesson--</InputLabel>
                            <Select
                              name="lesson"
                              value={formData.lesson}
                              onChange={handleFormChange}
                              label="--Select Lesson--"
                            >
                              <MenuItem value="">--Select Lesson--</MenuItem>
                              {LESSONS.map((lesson) => (
                                <MenuItem key={lesson.id} value={lesson.id}>
                                  {lesson.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      {/* Lesson Start Date */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Lesson Start Date <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="date"
                            name="lessonStartDate"
                            value={formData.lessonStartDate}
                            onChange={handleFormChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </Grid>

                      {/* Lesson End Date */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Lesson End Date <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="date"
                            name="lessonEndDate"
                            value={formData.lessonEndDate}
                            onChange={handleFormChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </Grid>

                      {/* Topic Start Date */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Topic Start Date <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="date"
                            name="topicStartDate"
                            value={formData.topicStartDate}
                            onChange={handleFormChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </Grid>

                      {/* Topic End Date */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Topic End Date <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="date"
                            name="topicEndDate"
                            value={formData.topicEndDate}
                            onChange={handleFormChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </Grid>

                      {/* Note */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Note
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Enter note (optional)"
                            name="note"
                            value={formData.note}
                            onChange={handleFormChange}
                          />
                        </Box>
                      </Grid>

                      {/* Action Buttons */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                          <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                              px: 4,
                              textTransform: 'capitalize',
                              borderColor: '#d0d0d0',
                              color: '#333'
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              px: 4,
                              backgroundColor: '#000',
                              color: '#fff',
                              textTransform: 'capitalize',
                              '&:hover': { backgroundColor: '#333' }
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ManageTimeline;
