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
  Tab,
  Tabs,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as CursorIcon,
  List as ListIcon,
  FileCopy as CopyIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

const ExamResult = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');

  // Find filters
  const [findFilters, setFindFilters] = useState({
    school: '',
    select1: '',
    select2: '',
  });

  // Sample data (empty for now)
  const [resultData] = useState([]);

  const handleFind = () => {
    console.log('Finding with filters:', findFilters);
    // Add your find logic here
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Global Top Bar */}
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
              <CursorIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Exam Result
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
                <span style={{ cursor: 'pointer' }}>Instruction</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Question Bank</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Online Exam</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Exam Result</span>
              </Typography>
            </Box>

            {/* Single Tab - List */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={0}>
                <Tab
                  icon={<ListIcon />}
                  label="List"
                  iconPosition="start"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                />
              </Tabs>
            </Box>

            {/* Filter Section - Right Aligned */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel size="small">--Select School--</InputLabel>
                  <Select
                    value={findFilters.school}
                    onChange={(e) => setFindFilters(prev => ({ ...prev, school: e.target.value }))}
                    label="--Select School--"
                    size="small"
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel size="small">--Select--</InputLabel>
                  <Select
                    value={findFilters.select1}
                    onChange={(e) => setFindFilters(prev => ({ ...prev, select1: e.target.value }))}
                    label="--Select--"
                    size="small"
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel size="small">--Select--</InputLabel>
                  <Select
                    value={findFilters.select2}
                    onChange={(e) => setFindFilters(prev => ({ ...prev, select2: e.target.value }))}
                    label="--Select--"
                    size="small"
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleFind}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    height: '40px',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Find
                </Button>
              </Box>
            </Box>

            {/* Table Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<CopyIcon />}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#666',
                    borderColor: '#ccc',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                  }}
                >
                  Copy
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ExcelIcon />}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#666',
                    borderColor: '#ccc',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                  }}
                >
                  Excel
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CsvIcon />}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#666',
                    borderColor: '#ccc',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                  }}
                >
                  CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PdfIcon />}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#666',
                    borderColor: '#ccc',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                  }}
                >
                  PDF
                </Button>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(e.target.value)}
                    size="small"
                    sx={{
                      backgroundColor: '#fff',
                      borderColor: '#ccc',
                    }}
                  >
                    <MenuItem value={10}>Show 10 rows</MenuItem>
                    <MenuItem value={15}>Show 15 rows</MenuItem>
                    <MenuItem value={25}>Show 25 rows</MenuItem>
                    <MenuItem value={50}>Show 50 rows</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Search Field */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Search:
                </Typography>
                <TextField
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ backgroundColor: '#fff' }}
                />
              </Box>
            </Box>

            {/* Data Table */}
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                      #SL
                    </TableCell>
                    <TableCell sx={{ color: '#666' }}>Student Name</TableCell>
                    <TableCell sx={{ color: '#666' }}>Exam Title</TableCell>
                    <TableCell sx={{ color: '#666' }}>Class</TableCell>
                    <TableCell sx={{ color: '#666' }}>Section</TableCell>
                    <TableCell sx={{ color: '#666' }}>Subject</TableCell>
                    <TableCell sx={{ color: '#666' }}>Status</TableCell>
                    <TableCell sx={{ color: '#666' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#999' }}>
                        No data available in table
                      </TableCell>
                    </TableRow>
                  ) : (
                    resultData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#1976d2' }}>{index + 1}</TableCell>
                        <TableCell>{item.studentName}</TableCell>
                        <TableCell>{item.examTitle}</TableCell>
                        <TableCell>{item.class}</TableCell>
                        <TableCell>{item.section}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" sx={{ color: '#1976d2' }}>
                              <ViewIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#666' }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Footer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Showing 0 to 0 of 0 entries
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  disabled
                  sx={{
                    backgroundColor: '#f5f5f5',
                    color: '#999',
                    borderColor: '#ccc',
                    textTransform: 'none',
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  disabled
                  sx={{
                    backgroundColor: '#f5f5f5',
                    color: '#999',
                    borderColor: '#ccc',
                    textTransform: 'none',
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamResult;
