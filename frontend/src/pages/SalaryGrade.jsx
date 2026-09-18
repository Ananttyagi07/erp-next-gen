// Manage Salary Grade - Complete UI Implementation
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
  Grid,
  Link,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  AttachMoney as MoneyIcon,
  List as ListIcon,
  AddBox as AddBoxIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SalaryGrade = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Sample data for the table
  const salaryGrades = [
    {
      id: 1,
      school: 'Main Campus',
      gradeName: 'Grade A',
      basicSalary: '₹50,000',
      hourlyRate: '₹300',
      grossSalary: '₹65,000',
      netSalary: '₹58,500',
    },
    {
      id: 2,
      school: 'Branch Campus',
      gradeName: 'ग्रेड बी',
      basicSalary: '₹40,000',
      hourlyRate: '₹250',
      grossSalary: '₹52,000',
      netSalary: '₹46,800',
    },
  ];

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

      {/* Manage Salary Grade Section */}
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
              Manage Salary Grade
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
                            School
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
                            Basic Salary
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Hourly Rate
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
                      {salaryGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.id}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.school}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.gradeName}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.basicSalary}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.hourlyRate}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.grossSalary}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>{grade.netSalary}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                  backgroundColor: '#000',
                                  color: '#fff',
                                  textTransform: 'none',
                                  fontSize: '11px',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  '&:hover': { backgroundColor: '#333' },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<VisibilityIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                  backgroundColor: '#000',
                                  color: '#fff',
                                  textTransform: 'none',
                                  fontSize: '11px',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  '&:hover': { backgroundColor: '#333' },
                                }}
                              >
                                View
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                  backgroundColor: '#dc2626',
                                  color: '#fff',
                                  textTransform: 'none',
                                  fontSize: '11px',
                                  minWidth: 'auto',
                                  px: 1,
                                  py: 0.5,
                                  '&:hover': { backgroundColor: '#b91c1c' },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
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
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#000',
                      color: '#fff',
                      fontSize: '12px',
                      minWidth: '32px',
                      '&:hover': { backgroundColor: '#333' },
                    }}
                  >
                    1
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
                    Next
                  </Button>
                </Box>
              </Box>
            )}

            {/* Add Tab */}
            {activeTab === 1 && (
              <Box>
                <Grid container spacing={3}>
                  {/* School Name */}
                  <Grid item xs={12} sm={4}>
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
                  </Grid>

                  {/* Grade Name */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Grade Name <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Grade Name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Basic Salary */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Basic Salary <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Basic Salary"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* House Rent */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      House Rent
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="House Rent"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Transport Allowance */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Transport Allowance
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Transport Allowance"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Medical Allowance */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Medical Allowance
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Medical Allowance"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Over Time Hourly Rate */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Over Time Hourly Rate
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Over Time Hourly Rate"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Provident Fund */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Provident Fund
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Provident Fund"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Hourly Rate */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Hourly Rate
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Hourly Rate"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Total Allowance */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Total Allowance
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Total Allowance"
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                          backgroundColor: '#f9fafb',
                        }
                      }}
                    />
                  </Grid>

                  {/* Total Deduction */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Total Deduction
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Total Deduction"
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                          backgroundColor: '#f9fafb',
                        }
                      }}
                    />
                  </Grid>

                  {/* Gross Salary */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Gross Salary
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Gross Salary"
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                          backgroundColor: '#f9fafb',
                        }
                      }}
                    />
                  </Grid>

                  {/* Net Salary */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Net Salary
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Net Salary"
                      disabled
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                          backgroundColor: '#f9fafb',
                        }
                      }}
                    />
                  </Grid>

                  {/* Note */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                      Note
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Note"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e5e5e5' },
                        }
                      }}
                    />
                  </Grid>
                </Grid>

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

export default SalaryGrade;
