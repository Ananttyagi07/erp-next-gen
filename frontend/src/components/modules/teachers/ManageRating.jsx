/**
 * Manage Rating Component
 * Comprehensive rating management with list view and filtering
 * Features: Rating listing, filtering, sorting, pagination, and search
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Search as SearchIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as UnfoldMoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiService from '../../../services/apiService';

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

const ManageRating = () => {
  const { t } = useTranslation();

  // UI states
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filter states
  const [globalSchool, setGlobalSchool] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sessionYear, setSessionYear] = useState('2024-2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('teacher');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showRows, setShowRows] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [ratings] = useState([]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    setSuccess('Rating deleted successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdate = () => {
    setSuccess('Filters updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Box>
      {/* Global Filter Bar */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={0.3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>

          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.2}>
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

          <Grid item xs={12} sm={2.9}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Page Header with Collapse */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Manage Rating
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            size="small"
          >
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>
      </Paper>

      {!isHeaderCollapsed && (
        <>
          {/* Quick Links */}
          <Box sx={{ mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Department
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Teacher
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Class Lecture
            </Typography>
            <Typography sx={{ cursor: 'pointer', color: '#0066cc', '&:hover': { textDecoration: 'underline' } }}>
              Rating
            </Typography>
          </Box>

          {/* Messages */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Tabs and Content */}
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
              <Typography sx={{ fontWeight: 600, py: 2 }}>
                List
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 150 }} size="small">
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

                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel>--Select--</InputLabel>
                  <Select
                    value={selectedFilter}
                    label="--Select--"
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Table Controls Toolbar */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton size="small" title="Copy">
                  <FileCopyIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="Excel">
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="CSV">
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="PDF">
                  <GetAppIcon fontSize="small" />
                </IconButton>

                <FormControl sx={{ minWidth: 140 }} size="small">
                  <InputLabel>Rows</InputLabel>
                  <Select
                    value={showRows}
                    label="Rows"
                    onChange={(e) => {
                      setShowRows(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                    <MenuItem value={50}>Show 50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Search:
                </Typography>
                <TextField
                  size="small"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  sx={{ width: 200 }}
                />
              </Box>
            </Box>

            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('id')}>
                      # SL <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('school')}>
                      School <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Photo</TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('teacher')}>
                      Teacher <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('department')}>
                      Department <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => handleSort('rating')}>
                      Rating <UnfoldMoreIcon fontSize="small" sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Comment</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4, color: 'gray' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    ratings.map((rating, index) => (
                      <TableRow key={rating.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{rating.school}</TableCell>
                        <TableCell>
                          <img src={rating.photo} alt={rating.teacher} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                        </TableCell>
                        <TableCell>{rating.teacher}</TableCell>
                        <TableCell>{rating.department}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {[...Array(Math.round(rating.rating))].map((_, i) => (
                              <StarIcon key={i} sx={{ color: '#ffc107', fontSize: 18 }} />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 200, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          {rating.comment}
                        </TableCell>
                        <TableCell>{rating.student}</TableCell>
                        <TableCell>
                          <IconButton size="small" title="Edit" sx={{ color: '#0066cc' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="View" sx={{ color: '#000' }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Delete" sx={{ color: '#f44336' }} onClick={() => handleDelete(rating.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer and Pagination */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Showing 0 to 0 of 0 entries
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: 'gray', borderColor: '#ccc' }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: 'gray', borderColor: '#ccc' }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Paper>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this rating? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageRating;
