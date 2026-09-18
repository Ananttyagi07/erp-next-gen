import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Alert,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Email as EmailIcon,
  List as ListIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { usePermissions } from '../../hooks/usePermissions';
import CollapsibleCard from '../../components/common/CollapsibleCard';
import TemplateTable from '../../components/templates/TemplateTable';
import TemplateForm from '../../components/templates/TemplateForm';
import apiService from '../../services/apiService';
import {
  fetchEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from '../../store/slices/templatesSlice';

const EmailTemplates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { emailTemplates, loading, error, emailTemplatesLoading } = useSelector(
    (state) => state.templates
  );

  const [activeTab, setActiveTab] = useState(0);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [schools, setSchools] = useState([]);
  const [sessionYears, setSessionYears] = useState([]);

  // Fetch schools and session years
  const fetchSchools = async () => {
    try {
      const response = await apiService.get('/colleges/colleges/');
      // API returns {success: true, data: [...]}
      const schoolsData = response.data.data || response.data || [];
      // Handle both direct array and wrapped response
      const schools = Array.isArray(schoolsData) ? schoolsData : (schoolsData.data || []);
      setSchools(schools);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setSchools([]);
    }
  };

  const fetchSessionYears = async () => {
    try {
      const response = await apiService.get('/admin-settings/academic-years/');
      const yearsData = response.data.data || response.data || [];
      setSessionYears(Array.isArray(yearsData) ? yearsData : []);
    } catch (err) {
      console.error('Error fetching session years:', err);
    }
  };

  useEffect(() => {
    dispatch(fetchEmailTemplates());
    fetchSchools();
    fetchSessionYears();
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      setEditingTemplate(null);
    }
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setActiveTab(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this email template?')) {
      try {
        await dispatch(deleteEmailTemplate(id)).unwrap();
      } catch (error) {
        console.error('Error deleting email template:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTemplate) {
        await dispatch(
          updateEmailTemplate({
            id: editingTemplate.id,
            data: formData,
          })
        ).unwrap();
      } else {
        await dispatch(createEmailTemplate(formData)).unwrap();
      }
      setActiveTab(0);
      setEditingTemplate(null);
    } catch (error) {
      console.error('Error saving email template:', error);
      throw error;
    }
  };

  const handleFormCancel = () => {
    setActiveTab(0);
    setEditingTemplate(null);
  };

  const tableColumns = [
    { key: 'sl', label: '#SL' },
    { key: 'school', label: 'School' },
    { key: 'receiver_type', label: 'Receiver Type' },
    { key: 'title', label: 'Title' },
    { key: 'template', label: 'Template' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Quick Links Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => navigate('/templates/email')}
            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
          >
            Email Template
          </Button>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => navigate('/templates/sms')}
          >
            SMS Template
          </Button>
        </Box>

        {/* Global Header Bar - School, Year, Search, Update */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'white', overflow: 'hidden' }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Select School</InputLabel>
                <Select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  label="Select School"
                >
                  <MenuItem value="">All Schools</MenuItem>
                  {schools.map(school => (
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
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Session Year"
                >
                  <MenuItem value="">All Years</MenuItem>
                  {sessionYears.map(year => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.name || year.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Global Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Main Content Card */}
        <CollapsibleCard
          title="Email Templates"
          icon={EmailIcon}
        >
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
            >
              <Tab
                icon={<ListIcon />}
                label="List"
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
              <Tab
                icon={<AddIcon />}
                label="Add"
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
            </Tabs>

            {activeTab === 0 && (
              <TemplateTable
                templates={emailTemplates}
                loading={emailTemplatesLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={tableColumns}
                type="email"
                emptyMessage="No email templates found"
              />
            )}

            {activeTab === 1 && (
              <TemplateForm
                template={editingTemplate}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={loading}
                type="email"
              />
            )}
          </Box>
        </CollapsibleCard>
      </Box>
    </Container>
  );
};

export default EmailTemplates;
