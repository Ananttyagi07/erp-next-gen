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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Description as FileIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const Promotion = () => {
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    schoolName: '',
    runningSession: '',
    promoteToSession: '',
    currentClass: '',
    promoteToClass: '',
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

  const handleRefresh = () => {
    console.log('Refresh clicked');
    // Add your refresh logic here
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
            {/* Title with Icons */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" onClick={handleRefresh} sx={{ color: '#6b7280' }}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                  <FileIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                    Manage Promotion
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#6b7280' }}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
              <Divider sx={{ borderColor: '#000', borderWidth: 1 }} />
            </Box>

            {/* Quick Links */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#374151' }}>
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Class</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Section</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Subject</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Syllabus</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Material</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Live Class</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Assignment</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Submission</span>
              </Typography>
            </Box>

            {/* Promotion Filter Form (Two Rows) */}
            <Box sx={{ mb: 4 }}>
              {/* Row 1 */}
              <Box sx={{ display: 'flex', gap: 3, mb: 3, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* School Name */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    School Name <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.schoolName}
                    onChange={(e) => handleFilterChange('schoolName', e.target.value)}
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

                {/* Running Session */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Running Session <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.runningSession}
                    onChange={(e) => handleFilterChange('runningSession', e.target.value)}
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
                    <MenuItem value="2024">2024-2025</MenuItem>
                    <MenuItem value="2023">2023-2024</MenuItem>
                  </Select>
                </FormControl>

                {/* Promote to Session */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Promote to Session <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.promoteToSession}
                    onChange={(e) => handleFilterChange('promoteToSession', e.target.value)}
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
                    <MenuItem value="2025">2025-2026</MenuItem>
                    <MenuItem value="2024">2024-2025</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* Current Class */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Current Class <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.currentClass}
                    onChange={(e) => handleFilterChange('currentClass', e.target.value)}
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

                {/* Promote To Class */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Promote To Class <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.promoteToClass}
                    onChange={(e) => handleFilterChange('promoteToClass', e.target.value)}
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
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                  </Select>
                </FormControl>

                {/* Find Button */}
                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={!filters.schoolName || !filters.runningSession || !filters.promoteToSession || !filters.currentClass || !filters.promoteToClass}
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

            {/* Data Table */}
            <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      #SL
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Name/Phone
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Roll No
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Photo
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Total Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Obtain Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      GPA
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Result
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Position
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Class Option
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Next Roll No
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      align="center"
                      sx={{
                        py: 4,
                        color: '#9ca3af',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      No available data found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

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
              <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.8 }}>
                <strong>Instruction:</strong>
                <br />
                • Please choose carefully Running Session & Promote Session.
                <br />
                • Please choose carefully Current Class & Promote to Class.
                <br />
                • Please complete the process of Exam, Exam Schedule, Exam Attendance, Exam Mark & Final Result.
                <br />
                • Please double check all Students Total Marks, Obtain Mark, Average Grade Point & Next Class Roll No.
                <br />
                • All things are 100% correct Then Promote Students to Next Class.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Promotion;
