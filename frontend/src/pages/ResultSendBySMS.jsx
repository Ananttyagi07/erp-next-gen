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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Sms as SmsIcon,
  List as ListIcon,
  AddBox as AddIcon,
  FileCopy as CopyIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

const ResultSendBySMS = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [listSchool, setListSchool] = useState('');

  // Form states for Send SMS tab
  const [formData, setFormData] = useState({
    school: '',
    receiverType: '',
    receiver: '',
    template: '',
    sms: '',
    gateway: '',
  });

  // Character count
  const remainingChars = 160 - (formData.sms?.length || 0);

  // Sample data (empty for now)
  const [smsData] = useState([]);

  // Sorting states
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSubmit = () => {
    console.log('Submitting SMS:', formData);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      receiverType: '',
      receiver: '',
      template: '',
      sms: '',
      gateway: '',
    });
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
          border: '1px solid #e5e7eb',
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
            textTransform: 'none',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Card Container */}
      <Card sx={{ backgroundColor: '#fff' }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmsIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Result SMS
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
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline', fontSize: '0.875rem' }}>
                <span style={{ cursor: 'pointer' }}>Manage Mark</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Term Result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam final result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Merit List</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark Sheet</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Result Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>All Result Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark send by Email</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark send by SMS</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Result Email</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Result SMS</span>
              </Typography>
            </Box>

            {/* Tabs with School Dropdown */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  icon={<ListIcon />}
                  label="List"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: activeTab === 0 ? 'bold' : 'normal', fontSize: '0.875rem' }}
                />
                <Tab
                  icon={<AddIcon />}
                  label="Send SMS"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: activeTab === 1 ? 'bold' : 'normal', fontSize: '0.875rem' }}
                />
              </Tabs>

              {/* School Dropdown - Only visible in List tab */}
              {activeTab === 0 && (
                <FormControl sx={{ minWidth: 200, mb: 1 }}>
                  <InputLabel>--Select School--</InputLabel>
                  <Select
                    value={listSchool}
                    onChange={(e) => setListSchool(e.target.value)}
                    label="--Select School--"
                    size="small"
                  >
                    <MenuItem value="">--Select School--</MenuItem>
                    <MenuItem value="1">Main Campus</MenuItem>
                    <MenuItem value="2">Branch Campus</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Tab Content */}
            {activeTab === 0 ? (
              // List Tab
              <>
                {/* Toolbar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      startIcon={<CopyIcon />}
                      sx={{
                        backgroundColor: '#fff',
                        color: '#666',
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#999', backgroundColor: '#f9fafb' },
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
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#999', backgroundColor: '#f9fafb' },
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
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#999', backgroundColor: '#f9fafb' },
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
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': { borderColor: '#999', backgroundColor: '#f9fafb' },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                        size="small"
                        sx={{ backgroundColor: '#fff', fontSize: '0.875rem' }}
                      >
                        <MenuItem value={10}>Show 10 rows</MenuItem>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
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
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>#SL</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>
                          <TableSortLabel
                            active={orderBy === 'school'}
                            direction={orderBy === 'school' ? order : 'asc'}
                            onClick={() => handleSort('school')}
                          >
                            School
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>
                          <TableSortLabel
                            active={orderBy === 'sessionYear'}
                            direction={orderBy === 'sessionYear' ? order : 'asc'}
                            onClick={() => handleSort('sessionYear')}
                          >
                            Session Year
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>
                          <TableSortLabel
                            active={orderBy === 'receiverType'}
                            direction={orderBy === 'receiverType' ? order : 'asc'}
                            onClick={() => handleSort('receiverType')}
                          >
                            Receiver Type
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>
                          <TableSortLabel
                            active={orderBy === 'sendDate'}
                            direction={orderBy === 'sendDate' ? order : 'asc'}
                            onClick={() => handleSort('sendDate')}
                          >
                            Send Date
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151', fontSize: '0.875rem' }}>
                          <TableSortLabel
                            active={orderBy === 'action'}
                            direction={orderBy === 'action' ? order : 'asc'}
                            onClick={() => handleSort('action')}
                          >
                            Action
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {smsData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#6b7280', fontSize: '0.875rem' }}>
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : (
                        smsData.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                              '&:hover': { backgroundColor: '#f3f4f6' },
                            }}
                          >
                            <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.school}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.sessionYear}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.receiverType}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.sendDate}</TableCell>
                            <TableCell sx={{ fontSize: '0.875rem' }}>{item.action}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Showing 0 to 0 of 0 entries
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        backgroundColor: '#f9fafb',
                        color: '#9ca3af',
                        borderColor: '#e5e7eb',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        backgroundColor: '#f9fafb',
                        color: '#9ca3af',
                        borderColor: '#e5e7eb',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              // Send SMS Form Tab
              <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                {/* School Name */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    School Name <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.school}
                      onChange={(e) => handleFormChange('school', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      <MenuItem value="1">Main Campus</MenuItem>
                      <MenuItem value="2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Receiver Type */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    Receiver Type <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.receiverType}
                      onChange={(e) => handleFormChange('receiverType', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select Receiver Type--</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                      <MenuItem value="both">Both</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Receiver */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    Receiver <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.receiver}
                      onChange={(e) => handleFormChange('receiver', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select Receiver--</MenuItem>
                      <MenuItem value="all">All Students</MenuItem>
                      <MenuItem value="class">By Class</MenuItem>
                      <MenuItem value="section">By Section</MenuItem>
                      <MenuItem value="individual">Individual</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Template */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    Template
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.template}
                      onChange={(e) => handleFormChange('template', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select Template--</MenuItem>
                      <MenuItem value="result-announcement">Result Announcement</MenuItem>
                      <MenuItem value="exam-result">Exam Result Notification</MenuItem>
                      <MenuItem value="custom">Custom Message</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* SMS */}
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'flex-start' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem', pt: 1 }}>
                    SMS <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={formData.sms}
                    onChange={(e) => handleFormChange('sms', e.target.value)}
                    placeholder="Enter SMS content here..."
                    sx={{
                      width: '80%',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Character Count Helper */}
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box sx={{ width: '20%' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      width: '80%',
                      color: remainingChars < 0 ? '#ef4444' : '#6b7280',
                      fontSize: '0.75rem',
                      fontStyle: 'italic'
                    }}
                  >
                    You have remain character/ letter: {remainingChars}
                  </Typography>
                </Box>

                {/* Gateway */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    Gateway <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.gateway}
                      onChange={(e) => handleFormChange('gateway', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">--Select Gateway--</MenuItem>
                      <MenuItem value="gateway1">Gateway 1</MenuItem>
                      <MenuItem value="gateway2">Gateway 2</MenuItem>
                      <MenuItem value="gateway3">Gateway 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Dynamic Tag */}
                <Box sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                    Dynamic Tag
                  </Typography>
                  <Typography variant="body2" sx={{ width: '80%', color: '#6b7280', fontSize: '0.875rem' }}>
                    [name] [email] [phone] [exam_result]
                  </Typography>
                </Box>

                {/* Form Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 2, borderTop: '1px solid #e5e7eb' }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                        borderColor: '#9ca3af',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!formData.school || !formData.receiverType || !formData.receiver || !formData.sms || !formData.gateway}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                      '&:disabled': {
                        backgroundColor: '#d1d5db',
                        color: '#9ca3af',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultSendBySMS;
