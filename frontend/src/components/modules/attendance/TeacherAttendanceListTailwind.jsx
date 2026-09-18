/**
 * Teacher Attendance List Component - Material-UI Version
 * Displays teacher attendance with checkbox columns for Present All, Late All, Absent All
 */

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from '@mui/material';

// Sample data
const SAMPLE_ATTENDANCE = [];

const TeacherAttendanceListTailwind = () => {
  const [presentAll, setPresentAll] = useState(false);
  const [lateAll, setLateAll] = useState(false);
  const [absentAll, setAbsentAll] = useState(false);

  const handlePresentAll = (event) => {
    setPresentAll(event.target.checked);
  };

  const handleLateAll = (event) => {
    setLateAll(event.target.checked);
  };

  const handleAbsentAll = (event) => {
    setAbsentAll(event.target.checked);
  };

  return (
    <Box>
      {/* Data Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                #SL
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                Photo
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                Department
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Checkbox
                    size="small"
                    checked={presentAll}
                    onChange={handlePresentAll}
                  />
                  <Typography sx={{ fontSize: '0.85rem' }}>Present All</Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Checkbox
                    size="small"
                    checked={lateAll}
                    onChange={handleLateAll}
                  />
                  <Typography sx={{ fontSize: '0.85rem' }}>Late All</Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', backgroundColor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Checkbox
                    size="small"
                    checked={absentAll}
                    onChange={handleAbsentAll}
                  />
                  <Typography sx={{ fontSize: '0.85rem' }}>Absent All</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_ATTENDANCE.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{ textAlign: 'center', py: 4, color: '#999' }}
                >
                  No available data found
                </TableCell>
              </TableRow>
            ) : (
              SAMPLE_ATTENDANCE.map((attendance, index) => (
                <TableRow key={index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ width: 32, height: 32, bgcolor: '#e0e0e0', borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>{attendance.name}</TableCell>
                  <TableCell>{attendance.department}</TableCell>
                  <TableCell>{attendance.phone}</TableCell>
                  <TableCell>{attendance.email}</TableCell>
                  <TableCell align="center">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox size="small" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherAttendanceListTailwind;
