import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  School as GraduationCapIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ExamAttendance = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    schoolName: '',
    exam: '',
    class: '',
    section: '',
    subject: '',
  });

  // Attendance data
  const [attendanceData] = useState([]);
  const [attendAll, setAttendAll] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFind = () => {
    console.log('Finding with filters:', filters);
    // Add your find logic here
  };

  const handleAttendAllChange = (event) => {
    setAttendAll(event.target.checked);
    // Logic to mark all students as present/absent
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Global Filter Bar */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Global Search"
          variant="outlined"
          size="medium"
        />

        <Box sx={{ borderLeft: '2px solid #000', height: '40px', mx: 1 }} />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Session Year--</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="--Session Year--"
          >
            <MenuItem value="">--Session Year--</MenuItem>
            <MenuItem value="2024">2024-2025</MenuItem>
            <MenuItem value="2023">2023-2024</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Card Container */}
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GraduationCapIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Exam Attendance
              </Typography>
            </Box>
            <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
              {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Collapse in={headerExpanded}>
            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', display: 'inline', mr: 1 }}>
                Quick Link:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline' }}>
                <span style={{ cursor: 'pointer' }}>Exam Grade</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Term</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Schedule</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Suggestion</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Exam Attendance</span>
              </Typography>
            </Box>

            {/* Filter Section */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9fafb', borderRadius: 1, border: '1px solid #e5e7eb' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>School Name *</InputLabel>
                  <Select
                    value={filters.schoolName}
                    onChange={(e) => handleFilterChange('schoolName', e.target.value)}
                    label="School Name *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Exam *</InputLabel>
                  <Select
                    value={filters.exam}
                    onChange={(e) => handleFilterChange('exam', e.target.value)}
                    label="Exam *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Exam--</MenuItem>
                    <MenuItem value="mid-term">Mid-Term</MenuItem>
                    <MenuItem value="final">Final Term</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Class *</InputLabel>
                  <Select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    label="Class *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Class--</MenuItem>
                    <MenuItem value="10">Grade 10</MenuItem>
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Section</InputLabel>
                  <Select
                    value={filters.section}
                    onChange={(e) => handleFilterChange('section', e.target.value)}
                    label="Section"
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Section--</MenuItem>
                    <MenuItem value="A">Section A</MenuItem>
                    <MenuItem value="B">Section B</MenuItem>
                    <MenuItem value="C">Section C</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Subject *</InputLabel>
                  <Select
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    label="Subject *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Subject--</MenuItem>
                    <MenuItem value="math">Mathematics</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={
                    !filters.schoolName ||
                    !filters.exam ||
                    !filters.class ||
                    !filters.subject
                  }
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    height: '56px',
                    px: 4,
                    '&:hover': { backgroundColor: '#333' },
                    '&:disabled': { backgroundColor: '#ccc', color: '#999' },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Attendance Table */}
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>#SL</TableCell>
                    <TableCell sx={{ color: '#666' }}>Name</TableCell>
                    <TableCell sx={{ color: '#666' }}>Phone</TableCell>
                    <TableCell sx={{ color: '#666' }}>Roll No</TableCell>
                    <TableCell sx={{ color: '#666' }}>Photo</TableCell>
                    <TableCell sx={{ color: '#666' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Checkbox
                          checked={attendAll}
                          onChange={handleAttendAllChange}
                          sx={{
                            color: '#666',
                            '&.Mui-checked': {
                              color: '#1976d2',
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Attend All
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#999' }}>
                        No available data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    attendanceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#1976d2' }}>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.rollNo}</TableCell>
                        <TableCell>
                          <Avatar
                            src={item.photo}
                            alt={item.name}
                            sx={{ width: 40, height: 40 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={item.isPresent || attendAll}
                            onChange={(e) => {
                              // Handle individual attendance
                            }}
                            sx={{
                              color: '#666',
                              '&.Mui-checked': {
                                color: '#1976d2',
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Warning Alert */}
            <Alert
              icon={<InfoIcon fontSize="inherit" />}
              severity="warning"
              sx={{
                backgroundColor: '#fffbeb',
                color: '#78350f',
                border: '1px solid #fde68a',
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  color: '#f59e0b',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Instruction: Please create exam schedule for this Exam, Class, Section & Subject.
              </Typography>
            </Alert>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamAttendance;
