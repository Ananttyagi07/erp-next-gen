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
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Vehicle = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleDriver: '',
    vehicleLicense: '',
    vehicleContact: '',
    note: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      vehicleNumber: '',
      vehicleModel: '',
      vehicleDriver: '',
      vehicleLicense: '',
      vehicleContact: '',
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
    formData.vehicleNumber &&
    formData.vehicleModel;

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', pb: 4 }}>
      {/* Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          height: '60px',
        }}
      >
        {/* Select School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff' }}>
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

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Second School Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff' }}>
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="school1">Main Campus</MenuItem>
            <MenuItem value="school2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Session Year Dropdown */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff' }}>
            <MenuItem value="">--Session Year--</MenuItem>
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
            fontWeight: 600,
            borderRadius: '4px',
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
        <Card sx={{ boxShadow: 'none', border: 'none' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Page Title Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 2,
                borderBottom: '1px solid #000',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsBusIcon sx={{ fontSize: 28, color: '#000' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#000' }}>
                  Manage Vehicle
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
                <KeyboardArrowUpIcon
                  sx={{
                    fontSize: 24,
                    transition: 'transform 0.3s',
                    transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </IconButton>
            </Box>

            {/* Quick Link Navigation */}
            {!collapsed && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#2563eb', fontSize: '0.875rem' }}>
                  <a href="/transport/vehicle" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '8px' }}>
                    Vehicle
                  </a>
                  |
                  <a href="/transport/route" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                    Transport Route
                  </a>
                  |
                  <a href="/transport/member" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                    Transport Member
                  </a>
                </Typography>
              </Box>
            )}

            {/* Tabs and Filter Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: '1px solid #e5e5e5', mb: 3 }}>
              {/* Tabs */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  startIcon={<ListIcon sx={{ fontSize: 18 }} />}
                  onClick={() => setActiveTab(0)}
                  sx={{
                    textTransform: 'none',
                    color: activeTab === 0 ? '#000' : '#6b7280',
                    fontWeight: activeTab === 0 ? 700 : 500,
                    fontSize: '15px',
                    px: 2,
                    border: 'none',
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  List
                </Button>
                <Button
                  startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                  onClick={() => setActiveTab(1)}
                  sx={{
                    textTransform: 'none',
                    color: activeTab === 1 ? '#000' : '#6b7280',
                    fontWeight: activeTab === 1 ? 700 : 500,
                    fontSize: '15px',
                    px: 2,
                    border: 'none',
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  Add
                </Button>
              </Box>

              {/* Filter Bar on Right Side */}
              {activeTab === 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff' }}>
                      <MenuItem value="">--Select School--</MenuItem>
                      <MenuItem value="school1">Main Campus</MenuItem>
                      <MenuItem value="school2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff' }}>
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="opt1">Option 1</MenuItem>
                      <MenuItem value="opt2">Option 2</MenuItem>
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
                          borderColor: '#e5e5e5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#9ca3af',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

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
                        borderColor: '#e5e5e5',
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
                        borderColor: '#e5e5e5',
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
                        borderColor: '#e5e5e5',
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
                        borderColor: '#e5e5e5',
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
                            borderColor: '#e5e5e5',
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
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e5e5', boxShadow: 'none' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          #SL
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          School
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Vehicle Number
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Vehicle Model
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Driver
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Vehicle License
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Vehicle Contact
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e5e5', py: 1.5, fontSize: '0.875rem' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          sx={{
                            py: 6,
                            color: '#9ca3af',
                            border: '1px solid #e5e5e5',
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
                        borderColor: '#e5e5e5',
                        textTransform: 'none',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        '&:disabled': { color: '#9ca3af', borderColor: '#e5e5e5' },
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        textTransform: 'none',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        '&:disabled': { color: '#9ca3af', borderColor: '#e5e5e5' },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              // Add Form View
              <Box>
                <Box sx={{ maxWidth: '70%', mx: 'auto', py: 6 }}>
                  {/* School Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      School Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={formData.schoolName}
                        onChange={(e) => handleFormChange('schoolName', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          height: '40px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e5e5e5',
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

                  {/* Vehicle Number */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      Vehicle Number <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle Number"
                      value={formData.vehicleNumber}
                      onChange={(e) => handleFormChange('vehicleNumber', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          height: '40px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Vehicle Model */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      Vehicle Model <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle Model"
                      value={formData.vehicleModel}
                      onChange={(e) => handleFormChange('vehicleModel', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          height: '40px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Vehicle Driver */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      Vehicle Driver
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle Driver"
                      value={formData.vehicleDriver}
                      onChange={(e) => handleFormChange('vehicleDriver', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          height: '40px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Vehicle License */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      Vehicle License
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle License"
                      value={formData.vehicleLicense}
                      onChange={(e) => handleFormChange('vehicleLicense', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          height: '40px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Vehicle Contact */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      Vehicle Contact
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Vehicle Contact"
                      value={formData.vehicleContact}
                      onChange={(e) => handleFormChange('vehicleContact', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          height: '40px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Note */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 6 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        pt: 1,
                      }}
                    >
                      Note
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Note"
                      value={formData.note}
                      onChange={(e) => handleFormChange('note', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#9ca3af',
                          },
                          '& textarea::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 6 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        color: '#374151',
                        borderColor: '#e5e5e5',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        px: 5,
                        py: 1,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '0.875rem',
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
                        fontSize: '0.875rem',
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

export default Vehicle;
