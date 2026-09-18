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
  Tabs,
  Tab,
  Grid,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  PushPin as PinIcon,
  List as ListIcon,
  AddBox as PlusSquareIcon,
  FileCopy as CopyIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ExamSchedule = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter states
  const [filterSchool, setFilterSchool] = useState('');
  const [filterSelect, setFilterSelect] = useState('');

  // Form state for Add tab
  const [formData, setFormData] = useState({
    schoolName: '',
    examTerm: '',
    class: '',
    subject: '',
    examDate: '',
    startTime: '',
    endTime: '',
    roomNo: '',
    note: '',
  });

  // Sample data (empty for now)
  const [scheduleData] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting form:', formData);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setFormData({
      schoolName: '',
      examTerm: '',
      class: '',
      subject: '',
      examDate: '',
      startTime: '',
      endTime: '',
      roomNo: '',
      note: '',
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              <PinIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Exam Schedule
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
                <span style={{ cursor: 'pointer' }}>Exam Grade</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Term</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Exam Schedule</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Suggestion</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Attendance</span>
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  icon={<ListIcon />}
                  label="List"
                  iconPosition="start"
                  sx={{
                    textTransform: 'none',
                    fontWeight: activeTab === 0 ? 'bold' : 'normal',
                  }}
                />
                <Tab
                  icon={<PlusSquareIcon />}
                  label="Add"
                  iconPosition="start"
                  sx={{
                    textTransform: 'none',
                    fontWeight: activeTab === 1 ? 'bold' : 'normal',
                  }}
                />
              </Tabs>
            </Box>

            {/* Tab Content: List View */}
            {activeTab === 0 && (
              <Box>
                {/* Toolbar */}
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

                  {/* Right Filters and Search */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel size="small">--Select School--</InputLabel>
                      <Select
                        value={filterSchool}
                        onChange={(e) => setFilterSchool(e.target.value)}
                        label="--Select School--"
                        size="small"
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="1">Main Campus</MenuItem>
                        <MenuItem value="2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel size="small">--Select--</InputLabel>
                      <Select
                        value={filterSelect}
                        onChange={(e) => setFilterSelect(e.target.value)}
                        label="--Select--"
                        size="small"
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="1">Option 1</MenuItem>
                        <MenuItem value="2">Option 2</MenuItem>
                      </Select>
                    </FormControl>
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
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ color: '#1976d2', fontWeight: 'bold' }}>#SL</TableCell>
                        <TableCell sx={{ color: '#666' }}>School</TableCell>
                        <TableCell sx={{ color: '#666' }}>Exam Term</TableCell>
                        <TableCell sx={{ color: '#666' }}>Class</TableCell>
                        <TableCell sx={{ color: '#666' }}>Subject</TableCell>
                        <TableCell sx={{ color: '#666' }}>Date</TableCell>
                        <TableCell sx={{ color: '#666' }}>Time</TableCell>
                        <TableCell sx={{ color: '#666' }}>Room No</TableCell>
                        <TableCell sx={{ color: '#666' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduleData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 4, color: '#999' }}>
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : (
                        scheduleData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ color: '#1976d2' }}>{index + 1}</TableCell>
                            <TableCell>{item.school}</TableCell>
                            <TableCell>{item.examTerm}</TableCell>
                            <TableCell>{item.class}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.roomNo}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" sx={{ color: '#1976d2' }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#d32f2f' }}>
                                  <DeleteIcon fontSize="small" />
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
              </Box>
            )}

            {/* Tab Content: Add View */}
            {activeTab === 1 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      School Name <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl fullWidth required>
                      <InputLabel>--Select School--</InputLabel>
                      <Select
                        value={formData.schoolName}
                        onChange={(e) => handleInputChange('schoolName', e.target.value)}
                        label="--Select School--"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">--Select School--</MenuItem>
                        <MenuItem value="1">Main Campus</MenuItem>
                        <MenuItem value="2">Branch Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Exam Term <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl fullWidth required>
                      <InputLabel>--Select Exam Term--</InputLabel>
                      <Select
                        value={formData.examTerm}
                        onChange={(e) => handleInputChange('examTerm', e.target.value)}
                        label="--Select Exam Term--"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">--Select Exam Term--</MenuItem>
                        <MenuItem value="mid-term">Mid-Term</MenuItem>
                        <MenuItem value="final">Final Term</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Class <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl fullWidth required>
                      <InputLabel>--Select Class--</InputLabel>
                      <Select
                        value={formData.class}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                        label="--Select Class--"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">--Select Class--</MenuItem>
                        <MenuItem value="10">Grade 10</MenuItem>
                        <MenuItem value="11">Grade 11</MenuItem>
                        <MenuItem value="12">Grade 12</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Subject <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl fullWidth required>
                      <InputLabel>--Select Subject--</InputLabel>
                      <Select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        label="--Select Subject--"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">--Select Subject--</MenuItem>
                        <MenuItem value="math">Mathematics</MenuItem>
                        <MenuItem value="science">Science</MenuItem>
                        <MenuItem value="english">English</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Exam Date <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => handleInputChange('examDate', e.target.value)}
                      sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Start Time <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      required
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      End Time <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      required
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Room No <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Room No"
                      value={formData.roomNo}
                      onChange={(e) => handleInputChange('roomNo', e.target.value)}
                      sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666', mt: 2 }}>
                      Note
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Note"
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      color: '#666',
                      borderColor: '#ccc',
                      backgroundColor: '#fff',
                      textTransform: 'none',
                      px: 4,
                      '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                      !formData.schoolName ||
                      !formData.examTerm ||
                      !formData.class ||
                      !formData.subject ||
                      !formData.examDate ||
                      !formData.startTime ||
                      !formData.endTime ||
                      !formData.roomNo
                    }
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      textTransform: 'none',
                      px: 4,
                      '&:hover': { backgroundColor: '#333' },
                      '&:disabled': { backgroundColor: '#ccc', color: '#999' },
                    }}
                  >
                    Submit
                  </Button>
                </Box>

                {/* Warning Alert */}
                <Alert
                  icon={<InfoIcon fontSize="inherit" />}
                  severity="warning"
                  sx={{
                    mt: 3,
                    backgroundColor: '#fffbeb',
                    color: '#92400e',
                    border: '1px solid #fde68a',
                    '& .MuiAlert-icon': {
                      color: '#f59e0b',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Instruction: Please add Exam, Class & Subject before add Exm Schedule.
                  </Typography>
                </Alert>
              </Box>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamSchedule;
