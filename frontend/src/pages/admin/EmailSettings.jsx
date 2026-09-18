import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import apiService from '../../services/apiService';

const EmailSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email_provider: 'smtp',
    smtp_host: '',
    smtp_port: '',
    smtp_username: '',
    smtp_password: '',
    api_key: '',
    from_email: '',
    from_name: '',
    is_active: false,
    send_to_parents: false,
    send_to_students: false,
    send_to_staff: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/email/');
      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load email settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await apiService.post('/admin-settings/email/', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData(response.data.data);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save email settings');
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader title="Email Settings" subheader="Configure email provider and notifications" />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Email settings saved successfully!</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Email Provider */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Email Provider Configuration</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Provider"
                  name="email_provider"
                  value={formData.email_provider}
                  onChange={handleChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="smtp">SMTP</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="aws_ses">AWS SES</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                  }
                  label="Active"
                />
              </Grid>

              {/* SMTP Settings */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>SMTP Configuration</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMTP Host"
                  name="smtp_host"
                  value={formData.smtp_host}
                  onChange={handleChange}
                  placeholder="e.g., smtp.gmail.com"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMTP Port"
                  name="smtp_port"
                  type="number"
                  value={formData.smtp_port}
                  onChange={handleChange}
                  placeholder="e.g., 587"
                  inputProps={{ min: "0" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMTP Username"
                  name="smtp_username"
                  value={formData.smtp_username}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMTP Password"
                  name="smtp_password"
                  value={formData.smtp_password}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>

              {/* API Key */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Key (for SendGrid/Mailgun/AWS)"
                  name="api_key"
                  value={formData.api_key}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>

              {/* Email Sender Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Sender Information</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="From Email"
                  name="from_email"
                  type="email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="From Name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Email Recipients */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Email Recipients</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="send_to_parents"
                      checked={formData.send_to_parents}
                      onChange={handleChange}
                    />
                  }
                  label="Send to Parents"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="send_to_students"
                      checked={formData.send_to_students}
                      onChange={handleChange}
                    />
                  }
                  label="Send to Students"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="send_to_staff"
                      checked={formData.send_to_staff}
                      onChange={handleChange}
                    />
                  }
                  label="Send to Staff"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={fetchSettings}
                    disabled={saving || loading}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmailSettings;
