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
  InputAdornment,
} from '@mui/material';
import {
  List as ListIcon,
  RemoveCircleOutline as NonMemberIcon,
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  DirectionsBus as BusIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const TransportMember = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
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
            <BusIcon sx={{ fontSize: 24, color: '#000' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Transport Member
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
          <Box>
            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                <a href="/transport/vehicle" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  Vehicle
                </a>
                <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
                <a href="/transport/route" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  Transport Route
                </a>
                <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
                <a href="/transport/member" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  Transport Member
                </a>
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                startIcon={<ListIcon sx={{ fontSize: 18 }} />}
                onClick={() => setActiveTab(0)}
                sx={{
                  textTransform: 'none',
                  color: activeTab === 0 ? '#000' : '#6b7280',
                  backgroundColor: activeTab === 0 ? '#f3f4f6' : 'transparent',
                  fontWeight: activeTab === 0 ? 600 : 400,
                  px: 2,
                  py: 1,
                  borderRadius: '4px',
                  '&:hover': { backgroundColor: '#f3f4f6' },
                }}
              >
                Member
              </Button>
              <Button
                startIcon={<NonMemberIcon sx={{ fontSize: 18 }} />}
                onClick={() => setActiveTab(1)}
                sx={{
                  textTransform: 'none',
                  color: activeTab === 1 ? '#000' : '#6b7280',
                  backgroundColor: activeTab === 1 ? '#f3f4f6' : 'transparent',
                  fontWeight: activeTab === 1 ? 600 : 400,
                  px: 2,
                  py: 1,
                  borderRadius: '4px',
                  '&:hover': { backgroundColor: '#f3f4f6' },
                }}
              >
                Non Member
              </Button>
            </Box>

            {/* Action Bar and Filter Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {/* Export Buttons */}
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

              {/* Filter Bar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="school1">School 1</MenuItem>
                    <MenuItem value="school2">School 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="opt1">Option 1</MenuItem>
                    <MenuItem value="opt2">Option 2</MenuItem>
                  </Select>
                </FormControl>
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
                        Class
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                          <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Section
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                          <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Roll No
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                          <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                        </Box>
                      </Box>
                    </TableCell>
                    {activeTab === 0 ? (
                      <>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Transport Route
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Stop Name
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Stop KM
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Stop Fare
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                      </>
                    ) : (
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Select
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={activeTab === 0 ? 12 : 9} align="center" sx={{ py: 4, color: '#6b7280' }}>
                      No data available in table
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
                    color: '#6b7280',
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
                    color: '#6b7280',
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TransportMember;
