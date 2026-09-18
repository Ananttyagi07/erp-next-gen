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

const Purchase = () => {
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
    category: '',
    product: '',
    quantity: '',
    unitType: '',
    unitPrice: '',
    purchaseDate: '',
    expireDate: '',
    purchaseBy: '',
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
      category: '',
      product: '',
      quantity: '',
      unitType: '',
      unitPrice: '',
      purchaseDate: '',
      expireDate: '',
      purchaseBy: '',
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
                    Manage Purchase
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
                            Supplier
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Category
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Product
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Purchase By
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Quantity
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Total Price
                            <SortIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb', py: 1.5, fontSize: '0.875rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Purchase Date
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
            )}

            {/* ADD PURCHASE FORM VIEW */}
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

                  {/* Supplier */}
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
                      Supplier <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.supplier}
                        onChange={(e) => handleFormChange('supplier', e.target.value)}
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
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Supplier A</MenuItem>
                        <MenuItem value="2">Supplier B</MenuItem>
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
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Electronics</MenuItem>
                        <MenuItem value="2">Furniture</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Product */}
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
                      Product <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.product}
                        onChange={(e) => handleFormChange('product', e.target.value)}
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
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Product A</MenuItem>
                        <MenuItem value="2">Product B</MenuItem>
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

                  {/* Unit Type */}
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
                      Unit Type <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.unitType}
                        onChange={(e) => handleFormChange('unitType', e.target.value)}
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
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Piece</MenuItem>
                        <MenuItem value="2">Box</MenuItem>
                        <MenuItem value="3">Carton</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Unit Price */}
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
                      Unit Price <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Unit Price"
                      type="number"
                      value={formData.unitPrice}
                      onChange={(e) => handleFormChange('unitPrice', e.target.value)}
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

                  {/* Purchase Date */}
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
                      Purchase Date <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Purchase Date"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleFormChange('purchaseDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
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

                  {/* Expire Date */}
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
                      Expire Date <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Expire Date"
                      type="date"
                      value={formData.expireDate}
                      onChange={(e) => handleFormChange('expireDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
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

                  {/* Purchase By */}
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
                      Purchase By <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <Select
                        value={formData.purchaseBy}
                        onChange={(e) => handleFormChange('purchaseBy', e.target.value)}
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
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Admin</MenuItem>
                        <MenuItem value="2">Staff Member</MenuItem>
                      </Select>
                    </FormControl>
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
                        !formData.supplier ||
                        !formData.category ||
                        !formData.product ||
                        !formData.quantity ||
                        !formData.unitType ||
                        !formData.unitPrice ||
                        !formData.purchaseDate ||
                        !formData.expireDate ||
                        !formData.purchaseBy
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
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Purchase;
