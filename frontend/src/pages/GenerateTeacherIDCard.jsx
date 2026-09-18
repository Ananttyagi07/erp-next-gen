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
  Tabs,
  Tab,
  Grid,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from '@mui/material';
import {
  List as ListIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material';

const GenerateTeacherIDCard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    school: '',
    teacher: '',
  });

  // Sample teacher data
  const [teacherData] = useState([
    {
      id: 1,
      name: 'John Doe',
      designation: 'Senior Teacher',
      department: 'Mathematics',
      email: 'john.doe@school.com',
      phone: '+1234567890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'Teacher',
      department: 'Science',
      email: 'jane.smith@school.com',
      phone: '+1234567891',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      designation: 'Head Teacher',
      department: 'English',
      email: 'robert.j@school.com',
      phone: '+1234567892',
    },
  ]);

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTeachers(teacherData.map(t => t.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (id) => {
    setSelectedTeachers(prev => {
      if (prev.includes(id)) {
        return prev.filter(tid => tid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleGenerateCard = () => {
    console.log('Generating ID cards for teachers:', selectedTeachers);
    // Add your card generation logic here
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Top Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
            sx={{ backgroundColor: '#fff' }}
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
          sx={{ backgroundColor: '#fff' }}
        />

        <Box sx={{ borderLeft: '1px solid #ccc', height: '40px', mx: 1 }} />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>--Select School--</InputLabel>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="--Select School--"
            sx={{ backgroundColor: '#fff' }}
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
            sx={{ backgroundColor: '#fff' }}
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

      {/* Header Card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CardIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Generate Teacher ID Card
              </Typography>
            </Box>
            <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
              {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={headerExpanded}>
            {/* Quick Links */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#1976d2' }}>
                <span style={{ cursor: 'pointer' }}>ID Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Admit Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Teacher ID card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Employee ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student Admit Card</span>
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card>
        <CardContent>
          {/* Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab
              icon={<ListIcon />}
              label="List"
              iconPosition="start"
              sx={{
                color: activeTab === 0 ? '#000' : '#1976d2',
                fontWeight: activeTab === 0 ? 'bold' : 'normal'
              }}
            />
            <Tab
              icon={<PrintIcon />}
              label="Generate ID Card"
              iconPosition="start"
              sx={{
                color: activeTab === 1 ? '#000' : '#1976d2',
                fontWeight: activeTab === 1 ? 'bold' : 'normal'
              }}
            />
          </Tabs>

          {/* Tab Content 1: Teacher List */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Teacher List
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedTeachers.length === teacherData.length}
                          indeterminate={selectedTeachers.length > 0 && selectedTeachers.length < teacherData.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>#SL</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.map((teacher, index) => (
                      <TableRow key={teacher.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedTeachers.includes(teacher.id)}
                            onChange={() => handleSelectTeacher(teacher.id)}
                          />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.designation}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>{teacher.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  disabled={selectedTeachers.length === 0}
                  onClick={handleGenerateCard}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#333' },
                    '&:disabled': { backgroundColor: '#ccc' },
                  }}
                >
                  Generate ID Card ({selectedTeachers.length})
                </Button>
              </Box>
            </Box>
          )}

          {/* Tab Content 2: Generate ID Card Form */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Generate Teacher ID Card
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth required sx={{ backgroundColor: '#f0f0f0' }}>
                    <InputLabel>--Select School--</InputLabel>
                    <Select
                      value={formData.school}
                      onChange={(e) => handleInputChange('school', e.target.value)}
                      label="--Select School--"
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      <MenuItem value="1">Main Campus</MenuItem>
                      <MenuItem value="2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Teacher <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth required sx={{ backgroundColor: '#f0f0f0' }}>
                    <InputLabel>--Select Teacher--</InputLabel>
                    <Select
                      value={formData.teacher}
                      onChange={(e) => handleInputChange('teacher', e.target.value)}
                      label="--Select Teacher--"
                    >
                      <MenuItem value="">--Select Teacher--</MenuItem>
                      {teacherData.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Footer Actions */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => setFormData({ school: '', teacher: '' })}
                  sx={{
                    color: '#666',
                    borderColor: '#ccc',
                    backgroundColor: '#fff',
                    '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' },
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  disabled={!formData.school || !formData.teacher}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#333' },
                    '&:disabled': { backgroundColor: '#ccc' },
                  }}
                >
                  Generate ID Card
                </Button>
              </Box>

              {/* Info Box */}
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                <Typography variant="body2" color="primary">
                  <strong>Note:</strong> Select a school and teacher to generate their ID card. The ID card will be generated based on the settings configured in "ID Card Setting".
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GenerateTeacherIDCard;
