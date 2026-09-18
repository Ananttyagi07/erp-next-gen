/**
 * Student Activity List Component - Material-UI Version
 * Displays list of student activities in table format
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  FileCopy as CopyIcon,
  GetApp as ExcelIcon,
  Download as GetAppIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

// Sample data
const SAMPLE_ACTIVITIES = [];

const StudentActivityListTailwind = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRows, setShowRows] = useState(15);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const SortableHeader = ({ column, label }) => (
    <TableCell
      onClick={() => handleSort(column)}
      sx={{
        fontWeight: 600,
        fontSize: '0.9rem',
        color: '#666',
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: '#f5f5f5',
        '&:hover': { backgroundColor: '#eeeeee' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {label}
        {sortConfig.key === column && (
          <SortIcon sx={{ fontSize: 14, opacity: 0.7 }} />
        )}
      </Box>
    </TableCell>
  );

  return (
    <Box>
      {/* Toolbar */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CopyIcon />}
            sx={{ textTransform: 'capitalize' }}
          >
            Copy
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ExcelIcon />}
            sx={{ textTransform: 'capitalize' }}
          >
            Excel
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ExcelIcon />}
            sx={{ textTransform: 'capitalize' }}
          >
            CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<GetAppIcon />}
            sx={{ textTransform: 'capitalize' }}
          >
            PDF
          </Button>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={showRows}
              onChange={(e) => setShowRows(e.target.value)}
            >
              <MenuItem value={10}>Show 10 rows</MenuItem>
              <MenuItem value={15}>Show 15 rows</MenuItem>
              <MenuItem value={25}>Show 25 rows</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
            Search:
          </Typography>
          <TextField
            placeholder="Search"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 180 }}
          />
        </Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <SortableHeader column="sl" label="#SL" />
              <SortableHeader column="school" label="School" />
              <SortableHeader column="student" label="Student" />
              <SortableHeader column="class" label="Class" />
              <SortableHeader column="section" label="Section" />
              <SortableHeader column="activity" label="Activity" />
              <SortableHeader column="date" label="Date" />
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666', backgroundColor: '#f5f5f5' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_ACTIVITIES.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  sx={{ textAlign: 'center', py: 4, color: '#999' }}
                >
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              SAMPLE_ACTIVITIES.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{activity.school}</TableCell>
                  <TableCell>{activity.student}</TableCell>
                  <TableCell>{activity.class}</TableCell>
                  <TableCell>{activity.section}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<ViewIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          backgroundColor: '#0ea5e9',
                          color: '#fff',
                          textTransform: 'capitalize',
                          fontSize: '0.75rem',
                          px: 1.5,
                          '&:hover': { backgroundColor: '#0284c7' }
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          backgroundColor: '#06b6d4',
                          color: '#fff',
                          textTransform: 'capitalize',
                          fontSize: '0.75rem',
                          px: 1.5,
                          '&:hover': { backgroundColor: '#0891b2' }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          backgroundColor: '#ef4444',
                          color: '#fff',
                          textTransform: 'capitalize',
                          fontSize: '0.75rem',
                          px: 1.5,
                          '&:hover': { backgroundColor: '#dc2626' }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
          Showing 0 to 0 of 0 entries
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" disabled>
            Previous
          </Button>
          <Button variant="contained" size="small" sx={{ backgroundColor: '#000', color: '#fff' }} disabled>
            1
          </Button>
          <Button variant="outlined" size="small" disabled>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentActivityListTailwind;
