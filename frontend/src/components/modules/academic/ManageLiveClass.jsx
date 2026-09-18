/**
 * Manage Live Class Component
 * Handles live class scheduling and management
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Toolbar,
  InputAdornment,
  Typography,
  Divider,
  Grid,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';
import {
  Headphones as HeadphonesIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  FileCopy as CopyIcon,
  FileDownload as ExcelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageLiveClass = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    school: '',
    class: '',
    section: '',
    subject: '',
    teacher: '',
    liveClassType: '',
    classDate: '',
    startTime: '6:30 AM',
    endTime: '6:30 AM',
    note: '',
    sendNotification: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Sample data
  const sampleData = [];

  // Schools, Classes, Sections for dropdowns
  const schools = [
    { id: 1, name: 'School A' },
    { id: 2, name: 'School B' },
  ];

  const classes = [
    { id: 1, name: 'MCA' },
    { id: 2, name: 'BSC' },
  ];

  const sections = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
  ];

  const subjects = [
    { id: 1, name: 'Data Structure' },
    { id: 2, name: 'Web Development' },
  ];

  const teachers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const liveClassTypes = [
    { id: 1, name: 'Regular Class' },
    { id: 2, name: 'Doubt Session' },
    { id: 3, name: 'Revision' },
  ];

  // Quick Links navigation
  const quickLinks = [
    { label: 'Class', tab: 0 },
    { label: 'Section', tab: 1 },
    { label: 'Subject', tab: 2 },
    { label: 'Syllabus', tab: 3 },
    { label: 'Material', tab: 4 },
    { label: 'Live Class', tab: 5 },
    { label: 'Assignment', tab: 6 },
    { label: 'Submission', tab: 7 },
  ];

  const handleNavigateTab = (tab) => {
    navigate(`/academic?tab=${tab}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormErrors({});
    setSubmitStatus(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.school) errors.school = 'School is required';
    if (!formData.class) errors.class = 'Class is required';
    if (!formData.section) errors.section = 'Section is required';
    if (!formData.subject) errors.subject = 'Subject is required';
    if (!formData.teacher) errors.teacher = 'Teacher is required';
    if (!formData.liveClassType) errors.liveClassType = 'Live Class Type is required';
    if (!formData.classDate) errors.classDate = 'Class Date is required';
    if (!formData.startTime) errors.startTime = 'Start Time is required';
    if (!formData.endTime) errors.endTime = 'End Time is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }
    setSubmitStatus({ type: 'success', message: 'Live Class scheduled successfully!' });
    setFormData({
      school: '',
      class: '',
      section: '',
      subject: '',
      teacher: '',
      liveClassType: '',
      classDate: '',
      startTime: '6:30 AM',
      endTime: '6:30 AM',
      note: '',
      sendNotification: false,
    });
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      class: '',
      section: '',
      subject: '',
      teacher: '',
      liveClassType: '',
      classDate: '',
      startTime: '6:30 AM',
      endTime: '6:30 AM',
      note: '',
      sendNotification: false,
    });
    setFormErrors({});
    setSubmitStatus(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Scheduled': '#2196f3',
      'Live': '#4caf50',
      'Completed': '#757575',
      'Cancelled': '#f44336',
    };
    return colors[status] || '#666';
  };

  return (
    <Box>
      {/* Top Navigation Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left Section */}
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>--Select School--</InputLabel>
          <Select value={filterSchool} onChange={(e) => setFilterSchool(e.target.value)} label="--Select School--">
            <MenuItem value="">--Select School--</MenuItem>
            {schools.map((school) => (
              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Global Search"
          size="small"
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#999', mr: 1 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

        {/* Right Section */}
        <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>--Select School--</InputLabel>
            <Select value="" onChange={() => {}} label="--Select School--">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>--Session Year--</InputLabel>
            <Select value="" onChange={() => {}} label="--Session Year--">
              <MenuItem value="">--Session Year--</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" sx={{ backgroundColor: '#000', color: '#fff', px: 3 }}>
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Content Card */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HeadphonesIcon sx={{ fontSize: 28, color: '#333' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Manage Live Class
              </Typography>
            </Box>
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ minWidth: 'auto', p: 0.5, color: '#333' }}
            >
              {isCollapsed ? <ExpandLessIcon /> : <ExpandLessIcon />}
            </Button>
          </Box>

          {!isCollapsed && (
            <>
              {/* Quick Links */}
              <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {quickLinks.map((link, index) => (
                    <React.Fragment key={link.tab}>
                      <Typography
                        onClick={() => handleNavigateTab(link.tab)}
                        sx={{
                          cursor: 'pointer',
                          color: '#0066cc',
                          fontSize: '0.95rem',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {link.label}
                      </Typography>
                      {index < quickLinks.length - 1 && (
                        <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Box>

              {/* Tabs */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: '2px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', gap: 0 }}>
                  <Button
                    onClick={() => handleTabChange('list')}
                    sx={{
                      px: 2,
                      py: 1,
                      borderBottom: activeTab === 'list' ? '3px solid #000' : 'none',
                      borderRadius: 0,
                      color: activeTab === 'list' ? '#000' : '#999',
                      textTransform: 'capitalize',
                      fontWeight: activeTab === 'list' ? 600 : 400,
                    }}
                  >
                    List
                  </Button>
                  <Button
                    onClick={() => handleTabChange('add')}
                    sx={{
                      px: 2,
                      py: 1,
                      borderBottom: activeTab === 'add' ? '3px solid #000' : 'none',
                      borderRadius: 0,
                      color: activeTab === 'add' ? '#000' : '#999',
                      textTransform: 'capitalize',
                      fontWeight: activeTab === 'add' ? 600 : 400,
                    }}
                  >
                    Add
                  </Button>
                </Box>

                {activeTab === 'list' && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl sx={{ minWidth: 140 }} size="small">
                      <InputLabel>--Select School--</InputLabel>
                      <Select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)} label="--Select School--">
                        <MenuItem value="">--Select School--</MenuItem>
                        {schools.map((school) => (
                          <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 140 }} size="small">
                      <InputLabel>--Select--</InputLabel>
                      <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} label="--Select--">
                        <MenuItem value="">--Select--</MenuItem>
                        {classes.map((c) => (
                          <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </Box>

              {/* Content */}
              {activeTab === 'list' ? (
                <Box>
                  {/* Toolbar */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" startIcon={<CopyIcon />} sx={{ textTransform: 'capitalize' }}>
                        Copy
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<ExcelIcon />} sx={{ textTransform: 'capitalize' }}>
                        Excel
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<ExcelIcon />} sx={{ textTransform: 'capitalize' }}>
                        CSV
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<ExcelIcon />} sx={{ textTransform: 'capitalize' }}>
                        PDF
                      </Button>

                      <FormControl sx={{ minWidth: 120 }} size="small">
                        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                          <MenuItem value={10}>Show 10 rows</MenuItem>
                          <MenuItem value={15}>Show 15 rows</MenuItem>
                          <MenuItem value={25}>Show 25 rows</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <TextField
                      placeholder="Search:"
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ minWidth: 200 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#999', mr: 1 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Table */}
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
                            Class <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Section <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Subject <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Teacher <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Class Date <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Start Time <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            End Time <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            Status <UnfoldMoreIcon sx={{ fontSize: 16, ml: 0.5 }} />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sampleData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#999' }}>
                              No data available in table
                            </TableCell>
                          </TableRow>
                        ) : (
                          sampleData.map((item, index) => (
                            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item.school}</TableCell>
                              <TableCell>{item.class}</TableCell>
                              <TableCell>{item.section}</TableCell>
                              <TableCell>{item.subject}</TableCell>
                              <TableCell>{item.teacher}</TableCell>
                              <TableCell>{item.classDate}</TableCell>
                              <TableCell>{item.startTime}</TableCell>
                              <TableCell>{item.endTime}</TableCell>
                              <TableCell>
                                <Chip
                                  label={item.status}
                                  size="small"
                                  sx={{
                                    backgroundColor: getStatusColor(item.status),
                                    color: '#fff',
                                    fontWeight: 500,
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Button size="small" sx={{ color: '#06b6d4', textTransform: 'capitalize' }}>
                                  Edit
                                </Button>
                                <Button size="small" sx={{ color: '#ef4444', textTransform: 'capitalize' }}>
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Footer */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                      Showing {sampleData.length === 0 ? 0 : page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, sampleData.length)} of {sampleData.length} entries
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleChangePage(null, page - 1)}
                        disabled={page === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleChangePage(null, page + 1)}
                        disabled={page >= Math.ceil(sampleData.length / rowsPerPage) - 1}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  {/* Form */}
                  {submitStatus && (
                    <Box
                      sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: 1,
                        backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                      }}
                    >
                      {submitStatus.message}
                    </Box>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* School Name */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            School Name <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.school}>
                            <InputLabel>--Select School--</InputLabel>
                            <Select
                              name="school"
                              value={formData.school}
                              onChange={handleFormChange}
                              label="--Select School--"
                            >
                              <MenuItem value="">--Select School--</MenuItem>
                              {schools.map((school) => (
                                <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.school && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.school}</Typography>}
                      </Grid>

                      {/* Class */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Class <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.class}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                              name="class"
                              value={formData.class}
                              onChange={handleFormChange}
                              label="--Select--"
                            >
                              <MenuItem value="">--Select--</MenuItem>
                              {classes.map((c) => (
                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.class && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.class}</Typography>}
                      </Grid>

                      {/* Section */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Section <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.section}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                              name="section"
                              value={formData.section}
                              onChange={handleFormChange}
                              label="--Select--"
                            >
                              <MenuItem value="">--Select--</MenuItem>
                              {sections.map((section) => (
                                <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.section && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.section}</Typography>}
                      </Grid>

                      {/* Subject */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Subject <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.subject}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                              name="subject"
                              value={formData.subject}
                              onChange={handleFormChange}
                              label="--Select--"
                            >
                              <MenuItem value="">--Select--</MenuItem>
                              {subjects.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.subject && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.subject}</Typography>}
                      </Grid>

                      {/* Teacher */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Teacher <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.teacher}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                              name="teacher"
                              value={formData.teacher}
                              onChange={handleFormChange}
                              label="--Select--"
                            >
                              <MenuItem value="">--Select--</MenuItem>
                              {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.teacher && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.teacher}</Typography>}
                      </Grid>

                      {/* Live Class Type */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Live Class Type <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <FormControl fullWidth error={!!formErrors.liveClassType}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                              name="liveClassType"
                              value={formData.liveClassType}
                              onChange={handleFormChange}
                              label="--Select--"
                            >
                              <MenuItem value="">--Select--</MenuItem>
                              {liveClassTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {formErrors.liveClassType && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.liveClassType}</Typography>}
                      </Grid>

                      {/* Class Date */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Class Date <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="date"
                            name="classDate"
                            value={formData.classDate}
                            onChange={handleFormChange}
                            error={!!formErrors.classDate}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        {formErrors.classDate && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.classDate}</Typography>}
                      </Grid>

                      {/* Start Time */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Start Time <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleFormChange}
                            error={!!formErrors.startTime}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        {formErrors.startTime && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.startTime}</Typography>}
                      </Grid>

                      {/* End Time */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            End Time <span style={{ color: '#f44336' }}>*</span>
                          </Typography>
                          <TextField
                            fullWidth
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleFormChange}
                            error={!!formErrors.endTime}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        {formErrors.endTime && <Typography sx={{ color: '#f44336', fontSize: '0.75rem', mt: 0.5 }}>{formErrors.endTime}</Typography>}
                      </Grid>

                      {/* Note */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography sx={{ fontWeight: 600, width: '20%', pt: 1 }}>
                            Note
                          </Typography>
                          <TextareaAutosize
                            name="note"
                            value={formData.note}
                            onChange={handleFormChange}
                            minRows={4}
                            placeholder="Note"
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '4px',
                              border: '1px solid #d0d0d0',
                              fontFamily: 'inherit',
                              fontSize: '1rem',
                              resize: 'vertical',
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Send Notification */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Box sx={{ width: '20%' }} />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="sendNotification"
                                checked={formData.sendNotification}
                                onChange={handleFormChange}
                              />
                            }
                            label="Send Notification"
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
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ManageLiveClass;
