/**
 * Student Type List Component
 * Displays list of student types in table format
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
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Sample data
const SAMPLE_STUDENT_TYPES = [
  {
    id: 1,
    sl: 1,
    school: 'School A',
    studentType: 'Undergraduate',
    note: 'General undergraduate students'
  },
  {
    id: 2,
    sl: 2,
    school: 'School B',
    studentType: 'Postgraduate',
    note: 'Postgraduate and research students'
  },
  {
    id: 3,
    sl: 3,
    school: 'School A',
    studentType: 'Doctoral',
    note: 'PhD and doctoral degree students'
  },
  {
    id: 4,
    sl: 4,
    school: 'School C',
    studentType: 'Certificate',
    note: 'Certificate program students'
  }
];

const StudentTypeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRows, setShowRows] = useState(15);

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
        <TextField
          placeholder="Search"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 180 }}
        />
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                School
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Student Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Note
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_STUDENT_TYPES.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ textAlign: 'center', py: 4, color: '#999' }}
                >
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              SAMPLE_STUDENT_TYPES.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sl}</TableCell>
                  <TableCell>{item.school}</TableCell>
                  <TableCell>{item.studentType}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
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
          Showing 1 to 4 of 4 entries
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" disabled>
            Previous
          </Button>
          <Button variant="contained" size="small" sx={{ backgroundColor: '#000', color: '#fff' }}>
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

export default StudentTypeList;
