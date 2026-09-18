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
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Chat as ChatIcon,
  List as ListIcon,
  AddBox as AddBoxIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const ComplainType = () => {
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

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {/* Module Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChatIcon sx={{ fontSize: 24, color: '#000' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Complain Type
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 20,
                transition: 'transform 0.3s',
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        </Box>

        {/* Content Area */}
        {!collapsed && (
          <>
            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Quick Link:{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#2563eb',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Complain Type
                </Box>{' '}
                |{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#2563eb',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Manage Complain
                </Box>
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    minHeight: '40px',
                    '& .MuiTab-root': {
                      minHeight: '40px',
                      textTransform: 'none',
                      fontWeight: 500,
                    },
                  }}
                >
                  <Tab icon={<ListIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="List" />
                  <Tab icon={<AddBoxIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Add" />
                </Tabs>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select School--</MenuItem>
                      <MenuItem value="school1">School 1</MenuItem>
                      <MenuItem value="school2">School 2</MenuItem>
                    </Select>
                  </FormControl>
                  {activeTab === 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: '#000', fontWeight: 500 }}>
                        Search:
                      </Typography>
                      <TextField
                        size="small"
                        sx={{
                          minWidth: 200,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                              borderColor: '#e5e5e5',
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Tab Content */}
            {activeTab === 0 ? (
              <>
                {/* Action Bar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#000',
                        '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
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
                        color: '#000',
                        '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
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
                        color: '#000',
                        '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
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
                        color: '#000',
                        '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select defaultValue={15}>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                        <MenuItem value={100}>Show 100 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {/* Data Table */}
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 'none', border: '1px solid #e5e5e5' }}
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
                            Complain Type
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
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>1</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>शासकीय वसतिगृह</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>Daily Complaint</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                              sx={{
                                textTransform: 'none',
                                borderColor: '#2563eb',
                                color: '#2563eb',
                                fontSize: '0.875rem',
                                '&:hover': {
                                  borderColor: '#1d4ed8',
                                  backgroundColor: '#eff6ff',
                                },
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                              sx={{
                                textTransform: 'none',
                                borderColor: '#dc2626',
                                color: '#dc2626',
                                fontSize: '0.875rem',
                                '&:hover': {
                                  borderColor: '#b91c1c',
                                  backgroundColor: '#fef2f2',
                                },
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Table Footer */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Showing 1 to 1 of 1 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#6b7280',
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        minWidth: '32px',
                        '&:hover': { backgroundColor: '#1d4ed8' },
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
                        color: '#6b7280',
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {/* Add Form */}
                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                  {/* School Name */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      School Name <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select displayEmpty defaultValue="">
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="school1">School 1</MenuItem>
                        <MenuItem value="school2">School 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Complain Type */}
                  <Box sx={{ mb: 6 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      Complain Type <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Complain Type"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                          },
                        },
                        '& input::placeholder': {
                          color: '#9ca3af',
                        },
                      }}
                    />
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#e5e5e5',
                        color: '#6b7280',
                        textTransform: 'none',
                        px: 3,
                        '&:hover': {
                          borderColor: '#d1d5db',
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        px: 3,
                        '&:hover': { backgroundColor: '#333' },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ComplainType;
