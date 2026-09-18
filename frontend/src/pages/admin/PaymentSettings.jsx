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

const PaymentSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    payment_gateway: 'stripe',
    gateway_api_key: '',
    gateway_secret_key: '',
    merchant_account: '',
    payment_terms: 'monthly',
    late_fee_percentage: 0,
    late_fee_days: 5,
    discount_percentage: 0,
    is_active: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin-settings/payment/');
      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payment settings');
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

      const response = await apiService.post('/admin-settings/payment/', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData(response.data.data);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save payment settings');
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
        <CardHeader title="Payment Settings" subheader="Configure payment gateway and financial terms" />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Payment settings saved successfully!</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Payment Gateway Configuration */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Payment Gateway Configuration</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Payment Gateway"
                  name="payment_gateway"
                  value={formData.payment_gateway}
                  onChange={handleChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="bank_transfer">Bank Transfer</option>
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
                  label="Gateway API Key"
                  name="gateway_api_key"
                  value={formData.gateway_api_key}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gateway Secret Key"
                  name="gateway_secret_key"
                  value={formData.gateway_secret_key}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Merchant Account"
                  name="merchant_account"
                  value={formData.merchant_account}
                  onChange={handleChange}
                />
              </Grid>

              {/* Payment Terms */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Payment Terms</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Payment Terms"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="half_yearly">Half Yearly</option>
                  <option value="annual">Annual</option>
                </TextField>
              </Grid>

              {/* Fees and Discounts */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Fees & Discounts</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Late Fee Percentage (%)"
                  name="late_fee_percentage"
                  type="number"
                  value={formData.late_fee_percentage}
                  onChange={handleChange}
                  inputProps={{ step: "0.01", min: "0" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Late Fee Days"
                  name="late_fee_days"
                  type="number"
                  value={formData.late_fee_days}
                  onChange={handleChange}
                  inputProps={{ min: "0" }}
                  helperText="Days after due date to apply late fee"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Discount Percentage (%)"
                  name="discount_percentage"
                  type="number"
                  value={formData.discount_percentage}
                  onChange={handleChange}
                  inputProps={{ step: "0.01", min: "0" }}
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

export default PaymentSettings;
