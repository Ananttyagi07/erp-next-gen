import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
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
  Divider,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AssetIssue = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    schoolName: '',
    userType: '',
    issueTo: '',
    category: '',
    asset: '',
    quantity: '',
    issueDate: '',
    checkIn: '',
    note: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      userType: '',
      issueTo: '',
      category: '',
      asset: '',
      quantity: '',
      issueDate: '',
      checkIn: '',
      note: '',
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.schoolName &&
    formData.userType &&
    formData.issueTo &&
    formData.category &&
    formData.asset &&
    formData.quantity &&
    formData.issueDate &&
    formData.checkIn;

  // Dummy data for the table
  const issueData = [];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      {/* Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e7eb',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Select School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select displayEmpty defaultValue="">
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="school1">Main Campus</MenuItem>
            <MenuItem value="school2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Global Search */}
        <TextField
          size="small"
          placeholder="Global Search"
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
            },
          }}
        />

        {/* Second School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select displayEmpty defaultValue="">
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="school1">Main Campus</MenuItem>
            <MenuItem value="school2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Session Year Dropdown */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select displayEmpty defaultValue="">
            <MenuItem value="">Session Year</MenuItem>
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
          </Select>
        </FormControl>

        {/* Update Button */}
        <Button
          variant="contained"
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

      {/* Main Content */}
      <Box sx={{ px: 3, pt: 3 }}>
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            {/* Section Header with Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CampaignIcon sx={{ fontSize: 28, color: '#000' }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#000' }}>
                Manage Issue
              </Typography>
            </Box>

            <Divider sx={{ mb: 3, borderColor: '#000' }} />

            {/* Quick Link Navigation */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                <a href="/asset/vendor" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '8px' }}>
                  Vendor
                </a>
                |
                <a href="/asset/store" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Store
                </a>
                |
                <a href="/asset/category" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Category
                </a>
                |
                <a href="/asset/item" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Item
                </a>
                |
                <a href="/asset/purchase" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Purchase
                </a>
                |
                <a href="/asset/issue" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  Issue
                </a>
              </Typography>
            </Box>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: '1px solid #e5e7eb',
                mb: 3,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#6b7280',
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

            {/* Tab Content */}
            {activeTab === 0 ? (
              // List View
              <Box>
                {/* Export Buttons and Show Rows */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2.5,
                        py: 0.5,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2.5,
                        py: 0.5,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      Excel
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2.5,
                        py: 0.5,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2.5,
                        py: 0.5,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl sx={{ minWidth: 140 }}>
                      <Select
                        defaultValue={15}
                        size="small"
                        sx={{
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value={10}>Show 10 rows</MenuItem>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Filter Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select displayEmpty defaultValue="">
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="school1">Main Campus</MenuItem>
                        <MenuItem value="school2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      sx={{
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            #SL
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            School
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Category
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Asset
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Quantity
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            User Type
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Issue To
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Check In
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Check Out
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Action
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={10}
                          align="center"
                          sx={{
                            py: 6,
                            color: '#9ca3af',
                            border: '1px solid #e5e7eb',
                            fontSize: '0.875rem',
                          }}
                        >
                          No data available in table
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        '&:disabled': { color: '#9ca3af', borderColor: '#e5e7eb' },
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        '&:disabled': { color: '#9ca3af', borderColor: '#e5e7eb' },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              // Add View
              <Box>
                <Box sx={{ maxWidth: 900, mx: 'auto', px: 6, py: 4 }}>
                  {/* School Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      School Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.schoolName}
                        onChange={(e) => handleFormChange('schoolName', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="school1">Main Campus</MenuItem>
                        <MenuItem value="school2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* User Type */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      User Type <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.userType}
                        onChange={(e) => handleFormChange('userType', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Issue To */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Issue To <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.issueTo}
                        onChange={(e) => handleFormChange('issueTo', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="user1">John Doe</MenuItem>
                        <MenuItem value="user2">Jane Smith</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Category */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Category <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="furniture">Furniture</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Asset */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Asset <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.asset}
                        onChange={(e) => handleFormChange('asset', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="laptop">Laptop</MenuItem>
                        <MenuItem value="desk">Desk</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Quantity */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Quantity <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="Quantity"
                      value={formData.quantity}
                      onChange={(e) => handleFormChange('quantity', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Issue Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Issue Date <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => handleFormChange('issueDate', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  {/* Check In */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      Check In <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Check In"
                      value={formData.checkIn}
                      onChange={(e) => handleFormChange('checkIn', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Note */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        pt: 1.5,
                      }}
                    >
                      Note
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      placeholder="Note"
                      value={formData.note}
                      onChange={(e) => handleFormChange('note', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, ml: 0 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        px: 5,
                        py: 1,
                        borderRadius: '4px',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: '#9ca3af',
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        px: 5,
                        py: 1,
                        borderRadius: '4px',
                        fontWeight: 500,
                        '&:hover': { backgroundColor: '#1f2937' },
                        '&:disabled': { backgroundColor: '#d1d5db', color: '#9ca3af' },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AssetIssue;
