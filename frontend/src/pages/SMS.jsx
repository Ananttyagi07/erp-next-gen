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
  Email as EmailIcon,
  List as ListIcon,
  AddBox as AddBoxIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const SMS = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [smsText, setSmsText] = useState('');
  const maxChars = 160;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSmsChange = (event) => {
    setSmsText(event.target.value);
  };

  const remainingChars = maxChars - smsText.length;

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
            <EmailIcon sx={{ fontSize: 24, color: '#000' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage SMS
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
                  Manage Email
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
                  Manage SMS
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
                  <Tab icon={<AddBoxIcon sx={{ fontSize: 18, mr: 0.5 }} />} iconPosition="start" label="Send SMS" />
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
                            Session Year
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Receiver Type
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            SMS
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                              <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Send Date
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
                        <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#6b7280' }}>
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
              </>
            ) : (
              <>
                {/* Send SMS Form */}
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

                  {/* Receiver Type */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      Receiver Type <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select displayEmpty defaultValue="">
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="parent">Parent</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Receiver */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      Receiver <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select displayEmpty defaultValue="">
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="individual">Individual</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* SMS */}
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      SMS <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="SMS"
                      value={smsText}
                      onChange={handleSmsChange}
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
                        '& textarea::placeholder': {
                          color: '#9ca3af',
                        },
                      }}
                    />
                  </Box>

                  {/* Character Count */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      You have remain character/ letter :{remainingChars}
                    </Typography>
                  </Box>

                  {/* Gateway */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      Gateway <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select displayEmpty defaultValue="">
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="gateway1">Gateway 1</MenuItem>
                        <MenuItem value="gateway2">Gateway 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Dynamic Tag */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      Dynamic Tag
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2563eb',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      [name]
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
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

export default SMS;
