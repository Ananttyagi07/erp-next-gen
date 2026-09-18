/**
 * Manage Lesson Component
 * Displays lesson management with list and add form
 * Features: Lesson listing, filtering, sorting, add new lesson
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
  MenuBook as LessonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const CLASSES = [
  { id: 1, name: 'MCA' },
  { id: 2, name: 'BSC' },
  { id: 3, name: 'BCA' },
];

const SUBJECTS = [
  { id: 1, name: 'Data Structure' },
  { id: 2, name: 'Web Development' },
  { id: 3, name: 'Database Management' },
];

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const SAMPLE_LESSONS = [
  {
    id: 1,
    school: 'St. Marys School',
    academicYear: '2024-2025',
    class: 'MCA',
    subject: 'Data Structure',
    lesson: 'Introduction to Arrays',
  },
  {
    id: 2,
    school: 'Central High School',
    academicYear: '2024-2025',
    class: 'BSC',
    subject: 'Web Development',
    lesson: 'HTML Basics',
  },
];

const ManageLesson = () => {
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
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('lesson');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);

  // Form states
  const [formData, setFormData] = useState({
    schoolName: '',
    class: '',
    subject: '',
    lesson: '',
    note: '',
  });

  const [addedLessons, setAddedLessons] = useState([]);
  const [lessons] = useState(SAMPLE_LESSONS);

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
    if (!formData.schoolName || !formData.class || !formData.subject) {
      setError('Please fill all required fields (School, Class, Subject)');
      return;
    }

    // Check if there's at least one lesson (either in input or in added list)
    if (!formData.lesson && addedLessons.length === 0) {
      setError('Please add at least one lesson');
      return;
    }

    // If there's a lesson in the input field, add it to the list before submitting
    if (formData.lesson.trim() && addedLessons.length === 0) {
      const newLesson = {
        id: Date.now(),
        name: formData.lesson,
      };
      setAddedLessons([newLesson]);
      setSuccess('Lesson(s) added successfully!');
      setFormData({ schoolName: '', class: '', subject: '', lesson: '', note: '' });
      setTimeout(() => setSuccess(''), 3000);
      return;
    }

    // Submit with all added lessons
    setSuccess(`${addedLessons.length} lesson(s) added successfully!`);
    setFormData({ schoolName: '', class: '', subject: '', lesson: '', note: '' });
    setAddedLessons([]);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setFormData({ schoolName: '', class: '', subject: '', lesson: '', note: '' });
    setAddedLessons([]);
    setError('');
  };

  const handleAddMoreLesson = () => {
    if (!formData.lesson.trim()) {
      setError('Please enter a lesson name before adding more');
      return;
    }
    // Add the current lesson to the list
    const newLesson = {
      id: Date.now(),
      name: formData.lesson,
    };
    setAddedLessons([...addedLessons, newLesson]);
    // Clear the lesson input field
    setFormData((prev) => ({
      ...prev,
      lesson: '',
    }));
    setError('');
  };

  const handleRemoveLesson = (id) => {
    setAddedLessons(addedLessons.filter((lesson) => lesson.id !== id));
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LessonIcon sx={{ color: '#666', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Lesson
            </Typography>
          </Box>
          <Button
            size="small"
            sx={{
              minWidth: 'auto',
              p: 0.5,
              color: '#666',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          </Button>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            onClick={() => setCurrentTab(0)}
            sx={{
              textTransform: 'none',
              fontWeight: currentTab === 0 ? 600 : 400,
              color: currentTab === 0 ? '#000' : '#999',
              borderBottom: currentTab === 0 ? '3px solid #000' : 'none',
              borderRadius: 0,
              pb: 1,
            }}
          >
            List
          </Button>
          <Button
            onClick={() => setCurrentTab(1)}
            sx={{
              textTransform: 'none',
              fontWeight: currentTab === 1 ? 600 : 400,
              color: currentTab === 1 ? '#000' : '#999',
              borderBottom: currentTab === 1 ? '3px solid #000' : 'none',
              borderRadius: 0,
              pb: 1,
            }}
          >
            Add
          </Button>
        </Box>

        {/* Content */}
        {currentTab === 0 ? (
          <Box sx={{ p: 2 }}>
            {/* Toolbar */}
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<FileCopyIcon sx={{ fontSize: 18 }} />}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Copy
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<FileDownloadIcon sx={{ fontSize: 18 }} />}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Excel
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<FileDownloadIcon sx={{ fontSize: 18 }} />}
                  sx={{ textTransform: 'capitalize' }}
                >
                  CSV
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<GetAppIcon sx={{ fontSize: 18 }} />}
                  sx={{ textTransform: 'capitalize' }}
                >
                  PDF
                </Button>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={showRows} onChange={(e) => setShowRows(e.target.value)}>
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TextField
                size="small"
                placeholder="Search:"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 200 }}
              />
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('#SL')}
                    >
                      #SL <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('school')}
                    >
                      School <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('academicYear')}
                    >
                      Academic Year <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('class')}
                    >
                      Class <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('subject')}
                    >
                      Subject <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => handleSort('lesson')}
                    >
                      Lesson <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#999' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    lessons.map((item, index) => (
                      <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{index + 1}</TableCell>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{item.school}</TableCell>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{item.academicYear}</TableCell>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{item.class}</TableCell>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{item.subject}</TableCell>
                        <TableCell sx={{ fontSize: '0.9rem' }}>{item.lesson}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                            sx={{ color: '#0066cc', textTransform: 'capitalize' }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                            sx={{ color: '#f44336', textTransform: 'capitalize' }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                Showing 0 to 0 of 0 entries
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="outlined" disabled>
                  Previous
                </Button>
                <Button size="small" variant="outlined" disabled>
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            {/* Success/Error Messages */}
            {success && (
              <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* School Name */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                      School Name <span style={{ color: '#f44336' }}>*</span>
                    </Typography>
                    <FormControl fullWidth error={!!error && !formData.schoolName}>
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
                    <FormControl fullWidth error={!!error && !formData.class}>
                      <InputLabel>--Select--</InputLabel>
                      <Select
                        name="class"
                        value={formData.class}
                        onChange={handleFormChange}
                        label="--Select--"
                      >
                        <MenuItem value="">--Select--</MenuItem>
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
                    <FormControl fullWidth error={!!error && !formData.subject}>
                      <InputLabel>--Select--</InputLabel>
                      <Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleFormChange}
                        label="--Select--"
                      >
                        <MenuItem value="">--Select--</MenuItem>
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
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
                        name="lesson"
                        value={formData.lesson}
                        onChange={handleFormChange}
                        placeholder="Lesson"
                        error={!!error && !formData.lesson}
                      />
                      <Button
                        onClick={handleAddMoreLesson}
                        sx={{
                          mt: 1.5,
                          backgroundColor: '#49957B',
                          color: '#fff',
                          border: '1px solid #2d5f54',
                          borderRadius: '3px',
                          px: 3,
                          py: 0.75,
                          textTransform: 'capitalize',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: '#3d7a68',
                          },
                          '&:active': {
                            backgroundColor: '#2d5f54',
                          },
                        }}
                      >
                        Add More
                      </Button>

                      {/* Added Lessons List */}
                      {addedLessons.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>
                            Added Lessons ({addedLessons.length})
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {addedLessons.map((lesson) => (
                              <Box
                                key={lesson.id}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 1.5,
                                  backgroundColor: '#f9f9f9',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '4px',
                                }}
                              >
                                <TextField
                                  value={lesson.name}
                                  disabled
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    backgroundColor: '#fff',
                                    mr: 1,
                                  }}
                                />
                                <Button
                                  onClick={() => handleRemoveLesson(lesson.id)}
                                  sx={{
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: '1px solid #d32f2f',
                                    borderRadius: '3px',
                                    px: 2.5,
                                    py: 0.75,
                                    textTransform: 'capitalize',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    minWidth: '80px',
                                    '&:hover': {
                                      backgroundColor: '#d32f2f',
                                    },
                                    '&:active': {
                                      backgroundColor: '#b71c1c',
                                    },
                                  }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
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
                      name="note"
                      value={formData.note}
                      onChange={handleFormChange}
                      placeholder="Note"
                      multiline
                      rows={4}
                    />
                  </Box>
                </Grid>

                {/* Form Actions */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        px: 4,
                        textTransform: 'capitalize',
                        borderColor: '#d0d0d0',
                        color: '#333',
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
                        '&:hover': { backgroundColor: '#333' },
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
      </Paper>
    </Box>
  );
};

export default ManageLesson;
