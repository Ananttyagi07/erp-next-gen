import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CampaignOutlined as LoudspeakerIcon,
  ExpandLess as ExpandIcon,
  List as ListIcon,
  Add as AddIcon,
  UnfoldMore as SortIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';

const AssetCategory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTable, setSearchTable] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [headerSchool, setHeaderSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [listSchoolFilter, setListSchoolFilter] = useState('');

  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    note: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // API call here
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      name: '',
      note: '',
    });
    setActiveTab(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e7eb',
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Left Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={headerSchool}
            onChange={(e) => setHeaderSchool(e.target.value)}
            displayEmpty
            size="small"
            IconComponent={ArrowDownIcon}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        {/* Center Global Search */}
        <TextField
          placeholder="Global Search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          size="small"
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
              fontSize: '0.875rem',
              backgroundColor: '#fff',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
            },
          }}
        />

        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#d1d5db' }} />

        {/* Right Controls */}
        <FormControl sx={{ minWidth: 180 }}>
          <Select
            value={headerSchool}
            onChange={(e) => setHeaderSchool(e.target.value)}
            displayEmpty
            size="small"
            IconComponent={ArrowDownIcon}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            displayEmpty
            size="small"
            IconComponent={ArrowDownIcon}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
          >
            <MenuItem value="">--Session Year--</MenuItem>
            <MenuItem value="2024">2024-2025</MenuItem>
            <MenuItem value="2023">2023-2024</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            textTransform: 'none',
            px: 3,
            py: 0.75,
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#1f2937' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}>
          <CardContent sx={{ p: 3 }}>
            {/* Section Header */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LoudspeakerIcon sx={{ fontSize: 24, color: '#374151' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '1.125rem' }}>
                    Manage Category
                  </Typography>
                </Box>
                <ExpandIcon sx={{ fontSize: 24, color: '#6b7280' }} />
              </Box>
              <Divider sx={{ borderColor: '#000', borderBottomWidth: 1 }} />
            </Box>

            {/* Quick Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
                Quick Link:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  component="a"
                  href="/asset/vendor"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Vendor
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Typography
                  component="a"
                  href="/asset/store"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Store
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Typography
                  component="a"
                  href="/asset/category"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Category
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Typography
                  component="a"
                  href="/asset/item"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Item
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Typography
                  component="a"
                  href="/asset/purchase"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Purchase
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>|</Typography>
                <Typography
                  component="a"
                  href="/asset/issue"
                  sx={{ color: '#2563eb', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Issue
                </Typography>
              </Box>
            </Box>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: '1px solid #e5e7eb',
                mb: 3,
                minHeight: 'auto',
                '& .MuiTab-root': {
                  minHeight: 'auto',
                  py: 1.5,
                  px: 2,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#9ca3af',
                  '&.Mui-selected': {
                    color: '#111827',
                    fontWeight: 600,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#000',
                  height: 2,
                },
              }}
            >
              <Tab icon={<ListIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
              <Tab icon={<AddIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
            </Tabs>

            {/* LIST VIEW */}
            {activeTab === 0 && (
              <Box>
                {/* Export Buttons and Filters */}
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
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
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

                  <Box>
                    <FormControl sx={{ minWidth: 180, mb: 1 }}>
                      <Select
                        value={listSchoolFilter}
                        onChange={(e) => setListSchoolFilter(e.target.value)}
                        displayEmpty
                        size="small"
                        IconComponent={ArrowDownIcon}
                        sx={{
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                        }}
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="1">Main Campus</MenuItem>
                        <MenuItem value="2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {/* Search Box */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                    Search:
                  </Typography>
                  <TextField
                    size="small"
                    value={searchTable}
                    onChange={(e) => setSearchTable(e.target.value)}
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

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            #SL
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            School
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Name
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Note
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Status
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Action
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={6}
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
            )}

            {/* ADD CATEGORY FORM VIEW */}
            {activeTab === 1 && (
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
                        IconComponent={ArrowDownIcon}
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
                        <MenuItem value="1">Main Campus</MenuItem>
                        <MenuItem value="2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Name */}
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
                      Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
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
                      rows={6}
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
                      disabled={!formData.schoolName || !formData.name}
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

export default AssetCategory;
