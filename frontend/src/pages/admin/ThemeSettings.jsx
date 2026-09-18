import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const { currentTheme: selectedTheme, enableRTL, updateTheme, isLoading: themeLoading } = useTheme();
  const [formData, setFormData] = useState({
    colorTheme: selectedTheme || 'black',
    enable_rtl: enableRTL || false,
  });
  const [loading, setLoading] = useState(themeLoading);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Define color themes (matching ThemeContext definitions)
  const colorThemes = [
    { name: 'Black', value: 'black', primary: '#1a1a1a', secondary: '#333333', accent: '#555555' },
    { name: 'Maroon', value: 'maroon', primary: '#C41E3A', secondary: '#A52A2A', accent: '#D9534F' },
    { name: 'Olive', value: 'olive', primary: '#B8B800', secondary: '#A0A000', accent: '#CDDC39' },
    { name: 'Lavender', value: 'lavender', primary: '#9C27B0', secondary: '#D8BFD8', accent: '#DDA0DD' },
    { name: 'Bright Green', value: 'bright_green', primary: '#00C853', secondary: '#00DD00', accent: '#00BB00' },
    { name: 'Dark Purple', value: 'dark_purple', primary: '#7851A9', secondary: '#6A0DAD', accent: '#9C27B0' },
    { name: 'Magenta', value: 'magenta', primary: '#E91E63', secondary: '#DD00DD', accent: '#BB00BB' },
    { name: 'Cyan', value: 'cyan', primary: '#00BCD4', secondary: '#00DDDD', accent: '#00BBBB' },
    { name: 'Dark Red', value: 'dark_red', primary: '#D9534F', secondary: '#A52A2A', accent: '#DC143C' },
    { name: 'Bright Orange', value: 'bright_orange', primary: '#FF9800', secondary: '#FF7F27', accent: '#FF9500' },
    { name: 'Navy Blue', value: 'navy', primary: '#0D47A1', secondary: '#001080', accent: '#1976D2' },
    { name: 'Bright Red', value: 'bright_red', primary: '#F44336', secondary: '#DD0000', accent: '#BB0000' },
    { name: 'Teal', value: 'teal', primary: '#00897B', secondary: '#009999', accent: '#00B2B2' },
    { name: 'Burnt Orange', value: 'burnt_orange', primary: '#FF6F00', secondary: '#DD6600', accent: '#EE7700' },
  ];

  // Sync form data with theme context when theme changes
  useEffect(() => {
    setFormData({
      colorTheme: selectedTheme || 'black',
      enable_rtl: enableRTL || false,
    });
    setLoading(themeLoading);
  }, [selectedTheme, enableRTL, themeLoading]);

  const handleThemeSelect = (themeValue) => {
    setFormData((prev) => ({
      ...prev,
      colorTheme: themeValue,
    }));
    setError(null);
  };

  const handleRTLChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      enable_rtl: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      // Use ThemeContext's updateTheme which handles both state update and API persistence
      await updateTheme(formData.colorTheme, formData.enable_rtl);

      console.log('Theme settings updated and applied');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save theme settings:', err);
      setError(
        err.response?.data?.message ||
        'Failed to save theme settings. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const currentTheme = colorThemes.find(t => t.value === formData.colorTheme);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <PaletteIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {t('themeSettings')}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{t('themeSettings')} saved successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Current Theme Display */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        {t('currentlySelectedTheme')}
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {currentTheme?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: currentTheme?.primary,
                            borderRadius: 1,
                            border: '2px solid #ccc',
                          }}
                        />
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: currentTheme?.secondary,
                            borderRadius: 1,
                            border: '2px solid #ccc',
                          }}
                        />
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: currentTheme?.accent,
                            borderRadius: 1,
                            border: '2px solid #ccc',
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Color Theme Selection Cards */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                {t('selectThemeColor')}
              </Typography>
              <Grid container spacing={2}>
                {colorThemes.map((theme) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={theme.value}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: formData.colorTheme === theme.value ? '3px solid' : '1px solid',
                        borderColor: formData.colorTheme === theme.value ? 'primary.main' : 'divider',
                        backgroundColor: formData.colorTheme === theme.value ? 'action.selected' : 'background.paper',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 4,
                          borderColor: 'primary.main',
                        },
                      }}
                      onClick={() => handleThemeSelect(theme.value)}
                    >
                      <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        {/* Color Swatches */}
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center' }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: theme.primary,
                              borderRadius: '50%',
                              border: '2px solid #ddd',
                            }}
                          />
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: theme.secondary,
                              borderRadius: '50%',
                              border: '2px solid #ddd',
                            }}
                          />
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: theme.accent,
                              borderRadius: '50%',
                              border: '2px solid #ddd',
                            }}
                          />
                        </Box>

                        {/* Theme Name */}
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {theme.name}
                        </Typography>

                        {/* Color Codes */}
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {theme.primary}
                        </Typography>

                        {/* Selection Indicator */}
                        {formData.colorTheme === theme.value && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                              ✓ {t('themeSelected')}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* RTL Support */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.enable_rtl}
                    onChange={handleRTLChange}
                  />
                }
                label={t('enableRTLSupport')}
              />
            </Grid>

            {/* Information Alert */}
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>{t('note')}:</strong> {t('noteThemeSettings')}
                </Typography>
              </Alert>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                  size="large"
                  sx={{ minWidth: 150 }}
                >
                  {saving ? <CircularProgress size={24} /> : t('saveTheme')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ThemeSettings;
