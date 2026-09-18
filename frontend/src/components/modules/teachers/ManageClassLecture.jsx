/**
 * Manage Class Lecture Component
 * Comprehensive class lecture management with List and Add tabs
 * Features: Lecture listing, filtering, sorting, and detailed add form
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  PlayCircle as LectureIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{
        display: value === index ? 'block' : 'none',
        py: 3,
        width: '100%'
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const CLASSES = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const SECTIONS = ['A', 'B', 'C', 'D'];

const SUBJECTS = [
  'Mathematics',
  'English',
  'Science',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Computer Science',
];

const TEACHERS = [
  'Linesh Join',
  'Girish Deshpande',
  'Priya Sharma',
  'Rajesh Kumar',
  'Sunita Patel',
  'Amit Singh',
  'Kavya Reddy',
  'Vikram Verma',
  'Neha Gupta',
  'Arun Nair',
];

const LECTURE_TYPES = [
  'Theory',
  'Practical',
  'Seminar',
  'Workshop',
  'Lab Session',
  'Tutorial',
];

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const ManageClassLecture = () => {
  const { t } = useTranslation();

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [formData, setFormData] = useState({
    school: '',
    title: '',
    class: '',
    section: '',
    subject: '',
    lectureType: '',
    note: '',
    teacher: '',
    academicYear: '2024-2025',
  });

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [lectures] = useState([]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.school || !formData.title || !formData.class || !formData.section || !formData.subject || !formData.lectureType) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      setSuccess('Class Lecture added successfully');
      setFormData({
        school: '',
        title: '',
        class: '',
        section: '',
        subject: '',
        lectureType: '',
        note: '',
        teacher: '',
        academicYear: '2024-2025',
      });
      setCurrentTab(0);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add lecture: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    setSuccess('Class Lecture deleted successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleUpdate = () => {
    setSuccess('Filters updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Box>
      {/* Global Filter Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2.2}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={globalSchool}
                label="--Select School--"
                onChange={(e) => setGlobalSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          <Grid item xs={12} sm={2.2}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={selectedSchool}
                label="--Select School--"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.2}>
            <FormControl fullWidth size="small">
              <InputLabel>--Session Year--</InputLabel>
              <Select
                value={sessionYear}
                label="--Session Year--"
                onChange={(e) => setSessionYear(e.target.value)}
              >
                {ACADEMIC_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.9}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Page Header with Collapse */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LectureIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Manage Class Lecture
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            size="small"
          >
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>
      </Paper>

      {!isHeaderCollapsed && (
        <>
          {/* Quick Links */}
          <Box sx={{ mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Department
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Teacher
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Class Lecture
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Rating
            </Typography>
          </Box>

          {/* Messages */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab label="List" icon={<LectureIcon />} iconPosition="start" />
              <Tab label="Add" icon={<AddIcon />} iconPosition="start" />
            </Tabs>

            {/* LIST TAB */}
            <TabPanel value={currentTab} index={0}>
              {/* Toolbar */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <IconButton size="small" title="Copy">
                    <FileCopyIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="Excel">
                    <FileDownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="CSV">
                    <FileDownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="PDF">
                    <GetAppIcon fontSize="small" />
                  </IconButton>

                  <FormControl sx={{ minWidth: 140 }} size="small">
                    <InputLabel>Rows</InputLabel>
                    <Select
                      value={showRows}
                      label="Rows"
                      onChange={(e) => {
                        setShowRows(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <MenuItem value={10}>Show 10 rows</MenuItem>
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField
                  size="small"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
                  }}
                />
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                        # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                      </TableCell>
                      <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('school')}>
                        School <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                      </TableCell>
                      <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('title')}>
                        Title <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Section</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Teacher</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Lecture Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Academic Year</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lectures.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center" sx={{ py: 4, color: 'gray' }}>
                          No data available in table
                        </TableCell>
                      </TableRow>
                    ) : (
                      lectures.map((lecture, index) => (
                        <TableRow key={lecture.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{lecture.school}</TableCell>
                          <TableCell>{lecture.title}</TableCell>
                          <TableCell>{lecture.class}</TableCell>
                          <TableCell>{lecture.section}</TableCell>
                          <TableCell>{lecture.subject}</TableCell>
                          <TableCell>{lecture.teacher}</TableCell>
                          <TableCell>{lecture.lectureType}</TableCell>
                          <TableCell>{lecture.academicYear}</TableCell>
                          <TableCell>
                            <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" title="View" sx={{ color: '#000' }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" title="Delete" sx={{ color: '#f44336' }} onClick={() => handleDelete(lecture.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer and Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Showing 0 to 0 of 0 entries
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </TabPanel>

            {/* ADD TAB */}
            <TabPanel value={currentTab} index={1}>
              <form onSubmit={handleFormSubmit}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* School Name */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          School Name <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select School--</InputLabel>
                          <Select
                            name="school"
                            value={formData.school}
                            label="--Select School--"
                            onChange={handleFormChange}
                          >
                            {SCHOOLS.map(school => (
                              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Title */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Title <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          placeholder="Title"
                          name="title"
                          value={formData.title}
                          onChange={handleFormChange}
                          required
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>

                      {/* Class */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Class <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select--</InputLabel>
                          <Select
                            name="class"
                            value={formData.class}
                            label="--Select--"
                            onChange={handleFormChange}
                          >
                            {CLASSES.map(cls => (
                              <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Section */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Section <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select--</InputLabel>
                          <Select
                            name="section"
                            value={formData.section}
                            label="--Select--"
                            onChange={handleFormChange}
                          >
                            {SECTIONS.map(section => (
                              <MenuItem key={section} value={section}>{section}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Subject */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Subject <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select--</InputLabel>
                          <Select
                            name="subject"
                            value={formData.subject}
                            label="--Select--"
                            onChange={handleFormChange}
                          >
                            {SUBJECTS.map(subject => (
                              <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Teacher */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Teacher
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select--</InputLabel>
                          <Select
                            name="teacher"
                            value={formData.teacher}
                            label="--Select--"
                            onChange={handleFormChange}
                          >
                            {TEACHERS.map(teacher => (
                              <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Lecture Type */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Lecture Type <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <FormControl fullWidth size="small">
                          <InputLabel>--Select--</InputLabel>
                          <Select
                            name="lectureType"
                            value={formData.lectureType}
                            label="--Select--"
                            onChange={handleFormChange}
                          >
                            {LECTURE_TYPES.map(type => (
                              <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Note */}
                      <Grid item xs={12} sm={3}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                          Note
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          placeholder="Note"
                          name="note"
                          value={formData.note}
                          onChange={handleFormChange}
                          multiline
                          rows={4}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Form Footer Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurrentTab(0);
                      setFormData({
                        school: '',
                        title: '',
                        class: '',
                        section: '',
                        subject: '',
                        lectureType: '',
                        note: '',
                        teacher: '',
                        academicYear: '2024-2025',
                      });
                    }}
                    sx={{ px: 4 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' }, px: 4 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                </Box>

                {/* Instruction Footer */}
                <Alert severity="warning" sx={{ backgroundColor: '#fff9e6', border: '1px solid #fdd835' }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Instruction:
                  </Typography>
                </Alert>
              </form>
            </TabPanel>
          </Paper>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this class lecture? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageClassLecture;
