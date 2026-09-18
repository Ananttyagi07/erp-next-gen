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
  Email as EmailIcon,
  List as ListIcon,
  Add as AddIcon,
  FileCopy as CopyIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

const ResultSendByEmail = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [listSchool, setListSchool] = useState('');

  // Form states for Send Email tab
  const [formData, setFormData] = useState({
    school: '',
    receiverType: '',
    receiver: '',
    template: '',
    subject: '',
    emailBody: '',
  });

  // Sample data (empty for now)
  const [emailData] = useState([]);

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
    console.log('Submitting email:', formData);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      receiverType: '',
      receiver: '',
      template: '',
      subject: '',
      emailBody: '',
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
          <InputLabel>Select School</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="Select School"
          >
            <MenuItem value="">Select School</MenuItem>
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
          <InputLabel>Select School</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="Select School"
          >
            <MenuItem value="">Select School</MenuItem>
            <MenuItem value="1">Main Campus</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Session Year</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="Session Year"
          >
            <MenuItem value="">Session Year</MenuItem>
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
              <EmailIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Manage Result Email
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
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline' }}>
                <span style={{ cursor: 'pointer' }}>Manage Mark</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam Term Result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Exam final result</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Merit List</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark Sheet</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Result Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>All Result Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark send by Email</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Mark send by SMS</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Result Email</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Result SMS</span>
              </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  icon={<ListIcon />}
                  label="List"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: activeTab === 0 ? 'bold' : 'normal' }}
                />
                <Tab
                  icon={<AddIcon />}
                  label="Send Email"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: activeTab === 1 ? 'bold' : 'normal' }}
                />
              </Tabs>
            </Box>

            {/* Tab Content */}
            {activeTab === 0 ? (
              // List Tab
              <>
                {/* Top Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Select School</InputLabel>
                    <Select
                      value={listSchool}
                      onChange={(e) => setListSchool(e.target.value)}
                      label="Select School"
                      size="small"
                    >
                      <MenuItem value="">Select School</MenuItem>
                      <MenuItem value="1">Main Campus</MenuItem>
                      <MenuItem value="2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

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
                        sx={{ backgroundColor: '#fff' }}
                      >
                        <MenuItem value={10}>Show 10 rows</MenuItem>
                        <MenuItem value={15}>Show 15 rows</MenuItem>
                        <MenuItem value={25}>Show 25 rows</MenuItem>
                        <MenuItem value={50}>Show 50 rows</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

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
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>#SL</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>
                          <TableSortLabel
                            active={orderBy === 'school'}
                            direction={orderBy === 'school' ? order : 'asc'}
                            onClick={() => handleSort('school')}
                          >
                            School
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>
                          <TableSortLabel
                            active={orderBy === 'receiverType'}
                            direction={orderBy === 'receiverType' ? order : 'asc'}
                            onClick={() => handleSort('receiverType')}
                          >
                            Receiver Type
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>
                          <TableSortLabel
                            active={orderBy === 'subject'}
                            direction={orderBy === 'subject' ? order : 'asc'}
                            onClick={() => handleSort('subject')}
                          >
                            Subject
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>
                          <TableSortLabel
                            active={orderBy === 'sendDate'}
                            direction={orderBy === 'sendDate' ? order : 'asc'}
                            onClick={() => handleSort('sendDate')}
                          >
                            Send Date
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>
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
                      {emailData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#6b7280' }}>
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : (
                        emailData.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                              '&:hover': { backgroundColor: '#f3f4f6' },
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.school}</TableCell>
                            <TableCell>{item.receiverType}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.sendDate}</TableCell>
                            <TableCell>{item.action}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              // Send Email Form Tab
              <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                {/* School Name */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    School Name <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.school}
                      onChange={(e) => handleFormChange('school', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">Select School</MenuItem>
                      <MenuItem value="1">Main Campus</MenuItem>
                      <MenuItem value="2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Receiver Type */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    Receiver Type <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.receiverType}
                      onChange={(e) => handleFormChange('receiverType', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">Select Receiver Type</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                      <MenuItem value="both">Both</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Receiver */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    Receiver <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.receiver}
                      onChange={(e) => handleFormChange('receiver', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">Select Receiver</MenuItem>
                      <MenuItem value="all">All Students</MenuItem>
                      <MenuItem value="class">By Class</MenuItem>
                      <MenuItem value="section">By Section</MenuItem>
                      <MenuItem value="individual">Individual</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Template */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    Template
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <Select
                      value={formData.template}
                      onChange={(e) => handleFormChange('template', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                      }}
                    >
                      <MenuItem value="">Select Template</MenuItem>
                      <MenuItem value="result-announcement">Result Announcement</MenuItem>
                      <MenuItem value="exam-result">Exam Result Notification</MenuItem>
                      <MenuItem value="custom">Custom Message</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Subject */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    Subject <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.subject}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    placeholder="Enter email subject"
                    sx={{
                      width: '80%',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Email Body */}
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500, pt: 1 }}>
                    Email Body <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={formData.emailBody}
                    onChange={(e) => handleFormChange('emailBody', e.target.value)}
                    placeholder="Enter email content here..."
                    sx={{
                      width: '80%',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Dynamic Tag */}
                <Box sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '20%', color: '#374151', fontWeight: 500 }}>
                    Dynamic Tag
                  </Typography>
                  <Box sx={{ width: '80%', color: '#6b7280' }}>
                    {/* Leave empty for now */}
                  </Box>
                </Box>

                {/* Form Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2, borderTop: '1px solid #e5e7eb' }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      textTransform: 'none',
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
                    disabled={!formData.school || !formData.receiverType || !formData.receiver || !formData.subject || !formData.emailBody}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      textTransform: 'none',
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

export default ResultSendByEmail;
