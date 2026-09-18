import { useState } from 'react';
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
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GridOnIcon from '@mui/icons-material/GridOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ManageTodo = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1); // Default to Add tab

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Global Header Bar */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        {/* Left Side */}
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
                  borderColor: '#e5e5e5',
                },
              },
            }}
          />
        </Box>

        {/* Divider */}
        <Box sx={{ width: '1px', height: '40px', backgroundColor: '#e5e5e5', display: { xs: 'none', md: 'block' } }} />

        {/* Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
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

      {/* Main Container - Manage Todo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <NotificationsIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Manage Todo
        </Typography>
        {isCollapsed ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#000' }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 20, color: '#000' }} />
        )}
      </Box>

      <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }} />

      {!isCollapsed && (
        <>
          {/* Quick Links Row */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
              Quick Link:
            </Typography>
            <Link
              onClick={() => navigate('/miscellaneous/manage-award')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Award
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/miscellaneous/manage-todo')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Todo
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/miscellaneous/faq')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              FAQ
            </Link>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }}>
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
              <Tab icon={<AddBoxIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
            </Tabs>
          </Box>

          {/* Tab Content - List */}
          {selectedTab === 0 && (
            <>
              {/* Top Right School Selector */}
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select School--</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Toolbar */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small" startIcon={<FileCopyIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Copy</Button>
                  <Button variant="outlined" size="small" startIcon={<GridOnIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Excel</Button>
                  <Button variant="outlined" size="small" startIcon={<DescriptionIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>CSV</Button>
                  <Button variant="outlined" size="small" startIcon={<PictureAsPdfIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>PDF</Button>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Show 15 rows</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Search:</Typography>
                  <TextField size="small" sx={{ minWidth: 150 }} />
                </Box>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e5e5e5', mb: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                    <TableRow>
                      {/* #SL Column - BLUE */}
                      <TableCell sx={{ fontWeight: 600, color: '#2563eb', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          #SL
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#2563eb' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#2563eb', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Other Columns - GREY */}
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          School
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Assign To
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Title
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Date
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Work Status
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Action
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#6b7280', fontSize: '14px', borderBottom: 'none' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>Showing 0 to 0 of 0 entries</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" disabled sx={{ textTransform: 'none' }}>Previous</Button>
                  <Button size="small" disabled sx={{ textTransform: 'none' }}>Next</Button>
                </Box>
              </Box>
            </>
          )}

          {/* Tab Content - Add */}
          {selectedTab === 1 && (
            <Box>
              {/* Top Right School Selector */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select School--</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Form Layout */}
              <Box sx={{ maxWidth: 800 }}>
                {/* School Name */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    School Name <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl size="small">
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e5e5' } }}>
                      <MenuItem value="">--Select School--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* User Type */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    User Type <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl size="small">
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e5e5' } }}>
                      <MenuItem value="">--Select --</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Assign To */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    Assign To <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl size="small">
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e5e5' } }}>
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Title */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    Title <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField size="small" placeholder="Title" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Date */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    Date <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField size="small" placeholder="Date" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Work Status */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    Work Status <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl size="small">
                    <Select displayEmpty defaultValue="" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e5e5' } }}>
                      <MenuItem value="">--Select--</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right', mt: 1 }}>
                    Description
                  </Typography>
                  <TextField multiline rows={6} placeholder="Description" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Comment */}
                <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right', mt: 1 }}>
                    Comment
                  </Typography>
                  <TextField multiline rows={6} placeholder="Comment" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Footer Actions */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', pl: '212px' }}>
                  <Button variant="outlined" sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5', backgroundColor: '#fff', px: 3, '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' } }}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#000', color: '#fff', px: 3, '&:hover': { backgroundColor: '#333' } }}>
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

export default ManageTodo;
