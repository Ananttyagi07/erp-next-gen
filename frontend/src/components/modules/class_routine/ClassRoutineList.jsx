/**
 * Class Routine List Component
 * Displays list of class routines in table format
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
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Sample data
const SAMPLE_ROUTINES = [];

const ClassRoutineList = () => {
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
                #SL
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                School
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Class
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Section
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Day
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Start Time
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                End Time
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_ROUTINES.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{ textAlign: 'center', py: 4, color: '#999' }}
                >
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              SAMPLE_ROUTINES.map((routine, index) => (
                <TableRow key={routine.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{routine.school}</TableCell>
                  <TableCell>{routine.class}</TableCell>
                  <TableCell>{routine.section}</TableCell>
                  <TableCell>{routine.day}</TableCell>
                  <TableCell>{routine.startTime}</TableCell>
                  <TableCell>{routine.endTime}</TableCell>
                  <TableCell>{routine.subject}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          minWidth: '32px',
                          p: '4px',
                          color: '#0066cc',
                          borderColor: '#0066cc',
                          '&:hover': { backgroundColor: '#e6f2ff' }
                        }}
                        title="View"
                      >
                        <ViewIcon sx={{ fontSize: 16 }} />
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          minWidth: '32px',
                          p: '4px',
                          color: '#0066cc',
                          borderColor: '#0066cc',
                          '&:hover': { backgroundColor: '#e6f2ff' }
                        }}
                        title="Edit"
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          minWidth: '32px',
                          p: '4px',
                          color: '#f44336',
                          borderColor: '#f44336',
                          '&:hover': { backgroundColor: '#ffebee' }
                        }}
                        title="Delete"
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
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
          <Button variant="outlined" size="small" disabled>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassRoutineList;
