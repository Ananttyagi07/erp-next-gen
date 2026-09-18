/**
 * Manage Absent Email Page - Material-UI Version
 * Manages absent email records with List and Send Email views
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
  Mail as MailIcon,
  ExpandLess as ChevronUpIcon,
  List as ListIcon,
  Add as PlusSquareIcon,
} from '@mui/icons-material';
import ManageAbsentEmailListTailwind from '../components/modules/absent_email/ManageAbsentEmailListTailwind';
import ManageAbsentEmailFormTailwind from '../components/modules/absent_email/ManageAbsentEmailFormTailwind';

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
  { label: 'Student Attendance', path: '/student-attendance' },
  { label: 'Teacher Attendance', path: '/teacher-attendance' },
  { label: 'Employee Attendance', path: '/employee-attendance' },
  { label: 'Absent Email', path: '/absent-email' },
  { label: 'Absent SMS', path: '/absent-sms' },
];

const ManageAbsentEmailTailwind = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Global Filters
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

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
                <MailIcon sx={{ fontSize: 28, color: '#333' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Manage Absent Email
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

                {/* Tabs Bar */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  borderBottom: '2px solid #e0e0e0'
                }}>
                  {/* Left Tabs */}
                  <Box sx={{ display: 'flex', gap: 0 }}>
                    <Button
                      startIcon={<ListIcon sx={{ fontSize: 22 }} />}
                      onClick={() => setActiveTab('list')}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderBottom: activeTab === 'list' ? '3px solid #000' : 'none',
                        borderRadius: 0,
                        color: activeTab === 'list' ? '#000' : '#666',
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                    >
                      List
                    </Button>
                    <Button
                      startIcon={<PlusSquareIcon sx={{ fontSize: 22 }} />}
                      onClick={() => setActiveTab('send')}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderBottom: activeTab === 'send' ? '3px solid #000' : 'none',
                        borderRadius: 0,
                        color: activeTab === 'send' ? '#000' : '#666',
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                    >
                      Send Email
                    </Button>
                  </Box>

                  {/* Right Controls */}
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
                </Box>

                {/* Tab Content */}
                <Box>
                  {activeTab === 'list' && (
                    <ManageAbsentEmailListTailwind
                      onSuccess={(msg) => setSuccess(msg)}
                      onError={(msg) => setError(msg)}
                    />
                  )}
                  {activeTab === 'send' && (
                    <ManageAbsentEmailFormTailwind />
                  )}
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ManageAbsentEmailTailwind;
