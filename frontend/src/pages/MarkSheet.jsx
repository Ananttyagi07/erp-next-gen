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
  IconButton,
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
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Description as FileIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const MarkSheet = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    school: '',
    academicYear: '',
    exam: '',
    class: '',
    section: '',
    student: '',
  });

  // Sample data (empty for now)
  const [markSheetData] = useState([]);

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

  const handlePrint = () => {
    window.print();
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

      {/* Main White Panel */}
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
            {/* Header with collapse icon */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                  Manage Mark Sheet
                </Typography>
              </Box>
              <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
                {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Divider sx={{ borderColor: '#000', borderWidth: 1, mb: 2 }} />

            {/* Quick Links */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#374151' }}>
                <span style={{ fontWeight: 500 }}>Quick Link:</span>{' '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Manage Mark
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Exam Term Result
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Exam final result
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Merit List
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Mark Sheet
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Result Card
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  All Result Card
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Mark send by Email
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Mark send by SMS
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Result Email
                </span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>
                  Result SMS
                </span>
              </Typography>
            </Box>

            {/* Filter Form Section - Two Rows */}
            <Box sx={{ mb: 4 }}>
              {/* Row 1 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end', flexWrap: 'wrap', mb: 3 }}>
                {/* School Name */}
                <FormControl sx={{ minWidth: 230 }}>
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

                {/* Academic Year */}
                <FormControl sx={{ minWidth: 230 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Academic Year <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.academicYear}
                    onChange={(e) => handleFilterChange('academicYear', e.target.value)}
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
                    <MenuItem value="2022">2022-2023</MenuItem>
                  </Select>
                </FormControl>

                {/* Exam */}
                <FormControl sx={{ minWidth: 230 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Exam <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.exam}
                    onChange={(e) => handleFilterChange('exam', e.target.value)}
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
                    <MenuItem value="mid-term">Mid-Term</MenuItem>
                    <MenuItem value="final">Final Term</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </Select>
                </FormControl>

                {/* Class */}
                <FormControl sx={{ minWidth: 230 }}>
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
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* Section */}
                <FormControl sx={{ minWidth: 230 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Section <span style={{ color: '#ef4444' }}>*</span>
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

                {/* Student */}
                <FormControl sx={{ minWidth: 230 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Student <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.student}
                    onChange={(e) => handleFilterChange('student', e.target.value)}
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
                    <MenuItem value="all">All Students</MenuItem>
                    <MenuItem value="1">John Doe</MenuItem>
                    <MenuItem value="2">Jane Smith</MenuItem>
                  </Select>
                </FormControl>

                {/* Find Button */}
                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={
                    !filters.school ||
                    !filters.academicYear ||
                    !filters.exam ||
                    !filters.class ||
                    !filters.section ||
                    !filters.student
                  }
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

            {/* Mark Sheet Table */}
            <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      #SL
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Subject
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Written Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Written Obtain
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Tutorial Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Tutorial Obtain
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Practical Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Practical Obtain
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Viva Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Viva Obtain
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Total Mark
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Total Obtain
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Letter Grade
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Grade Point
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Lowest
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Height
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      Position
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {markSheetData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={17}
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
                  ) : (
                    markSheetData.map((item, index) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{index + 1}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.subject}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.writtenMark}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.writtenObtain}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.tutorialMark}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.tutorialObtain}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.practicalMark}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.practicalObtain}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.vivaMark}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.vivaObtain}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.totalMark}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.totalObtain}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.letterGrade}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.gradePoint}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.lowest}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.height}</TableCell>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.position}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Print Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                sx={{
                  backgroundColor: '#fff',
                  color: '#374151',
                  borderColor: '#d1d5db',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '6px',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                Print
              </Button>
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
                <strong>Instruction:</strong> Please ensure Exam Attendance and Exam Mark to find Mark Sheet.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MarkSheet;
