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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  Description as FileIcon,
} from '@mui/icons-material';

const ExamTermResult = () => {
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    school: '',
    exam: '',
    class: '',
    section: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFind = () => {
    console.log('Finding with filters:', filters);
    // Add your find logic here
  };

  const handleUpdate = () => {
    console.log('Update clicked');
    // Add your update logic here
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Top Global Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {/* Left: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchoolLeft}
            onChange={(e) => setSelectedSchoolLeft(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Center: Global Search */}
        <TextField
          placeholder="Global Search"
          variant="outlined"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />

        {/* Right Center: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchoolRight}
            onChange={(e) => setSelectedSchoolRight(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Far Right: Session Year Dropdown */}
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

        {/* Update Button */}
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            textTransform: 'none',
            px: 3,
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Section */}
      <Box sx={{ p: 3 }}>
        <Card sx={{ boxShadow: 2, borderTop: '3px solid #333' }}>
          <CardContent>
            {/* Title with Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FileIcon sx={{ color: '#666' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Manage Exam Term Result
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ display: 'inline', mr: 1, color: '#666' }}>
                Quick Link:
              </Typography>
              <Typography variant="body2" sx={{ display: 'inline', color: '#1976d2' }}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Manage Mark</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Exam Term Result</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Exam final result</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Merit List</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Mark Sheet</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Result Card</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>All Result Card</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Mark send by Email</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Mark send by SMS</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Result Email</span>
                {' | '}
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Result SMS</span>
              </Typography>
            </Box>

            {/* Filter Form Area */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* School Name */}
                <FormControl sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: '#333' }}>
                    School Name <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.school}
                    onChange={(e) => handleFilterChange('school', e.target.value)}
                    displayEmpty
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>

                {/* Exam */}
                <FormControl sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: '#333' }}>
                    Exam <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.exam}
                    onChange={(e) => handleFilterChange('exam', e.target.value)}
                    displayEmpty
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="mid-term">Mid-Term</MenuItem>
                    <MenuItem value="final">Final Term</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </Select>
                </FormControl>

                {/* Class */}
                <FormControl sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: '#333' }}>
                    Class <span style={{ color: '#f44336' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    displayEmpty
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="10">Grade 10</MenuItem>
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                  </Select>
                </FormControl>

                {/* Section */}
                <FormControl sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: '#333' }}>
                    Section
                  </Typography>
                  <Select
                    value={filters.section}
                    onChange={(e) => handleFilterChange('section', e.target.value)}
                    displayEmpty
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="A">Section A</MenuItem>
                    <MenuItem value="B">Section B</MenuItem>
                    <MenuItem value="C">Section C</MenuItem>
                  </Select>
                </FormControl>

                {/* Find Button */}
                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={!filters.school || !filters.exam || !filters.class}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    px: 4,
                    height: '56px',
                    '&:hover': { backgroundColor: '#333' },
                    '&:disabled': { backgroundColor: '#ccc', color: '#999' },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Results Table */}
            <TableContainer component={Paper} sx={{ mb: 3, overflowX: 'auto' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Roll No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Photo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Total Subject</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Exam Mark</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Obtain Mark</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>GPA</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Letter Grade</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4, color: '#999' }}>
                      No available data found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Instruction Bar */}
            <Alert
              severity="warning"
              sx={{
                backgroundColor: '#fffbeb',
                color: '#92400e',
                border: '1px solid #fde68a',
                borderRadius: '4px',
                '& .MuiAlert-icon': {
                  color: '#f59e0b',
                },
              }}
            >
              <Typography variant="body2">
                <strong>Instruction:</strong> Please ensure Exam Mark and Exam Attendance before Final Mark Entry.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ExamTermResult;
