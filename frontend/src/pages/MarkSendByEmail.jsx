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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Email as EmailIcon,
  KeyboardArrowDown as ArrowDownIcon,
  List as ListIcon,
  Send as SendIcon,
  FileCopy as CopyIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

const MarkSendByEmail = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchoolLeft, setSelectedSchoolLeft] = useState('');
  const [selectedSchoolRight, setSelectedSchoolRight] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [tabSchoolFilter, setTabSchoolFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  // Send Email Form states
  const [emailForm, setEmailForm] = useState({
    school: '',
    exam: '',
    receiverType: '',
    studentMark: '',
    template: '',
    subject: '',
    emailBody: '',
  });

  // Sample data (empty for now)
  const [emailData] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleEmailFormChange = (field, value) => {
    setEmailForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting Email form:', emailForm);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setEmailForm({
      school: '',
      exam: '',
      receiverType: '',
      studentMark: '',
      template: '',
      subject: '',
      emailBody: '',
    });
  };

  const handleUpdate = () => {
    console.log('Update clicked');
    // Add your update logic here
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Top Global Header Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {/* Left: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolLeft}
            onChange={(e) => setSelectedSchoolLeft(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
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

        {/* Center: Global Search */}
        <TextField
          placeholder="Global Search"
          variant="outlined"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
            },
          }}
        />

        {/* Right Center: School Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
          <Select
            value={selectedSchoolRight}
            onChange={(e) => setSelectedSchoolRight(e.target.value)}
            label="--Select School--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
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

        {/* Far Right: Session Year Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Session Year--</InputLabel>
          <Select
            value={sessionYear}
            onChange={(e) => setSessionYear(e.target.value)}
            label="--Session Year--"
            IconComponent={ArrowDownIcon}
            sx={{
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
            }}
          >
            <MenuItem value="">--Session Year--</MenuItem>
            <MenuItem value="2024">2024-2025</MenuItem>
            <MenuItem value="2023">2023-2024</MenuItem>
          </Select>
        </FormControl>

        {/* Update Button */}
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            textTransform: 'none',
            px: 4,
            borderRadius: '6px',
            fontWeight: 500,
            '&:hover': { backgroundColor: '#1f2937' },
          }}
        >
          Update
        </Button>
      </Box>

      {/* Main Panel */}
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#6b7280', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                  Mark send by Email
                </Typography>
              </Box>
              <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
                {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Divider sx={{ borderColor: '#000', borderWidth: 1, mb: 2 }} />

            {/* Quick Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#374151' }}>
                <span style={{ fontWeight: 500 }}>Quick Link:</span>{' '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Manage Mark</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Exam Term Result</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Exam final result</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Merit List</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark Sheet</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result Card</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>All Result Card</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark send by Email</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Mark send by SMS</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result Email</span>
                {' | '}
                <span style={{ color: '#2563eb', cursor: 'pointer' }}>Result SMS</span>
              </Typography>
            </Box>

            {/* Tab System */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      minHeight: '48px',
                      color: '#374151',
                    },
                    '& .Mui-selected': {
                      color: '#000',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab icon={<ListIcon />} iconPosition="start" label="List" />
                  <Tab icon={<SendIcon />} iconPosition="start" label="Send Email" />
                </Tabs>

                {/* School Filter (only shown on List tab) */}
                {activeTab === 0 && (
                  <FormControl sx={{ minWidth: 200, mr: 2 }}>
                    <InputLabel sx={{ backgroundColor: '#fff', px: 0.5 }}>--Select School--</InputLabel>
                    <Select
                      value={tabSchoolFilter}
                      onChange={(e) => setTabSchoolFilter(e.target.value)}
                      label="--Select School--"
                      size="small"
                      IconComponent={ArrowDownIcon}
                      sx={{
                        borderRadius: '6px',
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
                )}
              </Box>
            </Box>

            {/* Tab Content */}
            {activeTab === 0 && (
              // List View Tab
              <Box>
                {/* Action Buttons Row */}
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
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
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
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
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
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
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
                        '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' },
                      }}
                    >
                      PDF
                    </Button>
                    <FormControl sx={{ minWidth: 140 }}>
                      <Select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                        size="small"
                        sx={{
                          backgroundColor: '#fff',
                          borderColor: '#d1d5db',
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
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          #SL
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'school'}
                            direction={orderBy === 'school' ? order : 'asc'}
                            onClick={() => handleSort('school')}
                          >
                            School
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'sessionYear'}
                            direction={orderBy === 'sessionYear' ? order : 'asc'}
                            onClick={() => handleSort('sessionYear')}
                          >
                            Session Year
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'exam'}
                            direction={orderBy === 'exam' ? order : 'asc'}
                            onClick={() => handleSort('exam')}
                          >
                            Exam
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'class'}
                            direction={orderBy === 'class' ? order : 'asc'}
                            onClick={() => handleSort('class')}
                          >
                            Class
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'receiverType'}
                            direction={orderBy === 'receiverType' ? order : 'asc'}
                            onClick={() => handleSort('receiverType')}
                          >
                            Receiver Type
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                          <TableSortLabel
                            active={orderBy === 'subject'}
                            direction={orderBy === 'subject' ? order : 'asc'}
                            onClick={() => handleSort('subject')}
                          >
                            Subject
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
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
                          <TableCell
                            colSpan={8}
                            align="center"
                            sx={{
                              py: 4,
                              color: '#9ca3af',
                              border: '1px solid #e5e7eb',
                            }}
                          >
                            No data available in table
                          </TableCell>
                        </TableRow>
                      ) : (
                        emailData.map((item, index) => (
                          <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{index + 1}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.school}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.sessionYear}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.exam}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.class}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.receiverType}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.subject}</TableCell>
                            <TableCell sx={{ border: '1px solid #e5e7eb' }}>{item.action}</TableCell>
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
                        borderColor: '#d1d5db',
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
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              // Send Email Form Tab
              <Box>
                <Box sx={{ maxWidth: 800 }}>
                  {/* School Name */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      School Name <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={emailForm.school}
                        onChange={(e) => handleEmailFormChange('school', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
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

                  {/* Exam */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Exam <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={emailForm.exam}
                        onChange={(e) => handleEmailFormChange('exam', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="mid-term">Mid-Term</MenuItem>
                        <MenuItem value="final">Final Term</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Receiver Type */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Receiver Type <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={emailForm.receiverType}
                        onChange={(e) => handleEmailFormChange('receiverType', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="parent">Parent</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Student Mark */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Student Mark <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={emailForm.studentMark}
                        onChange={(e) => handleEmailFormChange('studentMark', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="all">All Students</MenuItem>
                        <MenuItem value="passed">Passed Students</MenuItem>
                        <MenuItem value="failed">Failed Students</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Template */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Template
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={emailForm.template}
                        onChange={(e) => handleEmailFormChange('template', e.target.value)}
                        displayEmpty
                        IconComponent={ArrowDownIcon}
                        sx={{
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                        }}
                      >
                        <MenuItem value="">--Select--</MenuItem>
                        <MenuItem value="exam-result">Exam Result Template</MenuItem>
                        <MenuItem value="mark-notification">Mark Notification Template</MenuItem>
                        <MenuItem value="performance">Performance Report Template</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Subject */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Subject <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Subject"
                      value={emailForm.subject}
                      onChange={(e) => handleEmailFormChange('subject', e.target.value)}
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Body */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: '#374151', fontWeight: 500 }}>
                      Email Body <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="Email Body"
                      value={emailForm.emailBody}
                      onChange={(e) => handleEmailFormChange('emailBody', e.target.value)}
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, display: 'block' }}>
                      Dynamic Tag
                    </Typography>
                  </Box>

                  {/* Form Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 2, borderTop: '1px solid #e5e7eb' }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        backgroundColor: '#fff',
                        color: '#6b7280',
                        borderColor: '#d1d5db',
                        textTransform: 'none',
                        px: 4,
                        '&:hover': {
                          borderColor: '#9ca3af',
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={
                        !emailForm.school ||
                        !emailForm.exam ||
                        !emailForm.receiverType ||
                        !emailForm.studentMark ||
                        !emailForm.subject ||
                        !emailForm.emailBody
                      }
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        textTransform: 'none',
                        px: 4,
                        '&:hover': { backgroundColor: '#1f2937' },
                        '&:disabled': { backgroundColor: '#d1d5db', color: '#9ca3af' },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MarkSendByEmail;
