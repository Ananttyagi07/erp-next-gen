import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  InputAdornment,
  Badge,
  Checkbox,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Message as MessageIcon,
  Edit as EditIcon,
  Inbox as InboxIcon,
  Send as SentIcon,
  Drafts as DraftIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const ManageMessage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox' or 'compose'

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Global Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          height: '60px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
              <MenuItem value="school1">School 1</MenuItem>
              <MenuItem value="school2">School 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Global Search"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: '1px solid #e5e5e5',
            pl: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
              <MenuItem value="school1">School 1</MenuItem>
              <MenuItem value="school2">School 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
              <MenuItem value="2023-24">2023-24</MenuItem>
              <MenuItem value="2024-25">2024-25</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {/* Module Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageIcon sx={{ fontSize: 24, color: '#000' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Message
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 20,
                transition: 'transform 0.3s',
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        </Box>

        {/* Content Area */}
        {!collapsed && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Left Sidebar */}
            <Box sx={{ width: '250px', flexShrink: 0 }}>
              {/* Compose Button */}
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                fullWidth
                onClick={() => setCurrentView('compose')}
                sx={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  textTransform: 'none',
                  mb: 3,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#1d4ed8' },
                }}
              >
                Compose
              </Button>

              {/* Folder Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#6b7280' }}>
                  Folder
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {/* Inbox */}
                  <Button
                    startIcon={<InboxIcon sx={{ fontSize: 20 }} />}
                    onClick={() => setCurrentView('inbox')}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      color: '#000',
                      backgroundColor: currentView === 'inbox' ? '#f3f4f6' : 'transparent',
                      px: 2,
                      py: 1,
                      '&:hover': { backgroundColor: '#e5e7eb' },
                    }}
                  >
                    <span>Inbox</span>
                    <Badge
                      badgeContent="0/0"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#2563eb',
                          color: '#fff',
                          fontSize: '0.7rem',
                        },
                      }}
                    />
                  </Button>

                  {/* Sent */}
                  <Button
                    startIcon={<SentIcon sx={{ fontSize: 20 }} />}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      color: '#000',
                      px: 2,
                      py: 1,
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    <span>Sent</span>
                    <Badge
                      badgeContent="0"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#6b7280',
                          color: '#fff',
                          fontSize: '0.7rem',
                        },
                      }}
                    />
                  </Button>

                  {/* Draft */}
                  <Button
                    startIcon={<DraftIcon sx={{ fontSize: 20 }} />}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      color: '#000',
                      px: 2,
                      py: 1,
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    <span>Draft</span>
                    <Badge
                      badgeContent="0"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#2563eb',
                          color: '#fff',
                          fontSize: '0.7rem',
                        },
                      }}
                    />
                  </Button>

                  {/* Trash */}
                  <Button
                    startIcon={<DeleteIcon sx={{ fontSize: 20 }} />}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      color: '#000',
                      px: 2,
                      py: 1,
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    <span>Trash</span>
                    <Badge
                      badgeContent="0"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#dc2626',
                          color: '#fff',
                          fontSize: '0.7rem',
                        },
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Right Main Panel */}
            <Box sx={{ flex: 1 }}>
              {currentView === 'inbox' ? (
                <>
                  {/* Inbox Title and Toolbar */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Inbox
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ border: '1px solid #e5e5e5' }}>
                          <Checkbox size="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ border: '1px solid #e5e5e5' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ border: '1px solid #e5e5e5' }}>
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

              {/* Action Bar */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#000',
                      '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#000',
                      '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                    }}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#000',
                      '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                    }}
                  >
                    CSV
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#000',
                      '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                    }}
                  >
                    PDF
                  </Button>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select defaultValue={15}>
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                      <MenuItem value={100}>Show 100 rows</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#000', fontWeight: 500 }}>
                    Search:
                  </Typography>
                  <TextField
                    size="small"
                    sx={{
                      minWidth: 200,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Data Table */}
              <TableContainer
                component={Paper}
                sx={{ boxShadow: 'none', border: '1px solid #e5e5e5' }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          #SL
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          School
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Status
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Sender
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Subject
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
                      <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#6b7280' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Table Footer */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Showing 0 to 0 of 0 entries
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#6b7280',
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e5e5e5',
                      color: '#6b7280',
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
                </>
              ) : (
                <>
                  {/* Compose View */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Compose
                  </Typography>

                  {/* Compose Form - Centered 70% Width */}
                  <Box sx={{ maxWidth: '70%', mx: 'auto' }}>
                    {/* Select School */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                        }}
                      >
                        Select School <span style={{ color: '#dc2626' }}>*</span>
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select displayEmpty defaultValue="">
                          <MenuItem value="">--Select School--</MenuItem>
                          <MenuItem value="school1">School 1</MenuItem>
                          <MenuItem value="school2">School 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Receiver Type */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                        }}
                      >
                        Receiver Type <span style={{ color: '#dc2626' }}>*</span>
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select displayEmpty defaultValue="">
                          <MenuItem value="">--Select Receiver Type--</MenuItem>
                          <MenuItem value="teacher">Teacher</MenuItem>
                          <MenuItem value="student">Student</MenuItem>
                          <MenuItem value="parent">Parent</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Receiver */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                        }}
                      >
                        Receiver <span style={{ color: '#dc2626' }}>*</span>
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select displayEmpty defaultValue="">
                          <MenuItem value="">--Select Receiver--</MenuItem>
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="individual">Individual</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Subject */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                        }}
                      >
                        Subject <span style={{ color: '#dc2626' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Subject"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                              borderColor: '#e5e5e5',
                            },
                            '&:hover fieldset': {
                              borderColor: '#d1d5db',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                          '& input::placeholder': {
                            color: '#9ca3af',
                          },
                        }}
                      />
                    </Box>

                    {/* Message */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                          mt: 1,
                        }}
                      >
                        Message <span style={{ color: '#dc2626' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={8}
                        placeholder="Message"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                              borderColor: '#e5e5e5',
                            },
                            '&:hover fieldset': {
                              borderColor: '#d1d5db',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                          '& textarea::placeholder': {
                            color: '#9ca3af',
                          },
                        }}
                      />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: 180,
                          color: '#374151',
                          fontWeight: 600,
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#e5e5e5',
                            color: '#6b7280',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                              borderColor: '#d1d5db',
                              backgroundColor: '#f9fafb',
                            },
                          }}
                        >
                          Discard
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#e5e5e5',
                            color: '#6b7280',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                              borderColor: '#d1d5db',
                              backgroundColor: '#f9fafb',
                            },
                          }}
                        >
                          Draft
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#10b981',
                            color: '#fff',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': { backgroundColor: '#059669' },
                          }}
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ManageMessage;
