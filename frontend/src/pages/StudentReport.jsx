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
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PrintIcon from '@mui/icons-material/Print';

const StudentReport = () => {
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

      {/* Expandable Section - Student Report */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <BarChartIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Student Report
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
          {/* Select Report Dropdown */}
          <Box sx={{ mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <Select defaultValue="student-report">
                <MenuItem value="student-report">Student Report</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Filter Panel - 3 fields + Find button */}
          <Box
            sx={{
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              borderRadius: 1,
              p: 2.5,
              mb: 3,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, alignItems: 'end' }}>
              {/* School Name */}
              <Box>
                <Typography sx={{ fontSize: '13px', color: '#374151', mb: 0.5, fontWeight: 500 }}>
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

              {/* Academic Year */}
              <Box>
                <Typography sx={{ fontSize: '13px', color: '#374151', mb: 0.5, fontWeight: 500 }}>
                  Academic Year
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
                    <MenuItem value="">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Group by Data */}
              <Box>
                <Typography sx={{ fontSize: '13px', color: '#374151', mb: 0.5, fontWeight: 500 }}>
                  Group by Data <span style={{ color: '#dc2626' }}>*</span>
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
                    <MenuItem value="">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Find Button */}
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    height: '40px',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Two Tabs: Tabular Report and Graphical Report */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 0, borderBottom: '1px solid #d1d5db' }}>
              <Box
                onClick={() => setSelectedTab(0)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 0 ? '#fff' : '#f9fafb',
                  borderBottom: selectedTab === 0 ? '2px solid #000' : 'none',
                  marginBottom: selectedTab === 0 ? '-1px' : '0',
                }}
              >
                <ListAltIcon sx={{ fontSize: 18, color: selectedTab === 0 ? '#000' : '#6b7280' }} />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: selectedTab === 0 ? 600 : 400,
                    color: selectedTab === 0 ? '#000' : '#6b7280',
                  }}
                >
                  Tabular Report
                </Typography>
              </Box>
              <Box
                onClick={() => setSelectedTab(1)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  cursor: 'pointer',
                  backgroundColor: selectedTab === 1 ? '#fff' : '#f9fafb',
                  borderBottom: selectedTab === 1 ? '2px solid #000' : 'none',
                  marginBottom: selectedTab === 1 ? '-1px' : '0',
                }}
              >
                <ShowChartIcon sx={{ fontSize: 18, color: selectedTab === 1 ? '#000' : '#6b7280' }} />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: selectedTab === 1 ? 600 : 400,
                    color: selectedTab === 1 ? '#000' : '#6b7280',
                  }}
                >
                  Graphical Report
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tabular Report - Table */}
          {selectedTab === 0 && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ overflowX: 'auto', border: '1px solid #d1d5db', borderRadius: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f3f4f6' }}>
                    <tr>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        #SL
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        Academic Year
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        Class
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        Male
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        Female
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #d1d5db',
                      }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="6" style={{
                        padding: '40px',
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#6b7280',
                        backgroundColor: '#fff',
                      }}>
                        No available data found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {/* Graphical Report */}
          {selectedTab === 1 && (
            <Box
              sx={{
                mb: 3,
                p: 6,
                textAlign: 'center',
                border: '1px solid #d1d5db',
                borderRadius: 1,
                backgroundColor: '#fff',
              }}
            >
              <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>
                No available data found
              </Typography>
            </Box>
          )}

          {/* Print Button - Bottom Right */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{
                textTransform: 'none',
                borderColor: '#d1d5db',
                color: '#374151',
                backgroundColor: '#fff',
                px: 3,
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Print
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StudentReport;
