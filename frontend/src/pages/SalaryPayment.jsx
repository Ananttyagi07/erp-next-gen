// Manage Payment - Complete UI Implementation
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
  Avatar,
  Link,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  AttachMoney as MoneyIcon,
  List as ListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SalaryPayment = () => {
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

      {/* Manage Payment Section */}
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
            <MoneyIcon sx={{ fontSize: 20, color: '#374151' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
              Manage Payment
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
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/payroll/salary-grade');
                }}
                sx={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Salary Grade
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/payroll/salary-payment');
                }}
                sx={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Salary Payment
              </Link>
              <Typography sx={{ color: '#6b7280' }}>|</Typography>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/payroll/salary-history');
                }}
                sx={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Salary History
              </Link>
            </Box>

            {/* Filter Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 2,
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              {/* School Name */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
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

              {/* User Type */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                  User Type <span style={{ color: '#dc2626' }}>*</span>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Payment To */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                  Payment To <span style={{ color: '#dc2626' }}>*</span>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="user1">User 1</MenuItem>
                    <MenuItem value="user2">User 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Find Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'none',
                  px: 4,
                  height: '40px',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Find
              </Button>
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
                  <TextField
                    size="small"
                    placeholder="Search"
                    sx={{
                      minWidth: 200,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '12px',
                      },
                    }}
                  />
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
                            Photo
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Name
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Month
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Grade Name
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Salary Type
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Total Allowance
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Total Deduction
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Gross Salary
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Net Salary
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
                        <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#6b7280' }}>
                          No data available in table
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mt: 2,
                    gap: 1,
                  }}
                >
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
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SalaryPayment;
