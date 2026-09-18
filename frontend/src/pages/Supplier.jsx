import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
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
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ExpandMore as ExpandMoreIcon,
  List as ListIcon,
  Add as AddIcon,
  ArrowUpward as SortIcon,
} from '@mui/icons-material';

const Supplier = () => {
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [searchTable, setSearchTable] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterSchool, setFilterSchool] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    schoolName: '',
    supplier: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    console.log('Update clicked');
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      supplier: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      note: '',
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Top Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {/* Left: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolLeft}
            onChange={(e) => setSelectedSchoolLeft(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
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

        {/* Center: Global Search */}
        <TextField
          placeholder="Global Search"
          variant="outlined"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
            },
          }}
        />

        {/* Right Center: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolRight}
            onChange={(e) => setSelectedSchoolRight(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
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

        {/* Far Right: Session Year Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Session Year--</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="--Session Year--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
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

        {/* Update Button */}
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            textTransform: 'none',
            px: 4,
            borderRadius: '6px',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#1f2937' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main White Container */}
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Title with Icons */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CampaignIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                    Manage Supplier
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#6b7280' }}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
              <Divider sx={{ borderColor: '#000', borderWidth: 1 }} />
            </Box>

            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#374151' }}>
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Supplier</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Warehouse</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Category</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Product</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Purchase</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Sale</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Issue</span>
              </Typography>
            </Box>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                mb: 3,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minHeight: 40,
                  fontWeight: 500,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2563eb',
                },
              }}
            >
              <Tab icon={<ListIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
              <Tab icon={<AddIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
            </Tabs>

            {/* LIST VIEW */}
            {activeTab === 0 && (
              <Box>
                {/* Filters Row */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <Select
                      value={filterSchool}
                      onChange={(e) => setFilterSchool(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      value={searchTable}
                      onChange={(e) => setSearchTable(e.target.value)}
                      sx={{
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Export Buttons and Show Rows */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#374151',
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
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
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
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
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
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
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                        size="small"
                        sx={{
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
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
                <TableContainer component={Paper} sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            #SL
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            School
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Supplier
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Contact Name
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Email
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Phone
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Address
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', border: '1px solid #e5e7eb' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Action
                            <SortIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          sx={{
                            py: 4,
                            color: '#9ca3af',
                            border: '1px solid #e5e7eb',
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
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
                        '&:disabled': { color: '#9ca3af' },
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
                        '&:disabled': { color: '#9ca3af' },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* ADD SUPPLIER FORM VIEW */}
            {activeTab === 1 && (
              <Box>
                <Box sx={{ maxWidth: 800 }}>
                  {/* School Name Dropdown */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      School Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={formData.schoolName}
                        onChange={(e) => handleFormChange('schoolName', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
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

                  {/* Supplier */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Supplier <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Supplier"
                      value={formData.supplier}
                      onChange={(e) => handleFormChange('supplier', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Contact Name */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Contact Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Contact Name"
                      value={formData.contactName}
                      onChange={(e) => handleFormChange('contactName', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Phone */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Phone <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Address */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Address
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Note */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
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
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          '& fieldset': {
                            borderColor: '#d1d5db',
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
                        textTransform: 'none',
                        px: 4,
                        borderRadius: '6px',
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
                      disabled={!formData.schoolName || !formData.supplier || !formData.contactName || !formData.phone}
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        px: 4,
                        borderRadius: '6px',
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

export default Supplier;
