import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Grading as GradingIcon,
} from '@mui/icons-material';

const ManageMark = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    school: '',
    exam: '',
    class: '',
    section: '',
    subject: '',
  });

  // Sample data (empty for now)
  const [markData, setMarkData] = useState([]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFind = () => {
    console.log('Finding with filters:', filters);
    // Add your find logic here
    // For now, let's set some sample data structure
    setMarkData([
      // Sample structure - will be populated from API
      // {
      //   rollNo: '001',
      //   name: 'John Doe',
      //   written: { mark: 100, obtain: 85 },
      //   tutorial: { mark: 50, obtain: 45 },
      //   practical: { mark: 50, obtain: 40 },
      //   viva: { mark: 20, obtain: 18 },
      //   total: { mark: 220, obtain: 188 }
      // }
    ]);
  };

  const handleMarkChange = (index, field, subfield, value) => {
    const newData = [...markData];
    if (!newData[index][field]) {
      newData[index][field] = {};
    }
    newData[index][field][subfield] = value;
    setMarkData(newData);
  };

  const handleSave = () => {
    console.log('Saving marks:', markData);
    // Add your save logic here
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Global Filter Bar */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
            <MenuItem value="2">Branch Campus</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Global Search"
          variant="outlined"
          size="medium"
        />

        <Box sx={{ borderLeft: '2px solid #000', height: '40px', mx: 1 }} />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
          >
            <MenuItem value="">--Select School--</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Session Year--</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="--Session Year--"
          >
            <MenuItem value="">--Session Year--</MenuItem>
            <MenuItem value="2024">2024-2025</MenuItem>
            <MenuItem value="2023">2023-2024</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Card Container */}
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GradingIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Mark
              </Typography>
            </Box>
            <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
              {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Collapse in={headerExpanded}>
            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', display: 'inline', mr: 1 }}>
                Quick Link:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline' }}>
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Manage Mark</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Term Result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Final Result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Merit List</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark Sheet</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Result Card</span>
              </Typography>
            </Box>

            {/* Filter Section */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9fafb', borderRadius: 1, border: '1px solid #e5e7eb' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>School *</InputLabel>
                  <Select
                    value={filters.school}
                    onChange={(e) => handleFilterChange('school', e.target.value)}
                    label="School *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Exam *</InputLabel>
                  <Select
                    value={filters.exam}
                    onChange={(e) => handleFilterChange('exam', e.target.value)}
                    label="Exam *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Exam--</MenuItem>
                    <MenuItem value="mid-term">Mid-Term</MenuItem>
                    <MenuItem value="final">Final Term</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Class *</InputLabel>
                  <Select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                    label="Class *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Class--</MenuItem>
                    <MenuItem value="10">Grade 10</MenuItem>
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Section *</InputLabel>
                  <Select
                    value={filters.section}
                    onChange={(e) => handleFilterChange('section', e.target.value)}
                    label="Section *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Section--</MenuItem>
                    <MenuItem value="A">Section A</MenuItem>
                    <MenuItem value="B">Section B</MenuItem>
                    <MenuItem value="C">Section C</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Subject *</InputLabel>
                  <Select
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    label="Subject *"
                    required
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select Subject--</MenuItem>
                    <MenuItem value="math">Mathematics</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  onClick={handleFind}
                  disabled={
                    !filters.school ||
                    !filters.exam ||
                    !filters.class ||
                    !filters.section ||
                    !filters.subject
                  }
                  sx={{
                    backgroundColor: '#000 !important',
                    color: '#fff !important',
                    textTransform: 'none',
                    height: '56px',
                    px: 4,
                    borderRadius: '6px',
                    '&:hover': { backgroundColor: '#333 !important' },
                    '&.Mui-disabled': {
                      backgroundColor: '#000 !important',
                      color: '#fff !important',
                      opacity: 0.5
                    },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Complex Mark Grid */}
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  {/* First Header Row - Main Categories */}
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: '#1976d2',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                        verticalAlign: 'middle',
                      }}
                    >
                      #SL
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                        verticalAlign: 'middle',
                      }}
                    >
                      Roll No
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                        verticalAlign: 'middle',
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                      }}
                    >
                      Written
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                      }}
                    >
                      Tutorial
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                      }}
                    >
                      Practical
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                        borderRight: '1px solid #e0e0e0',
                      }}
                    >
                      Viva
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{
                        color: '#666',
                        fontWeight: 'bold',
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                  {/* Second Header Row - Sub Categories */}
                  <TableRow>
                    {/* Written */}
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Mark
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Obtain
                    </TableCell>
                    {/* Tutorial */}
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Mark
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Obtain
                    </TableCell>
                    {/* Practical */}
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Mark
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Obtain
                    </TableCell>
                    {/* Viva */}
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Mark
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Obtain
                    </TableCell>
                    {/* Total */}
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem', borderRight: '1px solid #e0e0e0' }}>
                      Mark
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.875rem' }}>
                      Obtain
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {markData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={13} align="center" sx={{ py: 4, color: '#999' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    markData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#1976d2', borderRight: '1px solid #e0e0e0' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{item.rollNo}</TableCell>
                        <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{item.name}</TableCell>

                        {/* Written */}
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.written?.mark || ''}
                            onChange={(e) => handleMarkChange(index, 'written', 'mark', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.written?.obtain || ''}
                            onChange={(e) => handleMarkChange(index, 'written', 'obtain', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>

                        {/* Tutorial */}
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.tutorial?.mark || ''}
                            onChange={(e) => handleMarkChange(index, 'tutorial', 'mark', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.tutorial?.obtain || ''}
                            onChange={(e) => handleMarkChange(index, 'tutorial', 'obtain', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>

                        {/* Practical */}
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.practical?.mark || ''}
                            onChange={(e) => handleMarkChange(index, 'practical', 'mark', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.practical?.obtain || ''}
                            onChange={(e) => handleMarkChange(index, 'practical', 'obtain', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>

                        {/* Viva */}
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.viva?.mark || ''}
                            onChange={(e) => handleMarkChange(index, 'viva', 'mark', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                          <TextField
                            size="small"
                            type="number"
                            value={item.viva?.obtain || ''}
                            onChange={(e) => handleMarkChange(index, 'viva', 'obtain', e.target.value)}
                            sx={{ width: '70px' }}
                          />
                        </TableCell>

                        {/* Total */}
                        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0', backgroundColor: '#f9fafb' }}>
                          {item.total?.mark || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ backgroundColor: '#f9fafb' }}>
                          {item.total?.obtain || 0}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Instruction Alert */}
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                backgroundColor: '#fffbeb',
                color: '#92400e',
                borderRadius: '6px',
                p: 2,
                '& .MuiAlert-icon': {
                  color: '#92400e',
                },
              }}
            >
              <Typography variant="body2">
                <strong>Instruction:</strong> Please ensure Exam Schedule and Exam Attendance before Exam Mark Entry.
              </Typography>
            </Alert>

            {/* Save Button */}
            {markData.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    px: 4,
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Save Marks
                </Button>
              </Box>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageMark;
