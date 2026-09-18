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

const AssetPurchase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    schoolName: '',
    vendor: '',
    category: '',
    asset: '',
    quantity: '',
    unitType: '',
    unitPrice: '',
    purchaseDate: '',
    expireDate: '',
    purchaseBy: '',
    note: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      vendor: '',
      category: '',
      asset: '',
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
    // Handle form submission
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.schoolName &&
    formData.vendor &&
    formData.category &&
    formData.asset &&
    formData.quantity &&
    formData.unitPrice &&
    formData.purchaseDate &&
    formData.purchaseBy;

  // Dummy data for the table
  const purchaseData = [
    {
      sl: 1,
      school: 'Main Campus',
      vendor: 'ABC Suppliers',
      category: 'Electronics',
      asset: 'Laptop',
      purchaseBy: 'John Doe',
      quantity: 10,
      unitPrice: '$800',
      totalPrice: '$8000',
    },
    {
      sl: 2,
      school: 'Branch Campus',
      vendor: 'XYZ Corp',
      category: 'Furniture',
      asset: 'Desk',
      purchaseBy: 'Jane Smith',
      quantity: 20,
      unitPrice: '$150',
      totalPrice: '$3000',
    },
  ];

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
                Manage Purchase
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
              <Tab label="List" />
              <Tab label="Add" />
            </Tabs>

            {/* Tab Content */}
            {activeTab === 0 ? (
              // List View
              <Box>
                {/* Export Buttons and Show Rows */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#000' },
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#000' },
                    }}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#000' },
                    }}
                  >
                    CSV
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#000' },
                    }}
                  >
                    PDF
                  </Button>

                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Show
                    </Typography>
                    <FormControl size="small">
                      <Select defaultValue={10} sx={{ minWidth: 70 }}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      rows
                    </Typography>
                  </Box>

                  {/* Search Box */}
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Search:
                    </Typography>
                    <TextField size="small" placeholder="" sx={{ width: 200 }} />
                  </Box>
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          #SL
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          School
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Vendor
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Asset
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Purchase By
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Quantity
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Unit Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Total Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {purchaseData.map((row) => (
                        <TableRow key={row.sl} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.sl}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.school}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.vendor}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.category}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.asset}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.purchaseBy}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.quantity}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.unitPrice}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>{row.totalPrice}</TableCell>
                          <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>
                            <IconButton size="small" sx={{ color: '#2563eb' }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#ef4444' }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination Info */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Showing 1 to 2 of 2 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        textTransform: 'none',
                        color: '#9ca3af',
                        borderColor: '#d1d5db',
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: '#000',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#333' },
                      }}
                    >
                      1
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        textTransform: 'none',
                        color: '#9ca3af',
                        borderColor: '#d1d5db',
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* School Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      School Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.schoolName}
                        onChange={(e) => handleFormChange('schoolName', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="school1">Main Campus</MenuItem>
                        <MenuItem value="school2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Vendor */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Vendor <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.vendor}
                        onChange={(e) => handleFormChange('vendor', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select Vendor--</MenuItem>
                        <MenuItem value="vendor1">ABC Suppliers</MenuItem>
                        <MenuItem value="vendor2">XYZ Corp</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Category */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Category <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select Category--</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="furniture">Furniture</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Asset */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Asset <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.asset}
                        onChange={(e) => handleFormChange('asset', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select Asset--</MenuItem>
                        <MenuItem value="laptop">Laptop</MenuItem>
                        <MenuItem value="desk">Desk</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Quantity */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
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
                      sx={{ backgroundColor: '#fff' }}
                    />
                  </Box>

                  {/* Unit Type */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Unit Type
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.unitType}
                        onChange={(e) => handleFormChange('unitType', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select Unit Type--</MenuItem>
                        <MenuItem value="piece">Piece</MenuItem>
                        <MenuItem value="box">Box</MenuItem>
                        <MenuItem value="set">Set</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Unit Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Unit Price <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Unit Price"
                      value={formData.unitPrice}
                      onChange={(e) => handleFormChange('unitPrice', e.target.value)}
                      sx={{ backgroundColor: '#fff' }}
                    />
                  </Box>

                  {/* Purchase Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Purchase Date <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleFormChange('purchaseDate', e.target.value)}
                      sx={{ backgroundColor: '#fff' }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  {/* Expire Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Expire Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.expireDate}
                      onChange={(e) => handleFormChange('expireDate', e.target.value)}
                      sx={{ backgroundColor: '#fff' }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  {/* Purchase By */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      Purchase By <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={formData.purchaseBy}
                        onChange={(e) => handleFormChange('purchaseBy', e.target.value)}
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select Person--</MenuItem>
                        <MenuItem value="john">John Doe</MenuItem>
                        <MenuItem value="jane">Jane Smith</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Note */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Typography
                      sx={{
                        width: '180px',
                        color: '#374151',
                        fontSize: '14px',
                        fontWeight: 500,
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
                      sx={{ backgroundColor: '#fff' }}
                    />
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        textTransform: 'none',
                        color: '#000',
                        borderColor: '#d1d5db',
                        px: 4,
                        '&:hover': {
                          borderColor: '#000',
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
                        textTransform: 'none',
                        backgroundColor: '#000',
                        color: '#fff',
                        px: 4,
                        '&:hover': {
                          backgroundColor: '#333',
                        },
                        '&:disabled': {
                          backgroundColor: '#9ca3af',
                          color: '#fff',
                        },
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

export default AssetPurchase;
