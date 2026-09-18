/**
 * Absent SMS Page - Material-UI Version
 * Sends SMS notifications for absent students
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
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess as ChevronUpIcon,
} from '@mui/icons-material';

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

const AbsentSmsTailwind = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectAll, setSelectAll] = useState(false);

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
                  Absent SMS
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
                <Alert severity="info" sx={{ mb: 3 }}>
                  Send SMS notifications to parents for absent students during a selected date range.
                </Alert>

                {/* Form Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Date Range Section */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2
                  }}>
                    <TextField
                      label="From Date"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="To Date"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      size="small"
                    />
                  </Box>

                  {/* Select Classes Section */}
                  <Box>
                    <Typography sx={{ fontWeight: 600, mb: 2, fontSize: '0.95rem' }}>
                      Select Classes
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectAll}
                            onChange={(e) => setSelectAll(e.target.checked)}
                          />
                        }
                        label="Select All"
                        sx={{ fontWeight: 600 }}
                      />
                      <FormControlLabel control={<Checkbox />} label="1st" />
                      <FormControlLabel control={<Checkbox />} label="2nd" />
                      <FormControlLabel control={<Checkbox />} label="3rd" />
                      <FormControlLabel control={<Checkbox />} label="4th" />
                      <FormControlLabel control={<Checkbox />} label="5th" />
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pt: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        px: 4,
                        textTransform: 'capitalize',
                        borderColor: '#d0d0d0',
                        color: '#333'
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        px: 4,
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'capitalize',
                        '&:hover': { backgroundColor: '#333' }
                      }}
                    >
                      Send SMS
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AbsentSmsTailwind;
