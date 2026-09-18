import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  TextareaAutosize,
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Folder as FolderIcon,
  List as ListIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ExpenditureHead = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header Row */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        pb: 2,
        borderBottom: '1px solid #e5e5e5'
      }}>
        {/* First School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            displayEmpty
            defaultValue=""
            sx={{
              fontSize: '14px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e5e5',
              },
            }}
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="school1">School 1</MenuItem>
            <MenuItem value="school2">School 2</MenuItem>
          </Select>
        </FormControl>

        {/* Global Search */}
        <TextField
          size="small"
          placeholder="Global Search"
          sx={{
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              fontSize: '14px',
              '& fieldset': {
                borderColor: '#e5e5e5',
              },
            },
          }}
        />

        {/* Vertical Divider */}
        <Box sx={{
          width: '1px',
          height: '32px',
          backgroundColor: '#e5e5e5',
          mx: 1
        }} />

        {/* Second School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            displayEmpty
            defaultValue=""
            sx={{
              fontSize: '14px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e5e5',
              },
            }}
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="school1">School 1</MenuItem>
            <MenuItem value="school2">School 2</MenuItem>
          </Select>
        </FormControl>

        {/* Session Year Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            displayEmpty
            defaultValue=""
            sx={{
              fontSize: '14px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e5e5',
              },
            }}
          >
            <MenuItem value="">--Session Year--</MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
            <MenuItem value="2023-2024">2023-2024</MenuItem>
          </Select>
        </FormControl>

        {/* Update Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            textTransform: 'none',
            fontSize: '14px',
            px: 3,
            ml: 'auto',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Collapsible Section */}
      <Paper elevation={0} sx={{ border: '1px solid #e5e5e5', borderRadius: '4px' }}>
        {/* Title Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FolderIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#374151', flex: 1 }}>
            Manage Expenditure Head
          </Typography>
          <IconButton size="small">
            {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </IconButton>
        </Box>

        {/* Black Divider */}
        <Box sx={{ height: '1px', backgroundColor: '#000' }} />

        <Collapse in={!isCollapsed}>
          <Box sx={{ p: 3 }}>
            {/* Quick Links and School Filter Row */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/discount');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Discount
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/fee-type');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Fee Type
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/fee-collection');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Fee Collection
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/manage-invoice');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Manage Invoice
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/due-invoice');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Due Invoice
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/due-receipt');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Due Receipt
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/paid-receipt');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Paid Receipt
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/due-fee-email');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Due Fee Email
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/due-fee-sms');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Due Fee SMS
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/income-head');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Income Head
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/income');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Income
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/expenditure-head');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Expenditure Head
                </Link>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/accounting/expenditure');
                  }}
                  sx={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Expenditure
                </Link>
              </Box>

              {/* School Filter Dropdown */}
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  displayEmpty
                  defaultValue=""
                  sx={{
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e5e5e5',
                    },
                  }}
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  <MenuItem value="school1">School 1</MenuItem>
                  <MenuItem value="school2">School 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Tab Bar */}
            <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '14px',
                    color: '#6b7280',
                    minHeight: '48px',
                    '&.Mui-selected': {
                      color: '#000',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#000',
                  },
                }}
              >
                <Tab icon={<ListIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
                <Tab icon={<AddIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
              </Tabs>
            </Box>

            {/* LIST TAB */}
            {selectedTab === 0 && (
              <Box>
                {/* Export Buttons and Search */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      Excel
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        defaultValue={15}
                        sx={{
                          fontSize: '12px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e5e5e5',
                          },
                        }}
                      >
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#374151' }}>Search:</Typography>
                    <TextField
                      size="small"
                      sx={{
                        width: '200px',
                        '& .MuiOutlinedInput-root': {
                          fontSize: '14px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Table */}
                <TableContainer sx={{ border: '1px solid #e5e5e5', borderRadius: '4px', mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f8f8f8' }}>
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                          #SL
                        </TableCell>
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                          School
                        </TableCell>
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                          Expenditure Head
                        </TableCell>
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                          Note
                        </TableCell>
                        <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: '#6b7280', fontSize: '14px' }}>
                          No data available in table
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#6b7280',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '12px',
                        color: '#6b7280',
                        borderColor: '#e5e5e5',
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* ADD TAB */}
            {selectedTab === 1 && (
              <Box>
                <Box sx={{ maxWidth: '800px' }}>
                  {/* School Name */}
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
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

                  {/* Expenditure Head */}
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                      Expenditure Head <span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Expenditure Head"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Note */}
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                      Note
                    </Typography>
                    <TextareaAutosize
                      minRows={6}
                      placeholder="Note"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        resize: 'vertical',
                      }}
                    />
                  </Box>
                </Box>

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      color: '#374151',
                      borderColor: '#e5e5e5',
                      px: 3,
                      '&:hover': {
                        borderColor: '#000',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      backgroundColor: '#000',
                      color: '#fff',
                      px: 3,
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default ExpenditureHead;
