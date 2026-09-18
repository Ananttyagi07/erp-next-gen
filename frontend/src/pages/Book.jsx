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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Book = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    schoolName: '',
    title: '',
    bookId: 'BK00001',
    isbnNo: '',
    edition: '',
    author: '',
    language: '',
    price: '',
    quantity: '',
    almiraNo: '',
    bookCover: null,
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, bookCover: file }));
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      title: '',
      bookId: 'BK00001',
      isbnNo: '',
      edition: '',
      author: '',
      language: '',
      price: '',
      quantity: '',
      almiraNo: '',
      bookCover: null,
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  // Check if all required fields are filled
  const isFormValid = formData.schoolName && formData.title && formData.quantity;

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
              <MenuBookIcon sx={{ fontSize: 28, color: '#000' }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#000' }}>
                Manage Book
              </Typography>
            </Box>

            {/* Quick Link Navigation */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Quick Link:{' '}
                <a href="/library/book" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '8px' }}>
                  Manage Book
                </a>
                |
                <a href="/library/member" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Library Member
                </a>
                |
                <a href="/library/issue-return" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 8px' }}>
                  Issue & Return
                </a>
                |
                <a href="/library/ebook" style={{ color: '#2563eb', textDecoration: 'none', marginLeft: '8px' }}>
                  E-Book
                </a>
              </Typography>
            </Box>

            <Divider sx={{ mb: 3, borderColor: '#000' }} />

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
                            Title
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Book ID
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            ISBN No
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Author
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Book Cover
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Price
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
                        textAlign: 'right',
                        pr: 2,
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

                  {/* Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Title <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
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

                  {/* Book ID */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Book ID <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.bookId}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '4px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* ISBN No */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      ISBN No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="ISBN No"
                      value={formData.isbnNo}
                      onChange={(e) => handleFormChange('isbnNo', e.target.value)}
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

                  {/* Edition */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Edition
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Edition"
                      value={formData.edition}
                      onChange={(e) => handleFormChange('edition', e.target.value)}
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

                  {/* Author */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Author
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Author"
                      value={formData.author}
                      onChange={(e) => handleFormChange('author', e.target.value)}
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

                  {/* Language */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Language
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Language"
                      value={formData.language}
                      onChange={(e) => handleFormChange('language', e.target.value)}
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

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Price
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => handleFormChange('price', e.target.value)}
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

                  {/* Quantity */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Quantity <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Quantity"
                      type="number"
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

                  {/* Almira No */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                      }}
                    >
                      Almira No
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Almira No"
                      value={formData.almiraNo}
                      onChange={(e) => handleFormChange('almiraNo', e.target.value)}
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

                  {/* Book Cover Upload */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 180,
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                        pr: 2,
                        pt: 1,
                      }}
                    >
                      Book Cover
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<AttachFileIcon />}
                        sx={{
                          color: '#374151',
                          borderColor: '#d1d5db',
                          backgroundColor: '#fff',
                          textTransform: 'none',
                          px: 3,
                          py: 1,
                          borderRadius: '4px',
                          fontWeight: 500,
                          '&:hover': {
                            borderColor: '#9ca3af',
                            backgroundColor: '#f9fafb',
                          },
                        }}
                      >
                        Upload
                        <input type="file" hidden accept=".jpg,.jpeg,.png,.gif" onChange={handleFileUpload} />
                      </Button>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#6b7280' }}>
                        Dimension:- Max-W: 600px, Max-H: 800px
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', color: '#6b7280' }}>
                        Image file format: .jpg, .jpeg, .png or .gif
                      </Typography>
                      {formData.bookCover && (
                        <Typography variant="body2" sx={{ mt: 1, color: '#374151' }}>
                          Selected: {formData.bookCover.name}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
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

export default Book;
