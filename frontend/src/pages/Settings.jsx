import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Save as SaveIcon, Refresh as ResetIcon } from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    schoolName: 'ERP School System',
    schoolCode: 'ERP001',
    principal: 'John Doe',
    contactEmail: 'admin@erp.com',
    contactPhone: '+1-800-000-0000',
    academicYear: '2024-2025',
    enableNotifications: true,
    enableSMS: false,
    enableEmail: true,
    maintenanceMode: false,
    backupEnabled: true,
    backupFrequency: 'weekly',
  });

  const [saved, setSaved] = useState(false);

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate saving to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      schoolName: 'ERP School System',
      schoolCode: 'ERP001',
      principal: 'John Doe',
      contactEmail: 'admin@erp.com',
      contactPhone: '+1-800-000-0000',
      academicYear: '2024-2025',
      enableNotifications: true,
      enableSMS: false,
      enableEmail: true,
      maintenanceMode: false,
      backupEnabled: true,
      backupFrequency: 'weekly',
    });
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <h1 style={{ color: "#000" }}>Settings</h1>
        <Typography variant="body1" color="textSecondary">
          Manage system and school settings
        </Typography>
      </Box>

      {/* Success Alert */}
      {saved && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaved(false)}>
          Settings saved successfully!
        </Alert>
      )}

      {/* School Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <h2 style={{ color: "#000" }}>School Information</h2>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="School Name"
              value={settings.schoolName}
              onChange={handleInputChange('schoolName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="School Code"
              value={settings.schoolCode}
              onChange={handleInputChange('schoolCode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Principal Name"
              value={settings.principal}
              onChange={handleInputChange('principal')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Academic Year"
              value={settings.academicYear}
              onChange={handleInputChange('academicYear')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Email"
              type="email"
              value={settings.contactEmail}
              onChange={handleInputChange('contactEmail')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              value={settings.contactPhone}
              onChange={handleInputChange('contactPhone')}
            />
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Notification Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <h2 style={{ color: "#000" }}>Notification Settings</h2>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableNotifications}
                onChange={handleInputChange('enableNotifications')}
              />
            }
            label="Enable Push Notifications"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableEmail}
                onChange={handleInputChange('enableEmail')}
              />
            }
            label="Enable Email Notifications"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableSMS}
                onChange={handleInputChange('enableSMS')}
              />
            }
            label="Enable SMS Notifications"
          />
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* System Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <h2 style={{ color: "#000" }}>System Settings</h2>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.maintenanceMode}
                onChange={handleInputChange('maintenanceMode')}
              />
            }
            label="Maintenance Mode"
          />
          <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
            Enable maintenance mode to restrict access while performing system updates
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.backupEnabled}
                onChange={handleInputChange('backupEnabled')}
              />
            }
            label="Automatic Backups"
          />
          <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
            Automatically backup database and files
          </Typography>
        </Box>

        {settings.backupEnabled && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              select
              label="Backup Frequency"
              value={settings.backupFrequency}
              onChange={handleInputChange('backupFrequency')}
              SelectProps={{
                native: true,
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </TextField>
          </Box>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* System Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <h2 style={{ color: "#000" }}>System Information</h2>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  System Version
                </Typography>
                <Typography variant="h6">1.0.0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Last Backup
                </Typography>
                <Typography variant="h6">2024-11-13</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<ResetIcon />}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
