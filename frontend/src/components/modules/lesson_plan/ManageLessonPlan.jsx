/**
 * Manage Lesson Plan Component
 * Displays lesson plan tracking in a list view with print functionality
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
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
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess as ChevronUpIcon,
  Search as SearchIcon,
  FileCopy as CopyIcon,
  GetApp as ExcelIcon,
  Download as GetAppIcon,
  Print as PrintIcon
} from '@mui/icons-material';

// Constants for sample data
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const ACADEMIC_YEARS = [
  { id: 1, year: '2023-2024' },
  { id: 2, year: '2024-2025' },
  { id: 3, year: '2025-2026' },
  { id: 4, year: '2026-2027' }
];

const SAMPLE_LESSON_PLANS = [];

const ManageLessonPlan = () => {
  // State Management
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Global Filters
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

  // Table State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [filterSelect1, setFilterSelect1] = useState('');
  const [filterSelect2, setFilterSelect2] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handler Functions
  const handleUpdate = () => {
    // Global filter update logic
  };

  const handlePrint = () => {
    // Print functionality
    window.print();
  };

  return (
    <Box>
      {/* Global Top Navigation Bar */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        gap: 2,
        mb: 3,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Left: School Dropdown */}
        <FormControl size="small" fullWidth>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={globalSchool}
            onChange={(e) => setGlobalSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            {SCHOOLS.map((school) => (
              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Left-Center: Global Search */}
        <TextField
          placeholder="Global Search"
          size="small"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          sx={{ minWidth: 180 }}
        />

        {/* Center: Vertical Divider */}
        <Divider orientation="vertical" sx={{ my: 1 }} />

        {/* Right-Center: School Selection */}
        <FormControl size="small" fullWidth>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            {SCHOOLS.map((school) => (
              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Right: Session Year and Update Button */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small" fullWidth>
            <InputLabel>--Session Year--</InputLabel>
            <Select
              value={sessionYear}
              onChange={(e) => setSessionYear(e.target.value)}
              label="--Session Year--"
            >
              <MenuItem value="">--Session Year--</MenuItem>
              {ACADEMIC_YEARS.map((year) => (
                <MenuItem key={year.id} value={year.id}>{year.year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              px: 3,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Content Card */}
      <Paper sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ p: 3 }}>
          {/* Header with Icon, Title, and Collapse Button */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MenuIcon sx={{ fontSize: 28, color: '#333' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Manage Lesson Plan
              </Typography>
            </Box>
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ minWidth: 'auto', p: 0.5, color: '#333' }}
            >
              <ChevronUpIcon sx={{ transform: isCollapsed ? 'rotate(180deg)' : 'none' }} />
            </Button>
          </Box>

          {!isCollapsed && (
            <>
              {/* Quick Links */}
              <Box sx={{
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap'
              }}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Topic
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Timeline
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Status
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>|</Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: '#0066cc',
                    fontSize: '0.95rem',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Lesson Plan
                </Typography>
              </Box>

              {/* Tab & Filter Bar */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                borderBottom: '2px solid #e0e0e0'
              }}>
                {/* List Tab - Left Aligned */}
                <Button
                  onClick={() => {}}
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom: '3px solid #000',
                    borderRadius: 0,
                    color: '#000',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    backgroundColor: '#fff'
                  }}
                >
                  List
                </Button>

                {/* Filter Group - Right Aligned */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>--Select School--</InputLabel>
                    <Select
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      label="--Select School--"
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {SCHOOLS.map((school) => (
                        <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      value={filterSelect1}
                      onChange={(e) => setFilterSelect1(e.target.value)}
                      label="--Select--"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      value={filterSelect2}
                      onChange={(e) => setFilterSelect2(e.target.value)}
                      label="--Select--"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      px: 2,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Find
                  </Button>
                </Box>
              </Box>

              {/* List View - Data Table */}
              <Box>
                {/* Toolbar */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CopyIcon />}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ExcelIcon />}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      Excel
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ExcelIcon />}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<GetAppIcon />}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      PDF
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={showRows}
                        onChange={(e) => setShowRows(e.target.value)}
                      >
                        <MenuItem value={10}>Show 10 rows</MenuItem>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    placeholder="Search"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ minWidth: 180 }}
                  />
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          #SL
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          School
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          Lesson
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          Start Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          End Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          Topic
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          Start Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                          End Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {SAMPLE_LESSON_PLANS.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            sx={{ textAlign: 'center', py: 4, color: '#999' }}
                          >
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2
                }}>
                  <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" disabled>
                      Previous
                    </Button>
                    <Button variant="outlined" size="small" disabled>
                      Next
                    </Button>
                  </Box>
                </Box>

                {/* Print Button Footer */}
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#333',
                      border: '1px solid #d0d0d0',
                      textTransform: 'capitalize',
                      '&:hover': {
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #999'
                      }
                    }}
                  >
                    Print
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ManageLessonPlan;
