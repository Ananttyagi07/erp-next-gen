/**
 * Manage Teacher Component
 * Comprehensive teacher management with List and Add tabs
 * Features: Teacher listing, filtering, sorting, pagination, and detailed add form
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
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  Add as AddIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';
import { useSchool } from '../../../context/useSchool';

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

// Dummy teacher data
const DUMMY_TEACHERS = [
  {
    id: 1,
    photo: 'https://via.placeholder.com/40',
    name: 'Linesh Join',
    department: 'Computer Science',
    phone: '+91 9876543210',
    email: 'linesh@example.com',
    joiningDate: '2022-01-15',
    isWebVisible: 'Yes',
    displayOrder: 1,
  },
  {
    id: 2,
    photo: 'https://via.placeholder.com/40',
    name: 'Girish Deshpande',
    department: 'Mathematics',
    phone: '+91 9876543211',
    email: 'girish@example.com',
    joiningDate: '2021-03-20',
    isWebVisible: 'Yes',
    displayOrder: 2,
  },
  {
    id: 3,
    photo: 'https://via.placeholder.com/40',
    name: 'Priya Sharma',
    department: 'Physics',
    phone: '+91 9876543212',
    email: 'priya@example.com',
    joiningDate: '2023-06-10',
    isWebVisible: 'No',
    displayOrder: 3,
  },
  {
    id: 4,
    photo: 'https://via.placeholder.com/40',
    name: 'Rajesh Kumar',
    department: 'Chemistry',
    phone: '+91 9876543213',
    email: 'rajesh@example.com',
    joiningDate: '2020-08-15',
    isWebVisible: 'Yes',
    displayOrder: 4,
  },
  {
    id: 5,
    photo: 'https://via.placeholder.com/40',
    name: 'Sunita Patel',
    department: 'English',
    phone: '+91 9876543214',
    email: 'sunita@example.com',
    joiningDate: '2022-11-05',
    isWebVisible: 'Yes',
    displayOrder: 5,
  },
  {
    id: 6,
    photo: 'https://via.placeholder.com/40',
    name: 'Amit Singh',
    department: 'History',
    phone: '+91 9876543215',
    email: 'amit@example.com',
    joiningDate: '2021-09-12',
    isWebVisible: 'No',
    displayOrder: 6,
  },
  {
    id: 7,
    photo: 'https://via.placeholder.com/40',
    name: 'Kavya Reddy',
    department: 'Biology',
    phone: '+91 9876543216',
    email: 'kavya@example.com',
    joiningDate: '2023-01-22',
    isWebVisible: 'Yes',
    displayOrder: 7,
  },
  {
    id: 8,
    photo: 'https://via.placeholder.com/40',
    name: 'Vikram Verma',
    department: 'Economics',
    phone: '+91 9876543217',
    email: 'vikram@example.com',
    joiningDate: '2022-04-18',
    isWebVisible: 'Yes',
    displayOrder: 8,
  },
  {
    id: 9,
    photo: 'https://via.placeholder.com/40',
    name: 'Neha Gupta',
    department: 'Geography',
    phone: '+91 9876543218',
    email: 'neha@example.com',
    joiningDate: '2021-07-30',
    isWebVisible: 'No',
    displayOrder: 9,
  },
  {
    id: 10,
    photo: 'https://via.placeholder.com/40',
    name: 'Arun Nair',
    department: 'Physical Education',
    phone: '+91 9876543219',
    email: 'arun@example.com',
    joiningDate: '2023-02-14',
    isWebVisible: 'Yes',
    displayOrder: 10,
  },
];

const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'English',
  'History',
  'Biology',
  'Economics',
  'Geography',
  'Physical Education',
];

const SALARY_GRADES = ['Grade A', 'Grade B', 'Grade C', 'Grade D', 'Grade E'];
const SALARY_TYPES = ['Monthly', 'Yearly', 'Contract'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const GENDERS = ['Male', 'Female', 'Other'];
const RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const ManageTeacher = () => {
  const { t } = useTranslation();
  const { selectedSchool: activeBranch } = useSchool();

  // Data states
  const [teachers, setTeachers] = useState([]);
  const [schools] = useState(SCHOOLS);

  // UI states
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Real teacher data, scoped to the branch selected in the header (not
  // the decorative "Select School" filter below, which is local-only UI).
  useEffect(() => {
    let cancelled = false;
    const fetchTeachers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiService.get('/teachers/teachers/', { params: { page_size: 200 } });
        const results = response.data?.results || [];
        if (cancelled) return;
        setTeachers(results.map((teacher, index) => ({
          id: teacher.id,
          photo: teacher.photo || null,
          name: teacher.user_name || '—',
          department: teacher.department_name || '—',
          phone: '—',
          email: '—',
          joiningDate: teacher.joining_date || '—',
          isWebVisible: 'Yes',
          displayOrder: index + 1,
        })));
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load teachers');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTeachers();
    return () => { cancelled = true; };
  }, [activeBranch]);

  // Filter states
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalSchool, setGlobalSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    school: '',
    name: '',
    nationalId: '',
    department: '',
    phone: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    birthDate: '',
    presentAddress: '',
    permanentAddress: '',
    email: '',
    username: '',
    password: '',
    salaryGrade: '',
    salaryType: '',
    role: 'Teacher',
    joiningDate: '',
    resume: null,
    isWebVisible: 'No',
    facebookUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    pinterestUrl: '',
    otherInfo: '',
    photo: null,
  });

  const [displayOrders, setDisplayOrders] = useState({});

  useEffect(() => {
    const orders = {};
    teachers.forEach(teacher => {
      orders[teacher.id] = teacher.displayOrder;
    });
    setDisplayOrders(orders);
  }, [teachers]);

  // Filtering and sorting logic
  const getFilteredTeachers = () => {
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.phone.includes(searchTerm)
      );
    }

    if (selectedSchool) {
      filtered = filtered.filter(t => t.department === selectedSchool);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredTeachers = getFilteredTeachers();
  const totalPages = Math.ceil(filteredTeachers.length / showRows);
  const startIndex = (currentPage - 1) * showRows;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + showRows);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.school || !formData.name || !formData.department || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      const newTeacher = {
        id: teachers.length + 1,
        photo: 'https://via.placeholder.com/40',
        name: formData.name,
        department: formData.department,
        phone: formData.phone,
        email: formData.email,
        joiningDate: formData.joiningDate,
        isWebVisible: formData.isWebVisible,
        displayOrder: teachers.length + 1,
      };

      setTeachers(prev => [...prev, newTeacher]);
      setSuccess('Teacher added successfully');
      setFormData({
        school: '',
        name: '',
        nationalId: '',
        department: '',
        phone: '',
        gender: '',
        bloodGroup: '',
        religion: '',
        birthDate: '',
        presentAddress: '',
        permanentAddress: '',
        email: '',
        username: '',
        password: '',
        salaryGrade: '',
        salaryType: '',
        role: 'Teacher',
        joiningDate: '',
        resume: null,
        isWebVisible: 'No',
        facebookUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        youtubeUrl: '',
        pinterestUrl: '',
        otherInfo: '',
        photo: null,
      });
      setCurrentTab(0);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add teacher: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setTeachers(prev => prev.filter(t => t.id !== deleteId));
    setOpenDeleteDialog(false);
    setSuccess('Teacher deleted successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDisplayOrderChange = (id, value) => {
    setDisplayOrders(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateOrders = () => {
    // In a real app, this would be an API call
    setSuccess('Display orders updated successfully');
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

  return (
    <Box>
      {/* Global Filter Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={globalSchool}
                label="Select School"
                onChange={(e) => setGlobalSchool(e.target.value)}
              >
                <MenuItem value="">All Schools</MenuItem>
                {schools.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={selectedSchool}
                label="Select School"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">All Schools</MenuItem>
                {schools.map(school => (
                  <MenuItem key={school.id} value={school.name}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>Session Year</InputLabel>
              <Select
                value={sessionYear}
                label="Session Year"
                onChange={(e) => setSessionYear(e.target.value)}
              >
                <MenuItem value="2024-2025">2024-2025</MenuItem>
                <MenuItem value="2023-2024">2023-2024</MenuItem>
                <MenuItem value="2022-2023">2022-2023</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <Button variant="contained" color="inherit" fullWidth sx={{ backgroundColor: '#000', color: '#fff' }}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Manage Teacher
        </Typography>
      </Box>

      {/* Quick Links */}
      <Box sx={{ mb: 3, display: 'flex', gap: 3 }}>
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
          <Tab label="List" />
          <Tab label="Add" />
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

              <FormControl sx={{ minWidth: 120 }} size="small">
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

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  label="Select School"
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <MenuItem value="">All Schools</MenuItem>
                  {schools.map(school => (
                    <MenuItem key={school.id} value={school.name}>{school.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

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
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                    # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Photo</TableCell>
                  <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('name')}>
                    Name <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                  </TableCell>
                  <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('department')}>
                    Department <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Joining Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Is View on Web?</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Display Order</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTeachers.map((teacher, index) => (
                  <TableRow key={teacher.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>
                      {teacher.photo ? (
                        <img src={teacher.photo} alt={teacher.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      ) : (
                        <Box sx={{
                          width: 40, height: 40, borderRadius: '50%', backgroundColor: 'primary.main',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.85rem', fontWeight: 700,
                        }}>
                          {teacher.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{new Date(teacher.joiningDate).toLocaleDateString()}</TableCell>
                    <TableCell>{teacher.isWebVisible}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={displayOrders[teacher.id] || teacher.displayOrder}
                        onChange={(e) => handleDisplayOrderChange(teacher.id, e.target.value)}
                        sx={{ width: 60 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="View" sx={{ color: '#000' }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Delete" sx={{ color: '#f44336' }} onClick={() => handleDelete(teacher.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer and Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Showing {startIndex + 1} to {Math.min(startIndex + showRows, filteredTeachers.length)} of {filteredTeachers.length} entries
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outlined"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              onClick={handleUpdateOrders}
            >
              Update Order
            </Button>
          </Box>
        </TabPanel>

        {/* ADD TAB */}
        <TabPanel value={currentTab} index={1}>
          <form onSubmit={handleFormSubmit}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                {/* School Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    School Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select School</InputLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      label="Select School"
                      onChange={handleFormChange}
                    >
                      {schools.map(school => (
                        <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Basic Information Section */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: '#e8e8e8',
                    p: 1,
                    mb: 2,
                    borderRadius: 1,
                  }}
                >
                  Basic Information
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="National ID"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Department</InputLabel>
                      <Select
                        name="department"
                        value={formData.department}
                        label="Department"
                        onChange={handleFormChange}
                      >
                        {DEPARTMENTS.map(dept => (
                          <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        label="Gender"
                        onChange={handleFormChange}
                      >
                        {GENDERS.map(gender => (
                          <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Blood Group</InputLabel>
                      <Select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        label="Blood Group"
                        onChange={handleFormChange}
                      >
                        {BLOOD_GROUPS.map(bg => (
                          <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Religion</InputLabel>
                      <Select
                        name="religion"
                        value={formData.religion}
                        label="Religion"
                        onChange={handleFormChange}
                      >
                        {RELIGIONS.map(religion => (
                          <MenuItem key={religion} value={religion}>{religion}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Birth Date"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleFormChange}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Present Address"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleFormChange}
                      multiline
                      rows={3}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Permanent Address"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleFormChange}
                      multiline
                      rows={3}
                      size="small"
                    />
                  </Grid>
                </Grid>

                {/* Academic Information Section */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: '#e8e8e8',
                    p: 1,
                    mb: 2,
                    borderRadius: 1,
                  }}
                >
                  Academic Information
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                      required
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Salary Grade</InputLabel>
                      <Select
                        name="salaryGrade"
                        value={formData.salaryGrade}
                        label="Salary Grade"
                        onChange={handleFormChange}
                      >
                        {SALARY_GRADES.map(grade => (
                          <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Salary Type</InputLabel>
                      <Select
                        name="salaryType"
                        value={formData.salaryType}
                        label="Salary Type"
                        onChange={handleFormChange}
                      >
                        {SALARY_TYPES.map(type => (
                          <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        label="Role"
                        onChange={handleFormChange}
                      >
                        <MenuItem value="Teacher">Teacher</MenuItem>
                        <MenuItem value="Senior Teacher">Senior Teacher</MenuItem>
                        <MenuItem value="HOD">HOD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Joining Date"
                      name="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={handleFormChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Resume Upload (.pdf, .doc/docx, .ppt/pptx or .txt)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          fullWidth
                          type="file"
                          name="resume"
                          onChange={handleFormChange}
                          inputProps={{ accept: '.pdf,.doc,.docx,.ppt,.pptx,.txt' }}
                          size="small"
                        />
                        <Button variant="contained" sx={{ backgroundColor: '#000' }}>Upload</Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Other Information Section */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: '#e8e8e8',
                    p: 1,
                    mb: 2,
                    borderRadius: 1,
                  }}
                >
                  Other Information
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Is View on Web?</InputLabel>
                      <Select
                        name="isWebVisible"
                        value={formData.isWebVisible}
                        label="Is View on Web?"
                        onChange={handleFormChange}
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Facebook URL"
                      name="facebookUrl"
                      value={formData.facebookUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="LinkedIn URL"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Twitter URL"
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Instagram URL"
                      name="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="YouTube URL"
                      name="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Pinterest URL"
                      name="pinterestUrl"
                      value={formData.pinterestUrl}
                      onChange={handleFormChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Other Info"
                      name="otherInfo"
                      value={formData.otherInfo}
                      onChange={handleFormChange}
                      multiline
                      rows={3}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Photo Upload (Max-W: 120px, Max-H: 130px. .jpg, .jpeg, .png or .gif)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          fullWidth
                          type="file"
                          name="photo"
                          onChange={handleFormChange}
                          inputProps={{ accept: '.jpg,.jpeg,.png,.gif' }}
                          size="small"
                        />
                        <Button variant="contained" sx={{ backgroundColor: '#000' }}>Upload</Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Form Footer */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentTab(0);
                  setFormData({
                    school: '',
                    name: '',
                    nationalId: '',
                    department: '',
                    phone: '',
                    gender: '',
                    bloodGroup: '',
                    religion: '',
                    birthDate: '',
                    presentAddress: '',
                    permanentAddress: '',
                    email: '',
                    username: '',
                    password: '',
                    salaryGrade: '',
                    salaryType: '',
                    role: 'Teacher',
                    joiningDate: '',
                    resume: null,
                    isWebVisible: 'No',
                    facebookUrl: '',
                    linkedinUrl: '',
                    twitterUrl: '',
                    instagramUrl: '',
                    youtubeUrl: '',
                    pinterestUrl: '',
                    otherInfo: '',
                    photo: null,
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </TabPanel>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this teacher? This action cannot be undone.
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

export default ManageTeacher;
