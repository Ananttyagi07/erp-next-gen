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
  Avatar,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const IssueReturn = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    schoolName: '',
    book: '',
    isbnNo: '',
    edition: '',
    author: '',
    language: '',
    price: '',
    quantity: '',
    almiraNo: '',
    returnDate: '',
    libraryMember: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      book: '',
      isbnNo: '',
      edition: '',
      author: '',
      language: '',
      price: '',
      quantity: '',
      almiraNo: '',
      returnDate: '',
      libraryMember: '',
    });
  };

  const handleIssue = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  // Check if all required fields are filled
  const isFormValid = formData.schoolName && formData.book && formData.returnDate && formData.libraryMember;

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', pb: 4 }}>
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
        <Card sx={{ boxShadow: 'none' }}>
          <CardContent>
            {/* Section Header with Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MenuBookIcon sx={{ fontSize: 28, color: '#000' }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#000' }}>
                Manage Issue & Return
              </Typography>
            </Box>

            <Divider sx={{ mb: 3, borderColor: '#000' }} />

            {/* Quick Link Navigation */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
              <Tab icon={<AddIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="New Issue" />
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
                        borderRadius: '15px',
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
                        borderRadius: '15px',
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
                        borderRadius: '15px',
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
                        borderRadius: '15px',
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
                          borderRadius: '15px',
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
                          borderRadius: '15px',
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
                    <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
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
                            Photo
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Student
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
                            Issue Date
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Due Date
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Return Date
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
                            Action
                            <ArrowDropDownIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={11}
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
              // New Issue Form View
              <Box>
                <Box sx={{ maxWidth: 700, mx: 'auto', py: 4 }}>
                  {/* School Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
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
                          borderRadius: '15px',
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

                  {/* Book */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Book <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.book}
                        onChange={(e) => handleFormChange('book', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '15px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select Book--</MenuItem>
                        <MenuItem value="book1">Introduction to Physics</MenuItem>
                        <MenuItem value="book2">Advanced Mathematics</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* ISBN No */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      ISBN No
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.isbnNo}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Edition */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Edition
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.edition}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Author */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Author
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.author}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Language */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Language
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.language}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Price
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.price}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Quantity */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Quantity
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.quantity}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Almira No */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Almira No
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.almiraNo}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f3f4f6',
                          borderRadius: '15px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Return Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Return Date <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => handleFormChange('returnDate', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
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

                  {/* Library Member */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: 160,
                        color: '#374151',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                    >
                      Library Member <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.libraryMember}
                        onChange={(e) => handleFormChange('libraryMember', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDropDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '15px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9ca3af',
                          },
                        }}
                      >
                        <MenuItem value="">--Select Member--</MenuItem>
                        <MenuItem value="member1">John Doe</MenuItem>
                        <MenuItem value="member2">Jane Smith</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 4 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        color: '#000',
                        borderColor: '#000',
                        backgroundColor: '#fff',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        borderRadius: '4px',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: '#333',
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleIssue}
                      disabled={!isFormValid}
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        borderRadius: '4px',
                        fontWeight: 500,
                        '&:hover': { backgroundColor: '#1f2937' },
                        '&:disabled': { backgroundColor: '#d1d5db', color: '#9ca3af' },
                      }}
                    >
                      Issue
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

export default IssueReturn;
