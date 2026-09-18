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

const SMSSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    provider: 'twilio',
    api_key: '',
    api_secret: '',
    sender_id: '',
    is_active: false,
    send_to_parents: false,
    send_to_students: false,
    send_to_staff: false,
    monthly_sms_limit: 1000,
    sms_sent_count: 0
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/sms/');
      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load SMS settings');
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

      const response = await apiService.post('/admin-settings/sms/', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData(response.data.data);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save SMS settings');
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
        <CardHeader title="SMS Settings" subheader="Configure SMS notifications and provider" />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>SMS settings saved successfully!</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Provider Configuration */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>SMS Provider Configuration</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMS Provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="twilio">Twilio</option>
                  <option value="aws_sns">AWS SNS</option>
                  <option value="nexmo">Nexmo</option>
                  <option value="local">Local Provider</option>
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Key"
                  name="api_key"
                  value={formData.api_key}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Secret"
                  name="api_secret"
                  value={formData.api_secret}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sender ID"
                  name="sender_id"
                  value={formData.sender_id}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Recipients Configuration */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>SMS Recipients</Typography>
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

              {/* Limits */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>SMS Limits</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly SMS Limit"
                  name="monthly_sms_limit"
                  type="number"
                  value={formData.monthly_sms_limit}
                  onChange={handleChange}
                  inputProps={{ min: "0" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMS Sent Count"
                  name="sms_sent_count"
                  type="number"
                  value={formData.sms_sent_count}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
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

export default SMSSettings;
