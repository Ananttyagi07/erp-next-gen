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

const GenerateEmployeeIDCard = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [formData, setFormData] = useState({
    schoolName: '',
    employee: 'all',
  });
  const [showResults, setShowResults] = useState(false);

  // Sample employee data
  const [employeeData] = useState([
    {
      id: 1,
      name: 'Michael Brown',
      designation: 'Administrative Officer',
      department: 'Administration',
      email: 'michael.b@school.com',
      phone: '+1234567890',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      designation: 'Accountant',
      department: 'Finance',
      email: 'sarah.w@school.com',
      phone: '+1234567891',
    },
    {
      id: 3,
      name: 'David Martinez',
      designation: 'IT Support',
      department: 'IT Department',
      email: 'david.m@school.com',
      phone: '+1234567892',
    },
  ]);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setShowResults(true);
    // If "All Employee" is selected, select all employees
    if (formData.employee === 'all') {
      setSelectedEmployees(employeeData.map(e => e.id));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedEmployees(employeeData.map(e => e.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployees(prev => {
      if (prev.includes(id)) {
        return prev.filter(eid => eid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handlePrint = () => {
    console.log('Printing ID cards for employees:', selectedEmployees);
    // Add your print logic here
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Top Filter Bar */}
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

      {/* Main Content Card */}
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarcodeIcon />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Generate Employee ID Card
              </Typography>
            </Box>
            <IconButton onClick={() => setHeaderExpanded(!headerExpanded)}>
              {headerExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Collapse in={headerExpanded}>
            {/* Quick Links Row */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: '#666', display: 'inline', mr: 1 }}>
                Quick Link:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'inline' }}>
                <span style={{ cursor: 'pointer' }}>ID Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Admit Card Setting</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Teacher ID card</span> |{' '}
                <span style={{ cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>Employee ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student Admit Card</span>
              </Typography>
            </Box>

            {/* Form Area */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 250 }}>
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

              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel>
                  Employee <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={formData.employee}
                  onChange={(e) => handleInputChange('employee', e.target.value)}
                  label="Employee *"
                  sx={{ backgroundColor: '#f0f0f0' }}
                >
                  <MenuItem value="all">All Employee</MenuItem>
                  {employeeData.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.name} - {emp.designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!formData.schoolName}
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

            {/* Results Section */}
            {showResults && (
              <>
                {/* Tab-style header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <GroupIcon sx={{ color: '#666' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Employee List
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Employee Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedEmployees.length === employeeData.length}
                            indeterminate={selectedEmployees.length > 0 && selectedEmployees.length < employeeData.length}
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
                      {employeeData.map((employee, index) => (
                        <TableRow key={employee.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedEmployees.includes(employee.id)}
                              onChange={() => handleSelectEmployee(employee.id)}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.designation}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Footer Action - Print Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    disabled={selectedEmployees.length === 0}
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
                    Print ({selectedEmployees.length})
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

export default GenerateEmployeeIDCard;
