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
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Description as FileIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowUpward as SortIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const GenerateCertificate = () => {
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchTable, setSearchTable] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Filter states
  const [filters, setFilters] = useState({
    schoolName: '',
    class: '',
    certificateType: '',
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
            {/* Title with Icons */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                    Manage Certificate
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
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Certificate Type</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Generate Certificate</span>
              </Typography>
            </Box>

            {/* Certificate Filters Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end', flexWrap: 'wrap' }}>
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

                {/* Certificate Type */}
                <FormControl sx={{ minWidth: 250 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                    Certificate Type <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Select
                    value={filters.certificateType}
                    onChange={(e) => handleFilterChange('certificateType', e.target.value)}
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
                    <MenuItem value="1">Merit Certificate</MenuItem>
                    <MenuItem value="2">Participation Certificate</MenuItem>
                    <MenuItem value="3">Completion Certificate</MenuItem>
                  </Select>
                </FormControl>

                {/* Find Button */}
                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={!filters.schoolName || !filters.class || !filters.certificateType}
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

            {/* Student List Section Header */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#374151' }}>
                  Student List
                </Typography>
              </Box>
            </Box>

            {/* Export Buttons and Show Rows */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                  }}
                >
                  Copy
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                  }}
                >
                  Excel
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                  }}
                >
                  CSV
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                  }}
                >
                  PDF
                </Button>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(e.target.value)}
                    size="small"
                    sx={{
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                    }}
                  >
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                    <MenuItem value={50}>Show 50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Search */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151' }}>
                  Search:
                </Typography>
                <TextField
                  size="small"
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                  sx={{
                    minWidth: 200,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Student Table */}
            <TableContainer component={Paper} sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        #SL
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Photo
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Name
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Phone
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Email
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Created
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Action
                        <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      sx={{
                        py: 4,
                        color: '#9ca3af',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      No data available in table
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Showing 0 to 0 of 0 entries
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  disabled
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    '&:disabled': { color: '#9ca3af' },
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  disabled
                  sx={{
                    color: '#374151',
                    borderColor: '#d1d5db',
                    textTransform: 'none',
                    '&:disabled': { color: '#9ca3af' },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default GenerateCertificate;
