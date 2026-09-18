/**
 * Manage Waiting Application Component
 * Displays pending/waiting leave applications with list and filtering
 * Features: Leave application listing, filtering, sorting, pagination
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
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
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  GetApp as GetAppIcon,
  NotificationsActive as BellIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SCHOOLS = [
  { id: 1, name: 'St. Marys School' },
  { id: 2, name: 'Central High School' },
  { id: 3, name: 'Modern Academy' },
];

const ACADEMIC_YEARS = [
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
];

const ManageWaitingApplication = () => {
  const navigate = useNavigate();

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('applicant');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);

  const [waitingApplications] = useState([]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleUpdate = () => {
    console.log('Filters updated');
  };

  return (
    <Box>
      {/* Global Navigation Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={globalSchool}
                label="--Select School--"
                onChange={(e) => setGlobalSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          {/* Center Divider */}
          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Select School--</InputLabel>
              <Select
                value={selectedSchool}
                label="--Select School--"
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <MenuItem value="">--Select School--</MenuItem>
                {SCHOOLS.map(school => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel>--Session Year--</InputLabel>
              <Select
                value={sessionYear}
                label="--Session Year--"
                onChange={(e) => setSessionYear(e.target.value)}
              >
                {ACADEMIC_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2.4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                textTransform: 'none',
                fontWeight: 500,
              }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Card */}
      <Paper sx={{ boxShadow: 1 }}>
        {/* Header */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BellIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              Manage Waiting Application
            </Typography>
          </Box>
          <IconButton size="small">
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Quick Links */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Typography
            onClick={() => navigate('/leaves?tab=0')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Leave Type
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=1')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Leave Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=3')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Approved Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=2')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Waiting Application
          </Typography>
          <Typography
            onClick={() => navigate('/leaves?tab=4')}
            sx={{ cursor: 'pointer', color: '#0066cc', fontSize: '0.95rem', '&:hover': { textDecoration: 'underline' } }}
          >
            Declined Application
          </Typography>
        </Box>

        {/* Tab Bar */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
            List
          </Typography>

          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>--Select School--</InputLabel>
            <Select
              value={selectedSchool}
              label="--Select School--"
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <MenuItem value="">--Select School--</MenuItem>
              {SCHOOLS.map(school => (
                <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Toolbar */}
        <Box sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton size="small" title="Copy" sx={{ border: '1px solid #ddd' }}>
              <FileCopyIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" title="Excel" sx={{ border: '1px solid #ddd' }}>
              <FileDownloadIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" title="CSV" sx={{ border: '1px solid #ddd' }}>
              <FileDownloadIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" title="PDF" sx={{ border: '1px solid #ddd' }}>
              <GetAppIcon fontSize="small" />
            </IconButton>

            <FormControl sx={{ minWidth: 140, ml: 2 }} size="small">
              <InputLabel>Rows</InputLabel>
              <Select
                value={showRows}
                label="Rows"
                onChange={(e) => setShowRows(e.target.value)}
              >
                <MenuItem value={10}>Show 10 rows</MenuItem>
                <MenuItem value={15}>Show 15 rows</MenuItem>
                <MenuItem value={25}>Show 25 rows</MenuItem>
                <MenuItem value={50}>Show 50 rows</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
              Search:
            </Typography>
            <TextField
              size="small"
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer sx={{ border: '1px solid #e0e0e0' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                  # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('school')}>
                  School <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('academicYear')}>
                  Academic Year <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('applicantType')}>
                  Applicant Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('leaveType')}>
                  Leave Type <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('applicant')}>
                  Applicant <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waitingApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#999' }}>
                    No data available in table
                  </TableCell>
                </TableRow>
              ) : (
                waitingApplications.map((app, index) => (
                  <TableRow key={app.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{app.school}</TableCell>
                    <TableCell>{app.academicYear}</TableCell>
                    <TableCell>{app.applicantType}</TableCell>
                    <TableCell>{app.leaveType}</TableCell>
                    <TableCell>{app.applicant}</TableCell>
                    <TableCell>
                      <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="View" sx={{ color: '#000' }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Delete" sx={{ color: '#f44336' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e0e0e0'
        }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Showing 0 to 0 of 0 entries
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled
              sx={{ color: '#999', borderColor: '#ddd' }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled
              sx={{ color: '#999', borderColor: '#ddd' }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ManageWaitingApplication;
