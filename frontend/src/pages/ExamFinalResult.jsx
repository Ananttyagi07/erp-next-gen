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
  Alert,
} from '@mui/material';
import {
  Description as FileIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';

const ExamFinalResult = () => {
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    school: '',
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Top Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {/* Left: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolLeft}
            onChange={(e) => setSelectedSchoolLeft(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
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
          sx={{
            flexGrow: 1,
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
            },
          }}
        />

        {/* Right Center: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolRight}
            onChange={(e) => setSelectedSchoolRight(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Far Right: Session Year Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Session Year--</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="--Session Year--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
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
            px: 4,
            borderRadius: '6px',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#1f2937' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main White Container */}
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Title with Icon */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FileIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                  Manage Exam Final Result
                </Typography>
              </Box>
              <Divider sx={{ borderColor: '#000', borderWidth: 1 }} />
            </Box>

            {/* Quick Links */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#374151' }}>
                <span style={{ fontWeight: 500 }}>Quick Link:</span>{' '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Manage Mark</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Exam Term Result</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Exam final result</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Merit List</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark Sheet</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result Card</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>All Result Card</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark send by Email</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark send by SMS</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result Email</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result SMS</span>
              </Typography>
            </Box>

            {/* Form Filter Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* School Name */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    School Name <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.school}
                    onChange={(e) => handleFilterChange('school', e.target.value)}
                    displayEmpty
                    IconComponent={ArrowDownIcon}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                    }}
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>

                {/* Class */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Class <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    displayEmpty
                    IconComponent={ArrowDownIcon}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                    }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="10">Grade 10</MenuItem>
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                  </Select>
                </FormControl>

                {/* Section */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Section
                  </Typography>
                  <Select
                    value={filters.section}
                    onChange={(e) => handleFilterChange('section', e.target.value)}
                    displayEmpty
                    IconComponent={ArrowDownIcon}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                    }}
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
                  disabled={!filters.school || !filters.class}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    px: 5,
                    height: '56px',
                    borderRadius: '6px',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: '#1f2937' },
                    '&:disabled': { backgroundColor: '#d1d5db', color: '#9ca3af' },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Empty Table Divider */}
            <Divider sx={{ mb: 4, borderColor: '#e5e7eb' }} />

            {/* Empty Space (No Data State) */}
            <Box sx={{ minHeight: '200px', mb: 4 }}>
              {/* Empty space - table will appear here when data is loaded */}
            </Box>

            {/* Instruction Box */}
            <Alert
              severity="warning"
              icon={false}
              sx={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                borderRadius: '6px',
                '& .MuiAlert-message': {
                  width: '100%',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                <strong>Instruction:</strong> Please ensure Exam Mark and Exam Attendance before Final Mark Entry.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ExamFinalResult;
