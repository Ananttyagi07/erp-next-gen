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
  Add as AddIcon,
  List as ListIcon,
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Hotel as BedIcon,
} from '@mui/icons-material';

const ManageHostel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    hostelType: '',
    address: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      name: '',
      hostelType: '',
      address: '',
      note: '',
    });
  };

  const isFormValid =
    formData.schoolName &&
    formData.name &&
    formData.hostelType &&
    formData.address;

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
            <BedIcon sx={{ fontSize: 24, color: '#000' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Hostel
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
                <a href="/hostel/manage-hostel" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  Manage Hostel
                </a>
                <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
                <a href="/hostel/manage-room" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  Manage Room
                </a>
                <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
                <a href="/hostel/hostel-member" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  Hostel Member
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
                List
              </Button>
              <Button
                startIcon={<AddIcon sx={{ fontSize: 18 }} />}
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
                Add
              </Button>
            </Box>

            {/* List View */}
            {activeTab === 0 && (
              <Box>
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
                  </Box>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select defaultValue={15}>
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                      <MenuItem value={100}>Show 100 rows</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Data Table */}
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 'none', border: '1px solid #e5e5e5' }}
                >
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>#SL</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>School</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Hostel</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Hostel Type</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Address</TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#6b7280' }}>
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

            {/* Add Hostel Form */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                  {/* School Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      sx={{
                        width: '200px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'left',
                      }}
                    >
                      School Name<span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        displayEmpty
                        sx={{
                          borderRadius: '4px',
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

                  {/* Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      sx={{
                        width: '200px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'left',
                      }}
                    >
                      Name<span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Hostel Type */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      sx={{
                        width: '200px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'left',
                      }}
                    >
                      Hostel Type<span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="hostelType"
                        value={formData.hostelType}
                        onChange={handleInputChange}
                        displayEmpty
                        sx={{
                          borderRadius: '4px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e5e5e5',
                          },
                        }}
                      >
                        <MenuItem value="">--Select Hostel Type--</MenuItem>
                        <MenuItem value="boys">Boys</MenuItem>
                        <MenuItem value="girls">Girls</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Address */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      sx={{
                        width: '200px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'left',
                      }}
                    >
                      Address<span style={{ color: '#dc2626' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Note */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Typography
                      sx={{
                        width: '200px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'left',
                        pt: 1,
                      }}
                    >
                      Note
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#e5e5e5',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#e5e5e5',
                        color: '#000',
                        px: 4,
                        '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isFormValid}
                      sx={{
                        textTransform: 'none',
                        backgroundColor: '#000',
                        color: '#fff',
                        px: 4,
                        '&:hover': { backgroundColor: '#333' },
                        '&:disabled': {
                          backgroundColor: '#e5e5e5',
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ManageHostel;
