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
  Checkbox,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CreditCard as BarcodeIcon,
  Print as PrintIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const GenerateStudentIDCard = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [formData, setFormData] = useState({
    schoolName: '',
    class: '',
    section: '',
    student: '',
  });
  const [showResults, setShowResults] = useState(false);

  // Sample student data
  const [studentData] = useState([
    {
      id: 1,
      name: 'Emily Johnson',
      rollNumber: 'STU001',
      class: 'Grade 10',
      section: 'A',
      email: 'emily.j@student.com',
      phone: '+1234567890',
    },
    {
      id: 2,
      name: 'Michael Chen',
      rollNumber: 'STU002',
      class: 'Grade 10',
      section: 'A',
      email: 'michael.c@student.com',
      phone: '+1234567891',
    },
    {
      id: 3,
      name: 'Sarah Williams',
      rollNumber: 'STU003',
      class: 'Grade 10',
      section: 'B',
      email: 'sarah.w@student.com',
      phone: '+1234567892',
    },
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setShowResults(true);
    // Auto-select all students in the generated list
    setSelectedStudents(studentData.map(s => s.id));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStudents(studentData.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents(prev => {
      if (prev.includes(id)) {
        return prev.filter(sid => sid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handlePrint = () => {
    console.log('Printing ID cards for students:', selectedStudents);
    // Add your print logic here
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
          {/* Header Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarcodeIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Generate Student ID Card
              </Typography>
            </Box>
            <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
              {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Collapse in={headerExpanded}>
            {/* Quick Links Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', display: 'inline', mr: 1 }}>
                Quick Link:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline' }}>
                <span style={{ cursor: 'pointer' }}>ID Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Admit Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Teacher ID card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Employee ID Card</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Student ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student Admit Card</span>
              </Typography>
            </Box>

            {/* Filter Form Section (The Grid) */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>
                  School Name <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  label="School Name *"
                  sx={{ backgroundColor: '#f0f0f0' }}
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  <MenuItem value="1">Main Campus</MenuItem>
                  <MenuItem value="2">Branch Campus</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>
                  Class <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={formData.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  label="Class *"
                  sx={{ backgroundColor: '#f0f0f0' }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  <MenuItem value="10">Grade 10</MenuItem>
                  <MenuItem value="11">Grade 11</MenuItem>
                  <MenuItem value="12">Grade 12</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>
                  Section <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={formData.section}
                  onChange={(e) => handleInputChange('section', e.target.value)}
                  label="Section *"
                  sx={{ backgroundColor: '#f0f0f0' }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  <MenuItem value="A">Section A</MenuItem>
                  <MenuItem value="B">Section B</MenuItem>
                  <MenuItem value="C">Section C</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>
                  Student <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={formData.student}
                  onChange={(e) => handleInputChange('student', e.target.value)}
                  label="Student *"
                  sx={{ backgroundColor: '#f0f0f0' }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  <MenuItem value="all">All Students</MenuItem>
                  {studentData.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name} - {student.rollNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!formData.schoolName || !formData.class || !formData.section || !formData.student}
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  height: '56px',
                  px: 4,
                  '&:hover': { backgroundColor: '#333' },
                  '&:disabled': { backgroundColor: '#ccc' },
                }}
              >
                Generate
              </Button>
            </Box>

            {/* List Section */}
            {showResults && (
              <>
                {/* Tab */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <GroupIcon sx={{ color: '#666' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Student List
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Content - Student Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedStudents.length === studentData.length}
                            indeterminate={selectedStudents.length > 0 && selectedStudents.length < studentData.length}
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>#SL</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Roll Number</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Section</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentData.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleSelectStudent(student.id)}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.section}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Footer - Print Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    disabled={selectedStudents.length === 0}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      borderColor: '#ccc',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        borderColor: '#999',
                      },
                      '&:disabled': {
                        backgroundColor: '#f5f5f5',
                        color: '#ccc',
                      },
                    }}
                  >
                    Print ({selectedStudents.length})
                  </Button>
                </Box>
              </>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GenerateStudentIDCard;
