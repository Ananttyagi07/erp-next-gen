/**
 * Student Attendance Page - Material-UI Version
 * Manages student attendance records
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess as ChevronUpIcon,
  List as ListIcon,
} from '@mui/icons-material';
import StudentAttendanceListTailwind from '../components/modules/attendance/StudentAttendanceListTailwind';
import StudentAttendanceFormTailwind from '../components/modules/attendance/StudentAttendanceFormTailwind';

// Sample data constants
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

const QUICK_LINKS = [
  { label: 'Student Type', path: '/student-type' },
  { label: 'Manage Student', path: '/student-list' },
  { label: 'Admit Student', path: '/admit-student' },
  { label: 'Bulk Admission', path: '/bulk-admission' },
  { label: 'Online Admission', path: '/online-admission' },
  { label: 'Student Activity', path: '/student-activity' },
];

const StudentAttendanceTailwind = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Global Filters
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const handleUpdate = () => {
    // Global filter update logic
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
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
                  Student Attendance
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
                  mb: 2,
                  pb: 2,
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  {QUICK_LINKS.map((link, index) => (
                    <Button
                      key={index}
                      sx={{
                        textTransform: 'none',
                        color: '#0066cc',
                        p: 0,
                        minWidth: 'auto',
                        fontSize: '0.9rem',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>

                {/* Tab Bar */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  borderBottom: '2px solid #e0e0e0'
                }}>
                  <Button
                    startIcon={<ListIcon />}
                    sx={{
                      px: 2,
                      py: 1,
                      borderBottom: '3px solid #000',
                      borderRadius: 0,
                      color: '#000',
                      textTransform: 'capitalize',
                      fontWeight: 600
                    }}
                  >
                    List
                  </Button>
                </Box>

                {/* Filter/Search Form */}
                <StudentAttendanceFormTailwind onSearch={(data) => {}} />

                {/* Content Area - List View */}
                <StudentAttendanceListTailwind
                  onSuccess={(msg) => setSuccess(msg)}
                  onError={(msg) => setError(msg)}
                />
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default StudentAttendanceTailwind;
