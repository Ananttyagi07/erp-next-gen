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
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Sale = () => {
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
    userType: '',
    saleTo: '',
    incomeHead: '',
    date: '',
    note: '',
    paidStatus: '',
    discount: '',
    grandTotal: '',
  });

  // Item rows state
  const [itemRows, setItemRows] = useState([
    { id: 1, category: '', product: '', quantity: 0, unitPrice: 0, subtotal: 0 },
  ]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItemRows(prev =>
      prev.map(row => {
        if (row.id === id) {
          const updated = { ...row, [field]: value };
          // Calculate subtotal
          if (field === 'quantity' || field === 'unitPrice') {
            updated.subtotal = parseFloat(updated.quantity || 0) * parseFloat(updated.unitPrice || 0);
          }
          return updated;
        }
        return row;
      })
    );
  };

  const handleAddMoreItem = () => {
    const newId = Math.max(...itemRows.map(r => r.id), 0) + 1;
    setItemRows(prev => [...prev, {
      id: newId,
      category: '',
      product: '',
      quantity: 0,
      unitPrice: 0,
      subtotal: 0
    }]);
  };

  const handleDeleteItem = (id) => {
    if (itemRows.length > 1) {
      setItemRows(prev => prev.filter(row => row.id !== id));
    }
  };

  const handleUpdate = () => {
    console.log('Update clicked');
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      userType: '',
      saleTo: '',
      incomeHead: '',
      date: '',
      note: '',
      paidStatus: '',
      discount: '',
      grandTotal: '',
    });
    setItemRows([
      { id: 1, category: '', product: '', quantity: 0, unitPrice: 0, subtotal: 0 },
    ]);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData, itemRows);
  };

  // Calculate total from items
  const calculateTotal = () => {
    const itemsTotal = itemRows.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const discount = parseFloat(formData.discount || 0);
    return itemsTotal - discount;
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
                    Manage Sale
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
                {/* Filter School Dropdown */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <Select
                      value={filterSchool}
                      onChange={(e) => setFilterSchool(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
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

                  {/* Search Box */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                            Invoice Number
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Student/Sale To
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Gross Amount
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Discount
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Net Amount
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
                          colSpan={9}
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

            {/* ADD SALE FORM VIEW */}
            {activeTab === 1 && (
              <Box>
                {/* School Name (Full Width) */}
                <Box sx={{ mb: 4 }}>
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

                {/* Two Column Layout */}
                <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                  {/* Left Column - Sale Information */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#374151' }}>
                        Sale Information:
                      </Typography>

                      {/* User Type */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                          User Type <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.userType}
                            onChange={(e) => handleFormChange('userType', e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{
                              backgroundColor: '#fff',
                              borderRadius: '4px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                              },
                            }}
                          >
                            <MenuItem value="">--Select--</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="staff">Staff</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Sale To */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                          Sale To <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.saleTo}
                            onChange={(e) => handleFormChange('saleTo', e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{
                              backgroundColor: '#fff',
                              borderRadius: '4px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                              },
                            }}
                          >
                            <MenuItem value="">--Select--</MenuItem>
                            <MenuItem value="1">Customer A</MenuItem>
                            <MenuItem value="2">Customer B</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Income Head */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                          Income Head <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.incomeHead}
                            onChange={(e) => handleFormChange('incomeHead', e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{
                              backgroundColor: '#fff',
                              borderRadius: '4px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                              },
                            }}
                          >
                            <MenuItem value="">--Select--</MenuItem>
                            <MenuItem value="1">Product Sales</MenuItem>
                            <MenuItem value="2">Services</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Date */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                          Date <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          value={formData.date}
                          onChange={(e) => handleFormChange('date', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '4px',
                              '& fieldset': {
                                borderColor: '#d1d5db',
                              },
                            },
                          }}
                        />
                      </Box>

                      {/* Note */}
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                          Note
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Note"
                          size="small"
                          value={formData.note}
                          onChange={(e) => handleFormChange('note', e.target.value)}
                          sx={{
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '4px',
                              '& fieldset': {
                                borderColor: '#d1d5db',
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Right Column - Item Information */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#374151' }}>
                          Item Information:
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleAddMoreItem}
                          sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            textTransform: 'none',
                            px: 2,
                            py: 0.5,
                            fontSize: '0.75rem',
                            '&:hover': { backgroundColor: '#1f2937' },
                          }}
                        >
                          Add More
                        </Button>
                      </Box>

                      {/* Item Table */}
                      <TableContainer sx={{ border: '1px solid #e5e7eb', borderRadius: '4px', mb: 2 }}>
                        <Table size="small">
                          <TableHead sx={{ backgroundColor: '#fff' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>#SL</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Category</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Product</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Quantity</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Unit Price</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Subtotal</TableCell>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', border: '1px solid #e5e7eb', py: 1 }}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {itemRows.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1, fontSize: '0.75rem' }}>
                                  {index + 1}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <Select
                                    value={row.category}
                                    onChange={(e) => handleItemChange(row.id, 'category', e.target.value)}
                                    displayEmpty
                                    size="small"
                                    fullWidth
                                    sx={{
                                      fontSize: '0.75rem',
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d1d5db',
                                      },
                                    }}
                                  >
                                    <MenuItem value="">--Select--</MenuItem>
                                    <MenuItem value="1">Electronics</MenuItem>
                                    <MenuItem value="2">Furniture</MenuItem>
                                  </Select>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <Select
                                    value={row.product}
                                    onChange={(e) => handleItemChange(row.id, 'product', e.target.value)}
                                    displayEmpty
                                    size="small"
                                    fullWidth
                                    sx={{
                                      fontSize: '0.75rem',
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d1d5db',
                                      },
                                    }}
                                  >
                                    <MenuItem value="">--Select--</MenuItem>
                                    <MenuItem value="1">Product A</MenuItem>
                                    <MenuItem value="2">Product B</MenuItem>
                                  </Select>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <TextField
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => handleItemChange(row.id, 'quantity', e.target.value)}
                                    size="small"
                                    fullWidth
                                    sx={{
                                      '& input': { fontSize: '0.75rem' },
                                      '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#d1d5db' },
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <TextField
                                    type="number"
                                    value={row.unitPrice}
                                    onChange={(e) => handleItemChange(row.id, 'unitPrice', e.target.value)}
                                    size="small"
                                    fullWidth
                                    sx={{
                                      '& input': { fontSize: '0.75rem' },
                                      '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#d1d5db' },
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <TextField
                                    type="number"
                                    value={row.subtotal}
                                    disabled
                                    size="small"
                                    fullWidth
                                    sx={{
                                      '& input': { fontSize: '0.75rem' },
                                      '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f9fafb',
                                        '& fieldset': { borderColor: '#d1d5db' },
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #e5e7eb', py: 1 }}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDeleteItem(row.id)}
                                    disabled={itemRows.length === 1}
                                    sx={{
                                      color: '#ef4444',
                                      '&:disabled': { color: '#d1d5db' },
                                    }}
                                  >
                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Box>

                {/* Payment Information */}
                <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '4px', border: '1px solid #e5e7eb', mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#374151' }}>
                    Payment Information:
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Paid Status */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                        Paid Status <span style={{ color: '#ef4444' }}>*</span>
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={formData.paidStatus}
                          onChange={(e) => handleFormChange('paidStatus', e.target.value)}
                          displayEmpty
                          size="small"
                          sx={{
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#d1d5db',
                            },
                          }}
                        >
                          <MenuItem value="">--Select--</MenuItem>
                          <MenuItem value="paid">Paid</MenuItem>
                          <MenuItem value="partial">Partial</MenuItem>
                          <MenuItem value="unpaid">Unpaid</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Discount */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                        Discount
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="0"
                        size="small"
                        value={formData.discount}
                        onChange={(e) => handleFormChange('discount', e.target.value)}
                        sx={{
                          backgroundColor: '#fff',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                              borderColor: '#d1d5db',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Grand Total */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                        Grand Total <span style={{ color: '#ef4444' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="0"
                        size="small"
                        value={calculateTotal()}
                        disabled
                        sx={{
                          backgroundColor: '#f9fafb',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                              borderColor: '#d1d5db',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Form Buttons */}
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
                    disabled={
                      !formData.schoolName ||
                      !formData.userType ||
                      !formData.saleTo ||
                      !formData.incomeHead ||
                      !formData.date ||
                      !formData.paidStatus ||
                      itemRows.some(item => !item.category || !item.product)
                    }
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
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Sale;
