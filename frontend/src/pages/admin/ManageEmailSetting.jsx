import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Mail as MailIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import emailSettingsService from '../../services/emailSettings';
import collegesService from '../../services/colleges';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const QUICK_LINKS = [
  { name: 'General Setting', path: '/admin/general-settings' },
  { name: 'Manage School', path: '/admin/manage-school' },
  { name: 'Payment Setting', path: '/admin/payment-settings' },
  { name: 'SMS Setting', path: '/admin/sms-settings' },
  { name: 'Email Setting', path: '/admin/email-settings' },
  { name: 'Academic Year', path: '/admin/academic-years' },
  { name: 'User Role', path: '/admin/user-role' },
  { name: 'Role Permission', path: '/admin/role-permission' },
  { name: 'Super Admin', path: '/admin/manage-super-admin' },
  { name: 'Manage User', path: '/users' },
  { name: 'Reset User Password', path: '/admin/reset-user-password' },
  { name: 'Reset Username', path: '/admin/reset-username' },
  { name: 'User Credential', path: '/admin/user-credential' },
  { name: 'Activity Log', path: '/admin/activity-log' },
  { name: 'Feedback', path: '/admin/feedback' },
  { name: 'Backup', path: '/admin/backup-database' },
  { name: 'Opening Hour', path: '/admin/opening-hours' }
];

const ManageEmailSetting = () => {
  const [tabValue, setTabValue] = useState(0);
  const [emailSettings, setEmailSettings] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedTitle, setExpandedTitle] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Global header bar states
  const [selectedSchool, setSelectedSchool] = useState(() => {
    return localStorage.getItem('selectedSchool') || '';
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem('selectedYear') || '';
  });
  const [globalSearch, setGlobalSearch] = useState('');

  const [formData, setFormData] = useState({
    school: '',
    email_protocol: 'smtp',
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    smtp_security: 'tls',
    smtp_timeout: 5,
    email_type: '',
    charset: 'UTF-8',
    priority: 'normal',
    from_name: '',
    from_email: '',
    is_active: true,
    send_to_parents: false,
    send_to_students: false,
    send_to_staff: false
  });

  useEffect(() => {
    fetchEmailSettings();
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await collegesService.getColleges();
      const data = Array.isArray(response) ? response : response.data || [];
      setSchools(data);
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
  };

  const fetchEmailSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await emailSettingsService.getEmailSettings();
      const data = response.data || [];
      setEmailSettings(data);
    } catch (err) {
      console.error('Error fetching email settings:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load email settings');
      setEmailSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setEditingId(null);
      resetForm();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      school: '',
      email_protocol: 'smtp',
      smtp_host: '',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      smtp_security: 'tls',
      smtp_timeout: 5,
      email_type: '',
      charset: 'UTF-8',
      priority: 'normal',
      from_name: '',
      from_email: '',
      is_active: true,
      send_to_parents: false,
      send_to_students: false,
      send_to_staff: false
    });
    setEditingId(null);
  };

  // Global header bar handlers
  const handleSchoolChange = (event) => {
    const value = event.target.value;
    setSelectedSchool(value);
    localStorage.setItem('selectedSchool', value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
    localStorage.setItem('selectedYear', value);
  };

  const handleGlobalSearchChange = (event) => {
    setGlobalSearch(event.target.value);
  };

  const handleGlobalUpdate = () => {
    setSuccess('Update processed successfully!');
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      if (!formData.school || !formData.email_protocol || !formData.smtp_host || !formData.smtp_port ||
          !formData.smtp_username || !formData.smtp_password || !formData.from_name || !formData.from_email) {
        setError('Please fill in all required fields');
        setSaving(false);
        return;
      }

      if (editingId) {
        await emailSettingsService.updateEmailSetting(editingId, formData);
        setSuccess('Email setting updated successfully!');
      } else {
        await emailSettingsService.createEmailSetting(formData);
        setSuccess('Email setting created successfully!');
      }

      setTimeout(() => {
        setSuccess(false);
        resetForm();
        fetchEmailSettings();
        setTabValue(0);
      }, 2000);
    } catch (err) {
      console.error('Error saving email setting:', err);
      setError(err.response?.data?.message || 'Failed to save email setting');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (setting) => {
    try {
      const response = await emailSettingsService.getEmailSetting(setting.id);
      const settingData = response.data;
      setFormData({
        school: settingData.school || '',
        email_protocol: settingData.email_protocol || 'smtp',
        smtp_host: settingData.smtp_host || '',
        smtp_port: settingData.smtp_port || 587,
        smtp_username: settingData.smtp_username || '',
        smtp_password: settingData.smtp_password || '',
        smtp_security: settingData.smtp_security || 'tls',
        smtp_timeout: settingData.smtp_timeout || 5,
        email_type: settingData.email_type || '',
        charset: settingData.charset || 'UTF-8',
        priority: settingData.priority || 'normal',
        from_name: settingData.from_name || '',
        from_email: settingData.from_email || '',
        is_active: settingData.is_active !== false,
        send_to_parents: settingData.send_to_parents || false,
        send_to_students: settingData.send_to_students || false,
        send_to_staff: settingData.send_to_staff || false
      });
      setEditingId(setting.id);
      setTabValue(1);
    } catch (err) {
      console.error('Error loading email setting details:', err);
      setError('Failed to load email setting details');
    }
  };

  const handleDeleteClick = (settingId) => {
    setDeleteId(settingId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setSaving(true);
      await emailSettingsService.deleteEmailSetting(deleteId);
      setSuccess('Email setting deleted successfully!');
      setDeleteConfirmOpen(false);
      setDeleteId(null);
      setTimeout(() => {
        setSuccess(false);
        fetchEmailSettings();
      }, 2000);
    } catch (err) {
      console.error('Error deleting email setting:', err);
      setError(err.response?.data?.message || 'Failed to delete email setting');
    } finally {
      setSaving(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'School', 'Protocol', 'Type', 'From Name', 'From Email', 'Host', 'Port', 'Status'];
    const data = emailSettings.map(setting => [
      setting.id,
      setting.school_name || 'N/A',
      setting.email_protocol,
      setting.email_type,
      setting.from_name,
      setting.from_email,
      setting.smtp_host,
      setting.smtp_port,
      setting.is_active ? 'Active' : 'Inactive'
    ]);

    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell || ''}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'email_settings.csv';
    link.click();
  };

  const exportToExcel = () => {
    const headers = ['ID', 'School', 'Protocol', 'Type', 'From Name', 'From Email', 'Host', 'Port', 'Status'];
    const data = emailSettings.map(setting => [
      setting.id,
      setting.school_name || 'N/A',
      setting.email_protocol,
      setting.email_type,
      setting.from_name,
      setting.from_email,
      setting.smtp_host,
      setting.smtp_port,
      setting.is_active ? 'Active' : 'Inactive'
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Email Settings');
    XLSX.writeFile(wb, 'email_settings.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = ['ID', 'School', 'Protocol', 'Type', 'From Name', 'From Email', 'Host', 'Port', 'Status'];
    const data = emailSettings.map(setting => [
      setting.id,
      setting.school_name || 'N/A',
      setting.email_protocol,
      setting.email_type,
      setting.from_name,
      setting.from_email,
      setting.smtp_host,
      setting.smtp_port,
      setting.is_active ? 'Active' : 'Inactive'
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20
    });

    doc.text('Email Settings List', 14, 15);
    doc.save('email_settings.pdf');
  };

  const filteredSettings = emailSettings.filter(setting =>
    (setting.from_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     setting.from_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     setting.smtp_host?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedSchool || setting.school === parseInt(selectedSchool))
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Global Header Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: 'white', overflow: 'hidden' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Select School</InputLabel>
              <Select
                value={selectedSchool}
                onChange={handleSchoolChange}
                label="Select School"
              >
                <MenuItem value="">Choose School</MenuItem>
                <MenuItem value="school1">School 1 (Erp_Database)</MenuItem>
                <MenuItem value="school2">School 2 (Erp_Database2)</MenuItem>
                {schools.length > 0 && schools.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Session Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                label="Session Year"
              >
                <MenuItem value="">Choose Year</MenuItem>
                <MenuItem value="2023-24">2023-24</MenuItem>
                <MenuItem value="2024-25">2024-25</MenuItem>
                <MenuItem value="2025-26">2025-26</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search..."
              value={globalSearch}
              onChange={handleGlobalSearchChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGlobalUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Header with Title and Collapse */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MailIcon />
              <Typography variant="h5">Manage Email Setting</Typography>
            </Box>
          }
          action={
            <IconButton
              size="small"
              onClick={() => setExpandedTitle(!expandedTitle)}
            >
              {expandedTitle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          }
        />
        {expandedTitle && (
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Typography variant="caption" sx={{ alignSelf: 'center', mr: 1 }}>
                <strong>Quick Links:</strong>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {QUICK_LINKS.map((link, idx) => (
                  <Button
                    key={idx}
                    size="small"
                    variant="text"
                    sx={{ textTransform: 'none', fontSize: '0.85rem' }}
                    onClick={() => window.location.href = link.path}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(false)}>{success}</Alert>}

      {/* Tabs */}
      <Card>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab icon={<MailIcon />} iconPosition="start" label="List" />
          <Tab icon={<MailIcon />} iconPosition="start" label="Add" />
        </Tabs>

        <CardContent>
          {/* List Tab */}
          {tabValue === 0 && (
            <Box>
              {/* Table Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToCSV}
                  >
                    CSV
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToExcel}
                  >
                    Excel
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    onClick={exportToPDF}
                  >
                    PDF
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Rows per page</InputLabel>
                    <Select
                      value={rowsPerPage}
                      label="Rows per page"
                      onChange={(e) => {
                        setRowsPerPage(e.target.value);
                        setPage(0);
                      }}
                    >
                      {[5, 10, 15, 25, 50].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    label="Search"
                    placeholder="Search settings..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(0);
                    }}
                    sx={{ minWidth: 250 }}
                  />
                </Box>
              </Box>

              {/* Table */}
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Paper sx={{ overflowX: 'auto' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell>#SL</TableCell>
                          <TableCell>School</TableCell>
                          <TableCell>Email Protocol</TableCell>
                          <TableCell>Email Type</TableCell>
                          <TableCell>Char Set</TableCell>
                          <TableCell>From Name</TableCell>
                          <TableCell>From Email</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredSettings
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((setting, idx) => (
                            <TableRow key={setting.id}>
                              <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                              <TableCell>{setting.school_name || 'N/A'}</TableCell>
                              <TableCell>{setting.email_protocol}</TableCell>
                              <TableCell>{setting.email_type || 'N/A'}</TableCell>
                              <TableCell>{setting.charset}</TableCell>
                              <TableCell>{setting.from_name}</TableCell>
                              <TableCell>{setting.from_email}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleEdit(setting)}
                                  title="Edit"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteClick(setting.id)}
                                  title="Delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>

                  {/* Pagination */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption">
                      Showing {filteredSettings.length === 0 ? 0 : page * rowsPerPage + 1} to{' '}
                      {Math.min((page + 1) * rowsPerPage, filteredSettings.length)} of{' '}
                      {filteredSettings.length} entries
                    </Typography>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 25, 50]}
                      component="div"
                      count={filteredSettings.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(event, newPage) => setPage(newPage)}
                      onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Add/Edit Tab */}
          {tabValue === 1 && (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>School Name</InputLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      label="School Name"
                    >
                      <MenuItem value="">--Select School--</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school.id} value={school.id}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{
                      '& .MuiFormLabel-asterisk': {
                        color: 'red !important'
                      }
                    }}>Email Protocol</InputLabel>
                    <Select
                      name="email_protocol"
                      value={formData.email_protocol}
                      onChange={handleInputChange}
                      label="Email Protocol"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="smtp">SMTP</MenuItem>
                      <MenuItem value="sendgrid">SendGrid</MenuItem>
                      <MenuItem value="mailgun">Mailgun</MenuItem>
                      <MenuItem value="aws_ses">AWS SES</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Host"
                    name="smtp_host"
                    value={formData.smtp_host}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Port"
                    name="smtp_port"
                    type="number"
                    value={formData.smtp_port}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Username"
                    name="smtp_username"
                    value={formData.smtp_username}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Password"
                    name="smtp_password"
                    type="password"
                    value={formData.smtp_password}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>SMTP Security</InputLabel>
                    <Select
                      name="smtp_security"
                      value={formData.smtp_security}
                      onChange={handleInputChange}
                      label="SMTP Security"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="tls">TLS</MenuItem>
                      <MenuItem value="ssl">SSL</MenuItem>
                      <MenuItem value="none">None</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SMTP Timeout"
                    name="smtp_timeout"
                    type="number"
                    value={formData.smtp_timeout}
                    onChange={handleInputChange}
                    helperText="SMTP Timeout (in seconds) [ 5 - 10 ]"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Email Type</InputLabel>
                    <Select
                      name="email_type"
                      value={formData.email_type}
                      onChange={handleInputChange}
                      label="Email Type"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="notification">Notification</MenuItem>
                      <MenuItem value="confirmation">Confirmation</MenuItem>
                      <MenuItem value="transactional">Transactional</MenuItem>
                      <MenuItem value="marketing">Marketing</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Char Set</InputLabel>
                    <Select
                      name="charset"
                      value={formData.charset}
                      onChange={handleInputChange}
                      label="Char Set"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="UTF-8">UTF-8</MenuItem>
                      <MenuItem value="ISO-8859-1">ISO-8859-1</MenuItem>
                      <MenuItem value="ASCII">ASCII</MenuItem>
                      <MenuItem value="UTF-16">UTF-16</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      label="Priority"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="normal">Normal</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="From Name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="From Email"
                    name="from_email"
                    type="email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      sx: {
                        '& .MuiFormLabel-asterisk': {
                          color: 'red !important'
                        }
                      }
                    }}
                  />
                </Grid>

                {/* Form Actions */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        resetForm();
                        setTabValue(0);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this email setting?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageEmailSetting;
