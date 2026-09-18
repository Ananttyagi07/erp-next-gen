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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Subscription = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const subscriptionData = [
    {
      id: 1,
      schoolName: 'Delhi International Public School',
      planName: 'Premium Plan',
      price: '200',
      name: 'John Doe',
      email: '01234567789',
      phone: 'john@gmsms.com',
      status: 'Approved',
    },
  ];

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

      {/* Main Container - Manage Subscription */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ThumbUpIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Manage Subscription
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
              onClick={() => navigate('/subscription/faq')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              FAQ
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/slider')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Slider
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/setting')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Subscription Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/general-setting')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              General Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/plan')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Subscription Plan
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/subscription')}
              sx={{
                color: '#2563eb',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#dbeafe',
                px: 1,
                py: 0.5,
                borderRadius: '4px',
              }}
            >
              Subscription
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
                  <TextField size="small" sx={{ minWidth: 200 }} />
                </Box>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e5e5e5', mb: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#2563eb', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          #SL
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#2563eb' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#2563eb', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          School Name
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Plan Name
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Price
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Name
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Email
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Phone
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Status
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
                    {subscriptionData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.id}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.schoolName}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.planName}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.price}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.name}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.email}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.phone}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5', fontSize: '13px' }}>{row.status}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #e5e5e5' }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<VisibilityIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: '#000',
                                color: '#fff',
                                fontSize: '12px',
                                '&:hover': { backgroundColor: '#333' },
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: '#60a5fa',
                                color: '#fff',
                                fontSize: '12px',
                                '&:hover': { backgroundColor: '#3b82f6' },
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                fontSize: '12px',
                                '&:hover': { backgroundColor: '#c82333' },
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>
                  Showing 1 to 1 of 1 entries
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" disabled sx={{ textTransform: 'none' }}>Previous</Button>
                  <Button size="small" variant="contained" sx={{ textTransform: 'none', backgroundColor: '#9ca3af', '&:hover': { backgroundColor: '#9ca3af' } }}>1</Button>
                  <Button size="small" disabled sx={{ textTransform: 'none' }}>Next</Button>
                </Box>
              </Box>
            </>
          )}

          {/* Tab Content - Add */}
          {selectedTab === 1 && (
            <Box sx={{ maxWidth: 800 }}>
              {/* Plan Name */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Plan Name <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Name */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Name <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="Name" />
              </Box>

              {/* Email */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Email <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="Email" />
              </Box>

              {/* Phone */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Phone <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="Phone" />
              </Box>

              {/* Address */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Address <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="Address" />
              </Box>

              {/* School Name */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  School Name <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="School Name" />
              </Box>

              {/* Start Date */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Start Date <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="Start Date" />
              </Box>

              {/* End Date */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  End Date <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField size="small" placeholder="End Date" />
              </Box>

              {/* Status */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                  Status <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small">
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Footer Actions */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2 }}>
                <Box />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#e5e5e5',
                      backgroundColor: '#fff',
                      px: 3,
                      '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
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
                      '&:hover': { backgroundColor: '#333' },
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

export default Subscription;
