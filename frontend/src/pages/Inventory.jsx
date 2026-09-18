import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Typography, TablePagination, InputAdornment
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    itemName: '', quantity: '', warehouse: '', cost: ''
  });

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const loadItems = () => {
    const mockData = [
      { id: 1, itemName: 'Laptop Dell XPS', quantity: 45, warehouse: 'Main Warehouse A', cost: 1200 },
      { id: 2, itemName: 'Office Chair', quantity: 120, warehouse: 'Storage B', cost: 250 },
      { id: 3, itemName: 'Projector Epson', quantity: 15, warehouse: 'Main Warehouse A', cost: 800 },
      { id: 4, itemName: 'Whiteboard', quantity: 30, warehouse: 'Storage C', cost: 150 },
      { id: 5, itemName: 'Desk Lamp', quantity: 200, warehouse: 'Storage B', cost: 35 }
    ];
    setItems(mockData);
    setFilteredItems(mockData);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData(item);
    } else {
      setCurrentItem(null);
      setFormData({ itemName: '', quantity: '', warehouse: '', cost: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
    setFormData({ itemName: '', quantity: '', warehouse: '', cost: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.itemName || !formData.quantity || !formData.warehouse || !formData.cost) {
      alert('Please fill all fields');
      return;
    }

    if (currentItem) {
      setItems(items.map(item => item.id === currentItem.id ? { ...formData, id: item.id } : item));
    } else {
      const newItem = { ...formData, id: Date.now(), quantity: Number(formData.quantity), cost: Number(formData.cost) };
      setItems([...items, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: "#000" }}>Inventory Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Item
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by item name or warehouse..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Item Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Warehouse Location</strong></TableCell>
              <TableCell><strong>Cost ($)</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.warehouse}</TableCell>
                <TableCell>${item.cost}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredItems.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Warehouse Location"
            name="warehouse"
            value={formData.warehouse}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cost ($)"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;
