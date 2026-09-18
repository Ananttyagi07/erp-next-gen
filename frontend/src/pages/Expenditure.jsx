import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  IconButton,
  TextareaAutosize,
} from '@mui/material';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Expenditure = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header Row - Three Dropdowns and Global Search inline, then Session Year and Update on right */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        {/* Left side - Two School Dropdowns and Global Search */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Global Search..."
            sx={{
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e5e5e5',
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Right side - Session Year and Update */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
              <MenuItem value="2024-2025">2024-2025</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Collapsible Section Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <CropSquareIcon sx={{ fontSize: 16, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Manage Expenditure
        </Typography>
        {isCollapsed ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#000' }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 20, color: '#000' }} />
        )}
      </Box>

      {/* Black Divider */}
      <Box sx={{ borderBottom: '1px solid #000', mb: 3 }} />

      {!isCollapsed && (
        <>
          {/* Quick Links Row */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Link
              onClick={() => navigate('/accounting/discount')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Discount
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/fee-type')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Fee Type
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/fee-collection')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Fee Collection
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/manage-invoice')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Manage Invoice
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/due-invoice')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Due Invoice
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/due-receipt')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Due Receipt
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/paid-receipt')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Paid Receipt
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/due-fee-email')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Due Fee Email
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/due-fee-sms')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Due Fee SMS
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/income-head')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Income Head
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/income')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Income
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/expenditure-head')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Expenditure Head
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/accounting/expenditure')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Expenditure
            </Link>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: '2px solid #e5e5e5', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box
                onClick={() => setSelectedTab(0)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  pb: 1,
                  cursor: 'pointer',
                  borderBottom: selectedTab === 0 ? '2px solid #000' : '2px solid transparent',
                  marginBottom: '-2px',
                }}
              >
                <ListIcon sx={{ fontSize: 18, mr: 1, color: selectedTab === 0 ? '#000' : '#6b7280' }} />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: selectedTab === 0 ? 600 : 400,
                    color: selectedTab === 0 ? '#000' : '#6b7280',
                  }}
                >
                  List
                </Typography>
              </Box>
              <Box
                onClick={() => setSelectedTab(1)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  pb: 1,
                  cursor: 'pointer',
                  borderBottom: selectedTab === 1 ? '2px solid #000' : '2px solid transparent',
                  marginBottom: '-2px',
                }}
              >
                <AddIcon sx={{ fontSize: 18, mr: 1, color: selectedTab === 1 ? '#000' : '#6b7280' }} />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: selectedTab === 1 ? 600 : 400,
                    color: selectedTab === 1 ? '#000' : '#6b7280',
                  }}
                >
                  Add
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* List Tab */}
          {selectedTab === 0 && (
            <Box>
              {/* Export Buttons Row with Search on Right */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#374151',
                      fontSize: '13px',
                      '&:hover': {
                        borderColor: '#000',
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
                      borderColor: '#e5e5e5',
                      color: '#374151',
                      fontSize: '13px',
                      '&:hover': {
                        borderColor: '#000',
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
                      borderColor: '#e5e5e5',
                      color: '#374151',
                      fontSize: '13px',
                      '&:hover': {
                        borderColor: '#000',
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
                      borderColor: '#e5e5e5',
                      color: '#374151',
                      fontSize: '13px',
                      '&:hover': {
                        borderColor: '#000',
                      },
                    }}
                  >
                    PDF
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                    <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>Show</Typography>
                    <FormControl size="small">
                      <Select defaultValue={15} sx={{ fontSize: '13px', minWidth: 60 }}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>rows</Typography>
                  </Box>
                </Box>
                <Box>
                  <TextField
                    size="small"
                    placeholder="Search"
                    sx={{
                      minWidth: 200,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Table */}
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e5e5' }}>
                  <thead style={{ backgroundColor: '#f8f8f8' }}>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        #SL
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        School
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Session Year
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Expenditure Head
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Expenditure Method
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Amount
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Date
                      </th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151', border: '1px solid #e5e5e5' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="8" style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: '#6b7280', border: '1px solid #e5e5e5' }}>
                        No data available in table
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>

              {/* Pagination */}
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>
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
                      fontSize: '13px',
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
                      fontSize: '13px',
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {/* Add Tab */}
          {selectedTab === 1 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
              {/* Three Column Grid Form */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
                {/* School Name */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    School Name <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select School--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Expenditure Head */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    Expenditure Head <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Expenditure Method */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    Expenditure Method <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Reference */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    Reference
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Reference"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Amount */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    Amount <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Amount"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Date */}
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                    Date <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Note - Full Width */}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1, fontWeight: 600 }}>
                  Note
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Note"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    resize: 'vertical',
                  }}
                />
              </Box>

              {/* Buttons - Centered */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    borderColor: '#e5e5e5',
                    color: '#374151',
                    px: 4,
                    '&:hover': {
                      borderColor: '#000',
                    },
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
                    px: 4,
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
        </>
      )}
    </Box>
  );
};

export default Expenditure;
