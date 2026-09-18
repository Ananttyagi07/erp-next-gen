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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Collapse,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  List as ListIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const IDCardSetting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [sessionYear, setSessionYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Form state
  const [formData, setFormData] = useState({
    schoolName: '',
    borderColor: '#e01ab5',
    topBackground: '#e01ab5',
    cardSchoolName: '',
    schoolNameFontSize: '',
    schoolNameColor: '#000000',
    schoolAddress: '',
    schoolAddressColor: '#000000',
    idNoFontSize: '',
    idNoColor: '#000000',
    idNoBackground: '#ffffff',
    titleFontSize: '',
    titleColor: '#000000',
    valueFontSize: '',
    valueColor: '#000000',
    bottomSignature: '',
    signatureBackground: '#ffffff',
    signatureColor: '#000000',
    signatureAlign: '',
    cardLogo: null,
  });

  // Sample data
  const [tableData] = useState([
    {
      id: 1,
      school: 'Main Campus',
      borderColor: '#e01ab5',
      topBackground: '#e01ab5',
      bottomSignature: 'Principal',
      signatureBackground: '#ffffff',
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, cardLogo: file }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submit logic here
  };

  const handleCancel = () => {
    setActiveTab(0);
    setFormData({
      schoolName: '',
      borderColor: '#e01ab5',
      topBackground: '#e01ab5',
      cardSchoolName: '',
      schoolNameFontSize: '',
      schoolNameColor: '#000000',
      schoolAddress: '',
      schoolAddressColor: '#000000',
      idNoFontSize: '',
      idNoColor: '#000000',
      idNoBackground: '#ffffff',
      titleFontSize: '',
      titleColor: '#000000',
      valueFontSize: '',
      valueColor: '#000000',
      bottomSignature: '',
      signatureBackground: '#ffffff',
      signatureColor: '#000000',
      signatureAlign: '',
      cardLogo: null,
    });
  };

  const ColorPickerInput = ({ value, onChange, label, required = false }) => (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      sx={{ backgroundColor: '#f5f5f5' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Manage ID Card Setting
            </Typography>
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
                <span style={{ cursor: 'pointer' }}>Teacher ID card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Employee ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student ID Card</span> |{' '}
                <span style={{ cursor: 'pointer' }}>Student Admit Card</span>
              </Typography>
            </Box>

            {/* Top Filters */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  label="Select School"
                >
                  <MenuItem value="">--Select--</MenuItem>
                  <MenuItem value="1">Main Campus</MenuItem>
                  <MenuItem value="2">Branch Campus</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Global Search"
                variant="outlined"
                size="medium"
              />

              <Box sx={{ borderLeft: '1px solid #ccc', height: '40px', mx: 1 }} />

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  label="Select School"
                >
                  <MenuItem value="">--Select--</MenuItem>
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
                  <MenuItem value="">--Select--</MenuItem>
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
          </Collapse>
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card>
        <CardContent>
          {/* Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab icon={<ListIcon />} label="List" iconPosition="start" />
            <Tab icon={<AddIcon />} label="Add" iconPosition="start" />
          </Tabs>

          {/* Tab Content 1: List View */}
          {activeTab === 0 && (
            <Box>
              {/* Export Buttons and Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small">Copy</Button>
                  <Button variant="outlined" size="small">Excel</Button>
                  <Button variant="outlined" size="small">CSV</Button>
                  <Button variant="outlined" size="small">PDF</Button>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(e.target.value)}
                    >
                      <MenuItem value={15}>Show 15 rows</MenuItem>
                      <MenuItem value={25}>Show 25 rows</MenuItem>
                      <MenuItem value={50}>Show 50 rows</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="body2">Search:</Typography>
                  <TextField
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Box>
              </Box>

              {/* Data Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell>#SL ▲▼</TableCell>
                      <TableCell>School ▲▼</TableCell>
                      <TableCell>Border Color ▲▼</TableCell>
                      <TableCell>Top Background ▲▼</TableCell>
                      <TableCell>Bottom Signature ▲▼</TableCell>
                      <TableCell>Signature Background ▲▼</TableCell>
                      <TableCell>Action ▲▼</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.school}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: row.borderColor,
                              border: '1px solid #ccc',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: row.topBackground,
                              border: '1px solid #ccc',
                            }}
                          />
                        </TableCell>
                        <TableCell>{row.bottomSignature}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: row.signatureBackground,
                              border: '1px solid #ccc',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#333' },
                              }}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#333' },
                              }}
                              onClick={() => setActiveTab(1)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: '#f44336',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#d32f2f' },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
                <Typography variant="body2">
                  Showing 1 to {tableData.length} of {tableData.length} entries
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small">Previous</Button>
                  <Button variant="contained" size="small">1</Button>
                  <Button variant="outlined" size="small">Next</Button>
                </Box>
              </Box>
            </Box>
          )}

          {/* Tab Content 2: Add/Edit Form */}
          {activeTab === 1 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth required sx={{ backgroundColor: '#f5f5f5' }}>
                    <InputLabel>Select School</InputLabel>
                    <Select
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      label="Select School"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="1">Main Campus</MenuItem>
                      <MenuItem value="2">Branch Campus</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Border Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.borderColor}
                    onChange={(val) => handleInputChange('borderColor', val)}
                    label="Border Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Top Background
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.topBackground}
                    onChange={(val) => handleInputChange('topBackground', val)}
                    label="Top Background"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Card School Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.cardSchoolName}
                    onChange={(e) => handleInputChange('cardSchoolName', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School Name Font Size
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.schoolNameFontSize}
                    onChange={(e) => handleInputChange('schoolNameFontSize', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School Name Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.schoolNameColor}
                    onChange={(val) => handleInputChange('schoolNameColor', val)}
                    label="School Name Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School Address
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.schoolAddress}
                    onChange={(e) => handleInputChange('schoolAddress', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    School Address Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.schoolAddressColor}
                    onChange={(val) => handleInputChange('schoolAddressColor', val)}
                    label="School Address Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    ID No Font Size
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.idNoFontSize}
                    onChange={(e) => handleInputChange('idNoFontSize', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    ID No Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.idNoColor}
                    onChange={(val) => handleInputChange('idNoColor', val)}
                    label="ID No Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    ID No Background
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.idNoBackground}
                    onChange={(val) => handleInputChange('idNoBackground', val)}
                    label="ID No Background"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Title Font Size
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.titleFontSize}
                    onChange={(e) => handleInputChange('titleFontSize', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Title Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.titleColor}
                    onChange={(val) => handleInputChange('titleColor', val)}
                    label="Title Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Value Font Size
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    value={formData.valueFontSize}
                    onChange={(e) => handleInputChange('valueFontSize', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Value Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.valueColor}
                    onChange={(val) => handleInputChange('valueColor', val)}
                    label="Value Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Bottom Signature <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    required
                    value={formData.bottomSignature}
                    onChange={(e) => handleInputChange('bottomSignature', e.target.value)}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Signature Background
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.signatureBackground}
                    onChange={(val) => handleInputChange('signatureBackground', val)}
                    label="Signature Background"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Signature Color
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <ColorPickerInput
                    value={formData.signatureColor}
                    onChange={(val) => handleInputChange('signatureColor', val)}
                    label="Signature Color"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Signature Align
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl fullWidth sx={{ backgroundColor: '#f5f5f5' }}>
                    <InputLabel>--Select--</InputLabel>
                    <Select
                      value={formData.signatureAlign}
                      onChange={(e) => handleInputChange('signatureAlign', e.target.value)}
                      label="--Select--"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Card Logo
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ mb: 1 }}
                    >
                      Choose File
                      <input
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Dimension:- Max-W: 100px, Max-H: 110px
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Image file format: .jpg, .jpeg, .png or .gif
                    </Typography>
                    {formData.cardLogo && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected: {formData.cardLogo.name}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>

              {/* Footer Actions */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    color: '#666',
                    borderColor: '#ccc',
                    '&:hover': { borderColor: '#999' },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default IDCardSetting;
