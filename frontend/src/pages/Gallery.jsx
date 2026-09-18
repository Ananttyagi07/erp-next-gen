import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GridOnIcon from '@mui/icons-material/GridOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Gallery = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header Row - 3 Dropdowns + Update Button */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Global Search"
            sx={{
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
              <MenuItem value="2024-2025">2024-2025</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="small"
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
      </Box>

      {/* Expandable Section - Manage Gallery */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <CollectionsIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Manage Gallery
        </Typography>
        {isCollapsed ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#000' }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 20, color: '#000' }} />
        )}
      </Box>

      <Box sx={{ borderBottom: '1px solid #d1d5db', mb: 3 }} />

      {!isCollapsed && (
        <>
          {/* Quick Links Row */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
              Quick Link:
            </Typography>
            <Link
              onClick={() => navigate('/media-gallery/gallery')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Manage Gallery
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/media-gallery/gallery-image')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Manage Gallery Image
            </Link>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: '1px solid #d1d5db', mb: 3 }}>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              sx={{
                minHeight: '42px',
                '& .MuiTab-root': {
                  minHeight: '42px',
                  textTransform: 'none',
                  fontSize: '14px',
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
              <Tab icon={<ListAltIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
              <Tab icon={<AddIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
            </Tabs>
          </Box>

          {/* List Tab */}
          {selectedTab === 0 && (
            <>
              {/* Action Buttons Row */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FileCopyIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<GridOnIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DescriptionIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    CSV
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PictureAsPdfIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    PDF
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Show</Typography>
                  <FormControl size="small" sx={{ minWidth: 70 }}>
                    <Select defaultValue={15}>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>rows</Typography>
                </Box>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #d1d5db', mb: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>#SL</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>School</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>Note</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>Is View on Web?</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #d1d5db' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: '#6b7280', fontSize: '14px', borderBottom: 'none' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>
                  Showing 0 to 0 of 0 entries
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    disabled
                    sx={{
                      textTransform: 'none',
                      color: '#6b7280',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    size="small"
                    disabled
                    sx={{
                      textTransform: 'none',
                      color: '#6b7280',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </>
          )}

          {/* Add Tab */}
          {selectedTab === 1 && (
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Box
                sx={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: 1,
                  p: 3,
                }}
              >
                {/* School Name */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', mb: 1, fontWeight: 500 }}>
                    School Name <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      displayEmpty
                      defaultValue=""
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Title */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', mb: 1, fontWeight: 500 }}>
                    Title <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter title"
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Note */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', mb: 1, fontWeight: 500 }}>
                    Note
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter note"
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Is View on Web */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', mb: 1, fontWeight: 500 }}>
                    Is View on Web?
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      displayEmpty
                      defaultValue="no"
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      px: 3,
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
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#000',
                      color: '#fff',
                      px: 3,
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Gallery;
