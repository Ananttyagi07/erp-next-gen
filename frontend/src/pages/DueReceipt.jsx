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
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  GridOn as GridIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DueReceipt = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <GridIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#374151', flex: 1 }}>
            Manage Due Receipt
          </Typography>
          <IconButton size="small">
            {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </IconButton>
        </Box>

        {/* Black Divider */}
        <Box sx={{ height: '1px', backgroundColor: '#000' }} />

        <Collapse in={!isCollapsed}>
          <Box sx={{ p: 3 }}>
            {/* Quick Links */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
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

            {/* Filter Row */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 2,
              mb: 3,
              alignItems: 'end'
            }}>
              {/* School Name */}
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 0.5 }}>
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

              {/* Class */}
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 0.5 }}>
                  Class <span style={{ color: '#dc2626' }}>*</span>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="class1">Class 1</MenuItem>
                    <MenuItem value="class2">Class 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Section */}
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 0.5 }}>
                  Section <span style={{ color: '#dc2626' }}>*</span>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="a">A</MenuItem>
                    <MenuItem value="b">B</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Student */}
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 0.5 }}>
                  Student
                </Typography>
                <FormControl fullWidth size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="student1">Student 1</MenuItem>
                    <MenuItem value="student2">Student 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Find Button */}
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Tab Title - Invoice Receipt */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '2px solid #000',
              pb: 1,
              mb: 3
            }}>
              <ListIcon sx={{ fontSize: 18, mr: 1, color: '#000' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>
                Invoice Receipt
              </Typography>
            </Box>

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
                      Invoice Number
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                      Student/Sale To
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                      Class
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                      Net Amount
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e5e5', py: 1.5 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4, color: '#6b7280', fontSize: '14px' }}>
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
        </Collapse>
      </Paper>
    </Box>
  );
};

export default DueReceipt;
