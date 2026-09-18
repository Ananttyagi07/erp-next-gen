// Manage Fee Type - Complete UI Implementation
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Link,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Calculate as CalculateIcon,
  List as ListIcon,
  AddBox as AddBoxIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeeType = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Global Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          height: '60px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
              <MenuItem value="school1">School 1</MenuItem>
              <MenuItem value="school2">School 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Global Search"
            sx={{ minWidth: 250 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: '1px solid #e5e5e5',
            pl: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
              <MenuItem value="school1">School 1</MenuItem>
              <MenuItem value="school2">School 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
              <MenuItem value="2023-24">2023-24</MenuItem>
              <MenuItem value="2024-25">2024-25</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Manage Fee Type Section */}
      <Box sx={{ px: 3, py: 2 }}>
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            cursor: 'pointer',
            borderBottom: '1px solid #000',
            mb: 2,
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalculateIcon sx={{ fontSize: 20, color: '#374151' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
              Manage Fee Type
            </Typography>
          </Box>
          <IconButton size="small">
            <KeyboardArrowDownIcon
              sx={{
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </Box>

        {/* Collapsible Content */}
        {!collapsed && (
          <Box>
            {/* Quick Links */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/discount'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Discount
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/fee-type'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Fee Type
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/fee-collection'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Fee Collection
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/manage-invoice'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Manage Invoice
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/due-invoice'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Due Invoice
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/due-receipt'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Due Receipt
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/paid-receipt'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Paid Receipt
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/due-fee-email'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Due Fee Email
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/due-fee-sms'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Due Fee SMS
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/income-head'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Income Head
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/income'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Income
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/expenditure-head'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Expenditure Head
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/accounting/expenditure'); }}
                sx={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              >
                Expenditure
              </Link>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 2 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  minHeight: 40,
                  '& .MuiTab-root': {
                    minHeight: 40,
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#6b7280',
                  },
                  '& .Mui-selected': {
                    color: '#000 !important',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#000',
                  },
                }}
              >
                <Tab icon={<ListIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
                <Tab icon={<AddBoxIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
              </Tabs>
            </Box>

            {/* List Tab */}
            {activeTab === 0 && (
              <Box>
                {/* Table Controls */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#374151',
                        fontSize: '12px',
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#374151',
                        fontSize: '12px',
                      }}
                    >
                      Excel
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#374151',
                        fontSize: '12px',
                      }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#374151',
                        fontSize: '12px',
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select defaultValue={15} sx={{ fontSize: '12px' }}>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      sx={{
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': {
                          fontSize: '12px',
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* DataTable */}
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: 'none',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            #SL
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            School
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Title
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Note
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: '#6b7280' }}>
                          No data available in table
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Table Info and Pagination */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#9ca3af',
                        fontSize: '12px',
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#9ca3af',
                        fontSize: '12px',
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Add Tab */}
            {activeTab === 1 && (
              <Box sx={{ maxWidth: 600 }}>
                {/* School Name */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                    School Name <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="school1">School 1</MenuItem>
                      <MenuItem value="school2">School 2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Fee Type */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                    Fee Type <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="tuition">Tuition Fee</MenuItem>
                      <MenuItem value="admission">Admission Fee</MenuItem>
                      <MenuItem value="exam">Exam Fee</MenuItem>
                      <MenuItem value="transport">Transport Fee</MenuItem>
                      <MenuItem value="library">Library Fee</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Title */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                    Title <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Title"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        '& fieldset': { borderColor: '#e5e5e5' },
                      }
                    }}
                  />
                </Box>

                {/* Note */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                    Note
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Note"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        '& fieldset': { borderColor: '#e5e5e5' },
                      }
                    }}
                  />
                </Box>

                {/* Form Actions */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#374151',
                      px: 3,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#000',
                      color: '#fff',
                      px: 3,
                      '&:hover': { backgroundColor: '#333' },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeeType;
